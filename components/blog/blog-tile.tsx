import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogPost } from "@/lib/notion";

interface BlogTileProps {
  post: BlogPost;
}

export function BlogTile({ post }: BlogTileProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors overflow-hidden"
    >
      <div className="flex-1 p-5 sm:p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {post.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 sm:px-6 py-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5" aria-hidden />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            Read more
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
