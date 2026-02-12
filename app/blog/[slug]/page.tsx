import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/notion";
import { NotionBlocks } from "@/components/blog/notion-blocks";
import { SiteFooter } from "@/components/site-footer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogPostBySlug(slug);

  if (!result) {
    return {
      title: "Post Not Found | pdflocker.io Blog",
    };
  }

  const { post } = result;
  const baseUrl = "https://pdflocker.io";

  return {
    title: `${post.title} | pdflocker.io Blog`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: "pdflocker.io",
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

// Estimate reading time from blocks
function estimateReadingTime(
  blocks: { type: string; [key: string]: unknown }[]
): number {
  let wordCount = 0;

  function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  function extractTextFromRichText(
    richText: Array<{ plain_text: string }> | undefined
  ): string {
    if (!richText) return "";
    return richText.map((t) => t.plain_text).join("");
  }

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        wordCount += countWords(
          extractTextFromRichText(
            (block.paragraph as { rich_text: Array<{ plain_text: string }> })
              ?.rich_text
          )
        );
        break;
      case "heading_1":
        wordCount += countWords(
          extractTextFromRichText(
            (block.heading_1 as { rich_text: Array<{ plain_text: string }> })
              ?.rich_text
          )
        );
        break;
      case "heading_2":
        wordCount += countWords(
          extractTextFromRichText(
            (block.heading_2 as { rich_text: Array<{ plain_text: string }> })
              ?.rich_text
          )
        );
        break;
      case "heading_3":
        wordCount += countWords(
          extractTextFromRichText(
            (block.heading_3 as { rich_text: Array<{ plain_text: string }> })
              ?.rich_text
          )
        );
        break;
      case "bulleted_list_item":
        wordCount += countWords(
          extractTextFromRichText(
            (
              block.bulleted_list_item as {
                rich_text: Array<{ plain_text: string }>;
              }
            )?.rich_text
          )
        );
        break;
      case "numbered_list_item":
        wordCount += countWords(
          extractTextFromRichText(
            (
              block.numbered_list_item as {
                rich_text: Array<{ plain_text: string }>;
              }
            )?.rich_text
          )
        );
        break;
      case "quote":
        wordCount += countWords(
          extractTextFromRichText(
            (block.quote as { rich_text: Array<{ plain_text: string }> })
              ?.rich_text
          )
        );
        break;
    }
  }

  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const result = await getBlogPostBySlug(slug);

  if (!result) {
    notFound();
  }

  const { post, blocks } = result;
  const readingTime = estimateReadingTime(blocks);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const baseUrl = "https://pdflocker.io";

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Back link */}
        <div className="mx-auto max-w-3xl px-4 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mx-auto max-w-3xl px-4 py-8">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-lg text-muted-foreground mb-6">
              {post.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="mx-auto max-w-3xl px-4 pb-16">
          <NotionBlocks blocks={blocks} />
        </article>

        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${baseUrl}/blog/${post.slug}`,
              },
              publisher: {
                "@type": "Organization",
                name: "pdflocker.io",
                url: baseUrl,
              },
              keywords: post.tags.join(", "),
            }),
          }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
