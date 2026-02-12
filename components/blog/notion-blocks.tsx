import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

// Extended block type with children
type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};

// Extract plain text from rich text array
function extractText(
  richText: Array<{
    plain_text: string;
    annotations?: {
      bold?: boolean;
      italic?: boolean;
      strikethrough?: boolean;
      underline?: boolean;
      code?: boolean;
    };
    href?: string | null;
  }>
): React.ReactNode[] {
  return richText.map((text, index) => {
    let content: React.ReactNode = text.plain_text;

    if (text.annotations?.code) {
      content = (
        <code
          key={index}
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
        >
          {content}
        </code>
      );
    }
    if (text.annotations?.bold) {
      content = (
        <strong key={index} className="font-semibold">
          {content}
        </strong>
      );
    }
    if (text.annotations?.italic) {
      content = (
        <em key={index} className="italic">
          {content}
        </em>
      );
    }
    if (text.annotations?.strikethrough) {
      content = (
        <s key={index} className="line-through">
          {content}
        </s>
      );
    }
    if (text.annotations?.underline) {
      content = (
        <u key={index} className="underline">
          {content}
        </u>
      );
    }
    if (text.href) {
      content = (
        <a
          key={index}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:no-underline"
        >
          {content}
        </a>
      );
    }

    return <span key={index}>{content}</span>;
  });
}

// Render a single block
function renderBlock(block: BlockWithChildren): React.ReactNode {
  const { type, id } = block;

  switch (type) {
    case "paragraph": {
      const richText = block.paragraph.rich_text;
      if (richText.length === 0) {
        return <div key={id} className="h-4" />;
      }
      return (
        <p key={id} className="text-foreground leading-7 mb-4">
          {extractText(richText)}
        </p>
      );
    }

    case "heading_1": {
      return (
        <h1
          key={id}
          className="text-3xl font-bold text-foreground mt-8 mb-4 scroll-mt-20"
        >
          {extractText(block.heading_1.rich_text)}
        </h1>
      );
    }

    case "heading_2": {
      return (
        <h2
          key={id}
          className="text-2xl font-semibold text-foreground mt-6 mb-3 scroll-mt-20"
        >
          {extractText(block.heading_2.rich_text)}
        </h2>
      );
    }

    case "heading_3": {
      return (
        <h3
          key={id}
          className="text-xl font-semibold text-foreground mt-5 mb-2 scroll-mt-20"
        >
          {extractText(block.heading_3.rich_text)}
        </h3>
      );
    }

    case "bulleted_list_item": {
      return (
        <li key={id} className="text-foreground leading-7 ml-4">
          {extractText(block.bulleted_list_item.rich_text)}
          {block.children && block.children.length > 0 && (
            <ul className="list-disc list-inside mt-2">
              {block.children.map(renderBlock)}
            </ul>
          )}
        </li>
      );
    }

    case "numbered_list_item": {
      return (
        <li key={id} className="text-foreground leading-7 ml-4">
          {extractText(block.numbered_list_item.rich_text)}
          {block.children && block.children.length > 0 && (
            <ol className="list-decimal list-inside mt-2">
              {block.children.map(renderBlock)}
            </ol>
          )}
        </li>
      );
    }

    case "to_do": {
      const checked = block.to_do.checked;
      return (
        <div key={id} className="flex items-start gap-2 mb-2">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mt-1.5 rounded border-border"
          />
          <span
            className={`text-foreground leading-7 ${checked ? "line-through text-muted-foreground" : ""}`}
          >
            {extractText(block.to_do.rich_text)}
          </span>
        </div>
      );
    }

    case "toggle": {
      return (
        <details key={id} className="mb-4">
          <summary className="cursor-pointer text-foreground font-medium">
            {extractText(block.toggle.rich_text)}
          </summary>
          {block.children && block.children.length > 0 && (
            <div className="pl-4 mt-2 border-l-2 border-border">
              {block.children.map(renderBlock)}
            </div>
          )}
        </details>
      );
    }

    case "code": {
      const code = block.code.rich_text.map((t) => t.plain_text).join("");
      const language = block.code.language || "plaintext";
      return (
        <div key={id} className="mb-4">
          <div className="bg-muted/50 border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-muted border-b border-border">
              <span className="text-xs text-muted-foreground font-mono">
                {language}
              </span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-foreground">{code}</code>
            </pre>
          </div>
        </div>
      );
    }

    case "quote": {
      return (
        <blockquote
          key={id}
          className="border-l-4 border-primary pl-4 py-1 mb-4 text-muted-foreground italic"
        >
          {extractText(block.quote.rich_text)}
        </blockquote>
      );
    }

    case "callout": {
      const icon = block.callout.icon;
      const emoji = icon?.type === "emoji" ? icon.emoji : "";
      return (
        <div
          key={id}
          className="flex gap-3 p-4 bg-muted/50 border border-border rounded-lg mb-4"
        >
          <span className="text-xl">{emoji}</span>
          <div className="flex-1 text-foreground">
            {extractText(block.callout.rich_text)}
          </div>
        </div>
      );
    }

    case "divider": {
      return <hr key={id} className="my-8 border-border" />;
    }

    case "image": {
      const imageBlock = block.image;
      const url =
        imageBlock.type === "external"
          ? imageBlock.external.url
          : imageBlock.file.url;
      const caption =
        imageBlock.caption.length > 0
          ? imageBlock.caption.map((t) => t.plain_text).join("")
          : "";

      return (
        <figure key={id} className="mb-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
            <Image
              src={url}
              alt={caption || "Blog image"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const videoBlock = block.video;
      const url =
        videoBlock.type === "external"
          ? videoBlock.external.url
          : videoBlock.file.url;

      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.includes("youtu.be")
          ? url.split("/").pop()
          : new URL(url).searchParams.get("v");
        return (
          <div key={id} className="mb-6 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="w-full h-full rounded-lg"
              allowFullScreen
              title="YouTube video"
            />
          </div>
        );
      }

      return (
        <div key={id} className="mb-6">
          <video src={url} controls className="w-full rounded-lg">
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    case "embed": {
      const embedUrl = block.embed.url;
      return (
        <div key={id} className="mb-6 aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full rounded-lg border border-border"
            allowFullScreen
            title="Embedded content"
          />
        </div>
      );
    }

    case "bookmark": {
      const bookmarkUrl = block.bookmark.url;
      return (
        <a
          key={id}
          href={bookmarkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors mb-4"
        >
          <span className="text-primary underline text-sm break-all">
            {bookmarkUrl}
          </span>
        </a>
      );
    }

    case "table": {
      if (!block.children) return null;
      return (
        <div key={id} className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <tbody>
              {block.children.map((row, rowIndex) => {
                if (row.type !== "table_row") return null;
                return (
                  <tr key={row.id}>
                    {row.table_row.cells.map((cell, cellIndex) => {
                      const CellTag = rowIndex === 0 ? "th" : "td";
                      return (
                        <CellTag
                          key={cellIndex}
                          className={`border border-border px-4 py-2 text-left ${
                            rowIndex === 0 ? "bg-muted font-semibold" : ""
                          }`}
                        >
                          {extractText(cell)}
                        </CellTag>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    default:
      return null;
  }
}

// Group consecutive list items
function groupListItems(
  blocks: BlockWithChildren[]
): (BlockWithChildren | BlockWithChildren[])[] {
  const grouped: (BlockWithChildren | BlockWithChildren[])[] = [];
  let currentList: BlockWithChildren[] = [];
  let currentListType: "bulleted" | "numbered" | null = null;

  for (const block of blocks) {
    if (block.type === "bulleted_list_item") {
      if (currentListType === "bulleted") {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          grouped.push(currentList);
        }
        currentList = [block];
        currentListType = "bulleted";
      }
    } else if (block.type === "numbered_list_item") {
      if (currentListType === "numbered") {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          grouped.push(currentList);
        }
        currentList = [block];
        currentListType = "numbered";
      }
    } else {
      if (currentList.length > 0) {
        grouped.push(currentList);
        currentList = [];
        currentListType = null;
      }
      grouped.push(block);
    }
  }

  if (currentList.length > 0) {
    grouped.push(currentList);
  }

  return grouped;
}

// Main component
interface NotionBlocksProps {
  blocks: BlockObjectResponse[];
}

export function NotionBlocks({ blocks }: NotionBlocksProps) {
  const groupedBlocks = groupListItems(blocks as BlockWithChildren[]);

  return (
    <div className="notion-content">
      {groupedBlocks.map((item, index) => {
        if (Array.isArray(item)) {
          const listType = item[0].type;
          if (listType === "bulleted_list_item") {
            return (
              <ul key={index} className="list-disc list-inside mb-4 space-y-1">
                {item.map(renderBlock)}
              </ul>
            );
          } else {
            return (
              <ol
                key={index}
                className="list-decimal list-inside mb-4 space-y-1"
              >
                {item.map(renderBlock)}
              </ol>
            );
          }
        }
        return renderBlock(item);
      })}
    </div>
  );
}
