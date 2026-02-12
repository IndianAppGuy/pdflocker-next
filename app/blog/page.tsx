import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getBlogPosts } from "@/lib/notion";
import { BlogTile } from "@/components/blog/blog-tile";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Blog | pdflocker.io",
  description:
    "Tips, guides, and insights on PDF security, document protection, encryption, and digital privacy from pdflocker.io.",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <BookOpen className="size-6 text-primary" aria-hidden />
              </div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Blog
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground mb-4">
              Insights & Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Tips, tutorials, and insights on PDF security, document
              protection, and keeping your files safe.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogTile key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
