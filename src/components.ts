import type { Post } from "./types";
import { marked } from "marked";
import DOMPurify from "dompurify";

export function renderTags(tags: string[]): string {
  return tags
    .map(
      (tag) => `
    <a
      href="archive.html?search=${encodeURIComponent(tag)}"
      class="relative z-20 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
    >
      ${tag}
    </a>
  `,
    )
    .join("");
}

export function renderArticleTags(tags: string[]): string {
  return tags
    .map(
      (tag) => `
    <a 
    href="archive.html?search=${encodeURIComponent(tag)}"
    class="z-20 rounded-full bg-background text-foreground px-4 py-1 text-xs font-medium shadow-sm transition-colors duration-200 hover:bg-accent hover:text-accent-foreground">
      ${tag}
    </a>
  `,
    )
    .join("");
}

export function renderMeta(post: Post): string {
  return `
    <div class="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
      <div class="flex items-center gap-2">
        <i class="fa-regular fa-calendar"></i>${post.date}
      </div>
      <div class="flex items-center gap-2">
        <i class="fa-regular fa-clock"></i>${post.readTime} min read
      </div>
    </div>`;
}

export function renderFeaturedPost(post: Post): string {
  return `
    <div class="relative">
      <img
        src="${post.image}"
        alt="${post.title}"
        class="h-64 w-full object-cover sm:h-80 lg:h-72"
      >
      <div class="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
        <i class="fa-solid fa-star text-sm"></i>
      </div>
    </div>

    <div class="flex h-full flex-col p-6">
      <div class="flex flex-wrap gap-2">
        ${renderTags(post.tags)}
      </div>

      <div class="mt-5">
        <h3 class="text-2xl font-bold">
          <a href="article.html?slug=${post.slug}" class="after:absolute after:inset-0">
            ${post.title}
          </a>
        </h3>

        <p class="mt-2 text-muted-foreground">
          ${post.summary}
        </p>
      </div>

      ${renderMeta(post)}
    </div>`;
}

export function renderPostCard(post: Post): string {
  return `
    <article class="relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-black/20 transition md:grid-cols-[200px_1fr]">
      <img
        src="${post.image}"
        alt="${post.title}"
        class="h-56 w-full object-cover md:h-full md:w-55"
      >

      <div class="flex flex-col p-6">
        <div class="flex flex-wrap gap-2">
          ${renderTags(post.tags)}
        </div>

        <div class="mt-4">
          <h3 class="text-xl font-bold">
            <a href="article.html?slug=${post.slug}" class="after:absolute after:inset-0">
              ${post.title}
            </a>
          </h3>

          <p class="mt-1 text-sm text-muted-foreground">
            ${post.summary}
          </p>
        </div>

        <div class="mt-auto pt-5">
          ${renderMeta(post)}
        </div>
      </div>
    </article>`;
}

export function renderArticleBody(body: string): string {
  // Convert Markdown string to HTML string
  const rawHtml = marked.parse(body) as string;
  // Sanitize the HTML to prevent cross-site scripting (XSS) attacks
  return DOMPurify.sanitize(rawHtml);
}
