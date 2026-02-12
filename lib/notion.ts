import { Client, type DatabaseObjectResponse } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Initialize Notion client (v5 API)
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID!;

// In v5, we query by data_source_id. A database has one or more data sources;
// we get the first one by retrieving the database. Cached per process.
let cachedDataSourceId: string | null = null;

async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId;
  const database = (await notion.databases.retrieve({
    database_id: DATABASE_ID,
  })) as DatabaseObjectResponse;
  const first = database.data_sources?.[0];
  if (!first?.id) {
    throw new Error(
      "Notion database has no data source. Share the database with your integration: open the database in Notion → Share → invite your integration."
    );
  }
  cachedDataSourceId = first.id;
  return cachedDataSourceId;
}

// Type for blog post from Notion
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
}

// Type guard for full block objects
function isFullBlock(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return "type" in block;
}

// Extract text from rich text array
function extractPlainText(
  richText: Array<{ plain_text: string }> | undefined
): string {
  if (!richText || richText.length === 0) return "";
  return richText.map((t) => t.plain_text).join("");
}

// Transform Notion page to BlogPost
function transformPageToPost(page: PageObjectResponse): BlogPost {
  const properties = page.properties;

  // Extract title
  const titleProp = properties["Name"];
  const title =
    titleProp?.type === "title"
      ? extractPlainText(titleProp.title)
      : "Untitled";

  // Extract slug
  const slugProp = properties["Slug"];
  const slug =
    slugProp?.type === "rich_text"
      ? extractPlainText(slugProp.rich_text)
      : page.id;

  // Extract description
  const descProp = properties["Desc"];
  const description =
    descProp?.type === "rich_text" ? extractPlainText(descProp.rich_text) : "";

  // Extract date
  const dateProp = properties["Date"];
  const date =
    dateProp?.type === "date" && dateProp.date?.start
      ? dateProp.date.start
      : page.created_time;

  // Extract tags
  const tagsProp = properties["Tags"];
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

  // Extract published status
  const publishedProp = properties["Published"];
  const published =
    publishedProp?.type === "checkbox" ? publishedProp.checkbox : false;

  return {
    id: page.id,
    title,
    slug,
    description,
    date,
    tags,
    published,
  };
}

// Fetch all published blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const dataSourceId = await getDataSourceId();
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
      result_type: "page",
    });

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map(transformPageToPost);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<{ post: BlogPost; blocks: BlockObjectResponse[] } | null> {
  try {
    const dataSourceId = await getDataSourceId();
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      result_type: "page",
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0] as PageObjectResponse;
    const post = transformPageToPost(page);
    const blocks = await getPageBlocks(page.id);

    return { post, blocks };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

// Recursively fetch all blocks for a page
export async function getPageBlocks(
  blockId: string
): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  try {
    do {
      const response = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
        page_size: 100,
      });

      for (const block of response.results) {
        if (!isFullBlock(block)) continue;

        blocks.push(block);

        // Recursively fetch children if the block has them
        if (block.has_children) {
          const children = await getPageBlocks(block.id);
          (
            block as BlockObjectResponse & {
              children?: BlockObjectResponse[];
            }
          ).children = children;
        }
      }

      cursor = response.has_more
        ? response.next_cursor ?? undefined
        : undefined;
    } while (cursor);

    return blocks;
  } catch (error) {
    console.error(`Error fetching blocks for ${blockId}:`, error);
    return [];
  }
}

// Fetch all blog post slugs (for sitemap)
export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}
