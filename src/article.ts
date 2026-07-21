import "./theme";
import { posts } from "./data";
import { renderArticleTags, renderArticleBody } from "./components";

document.addEventListener("DOMContentLoaded", () => {
  const articleTitle = document.getElementById(
    "article-title",
  ) as HTMLHeadingElement | null;
  const articleSummary = document.getElementById("article-summary");
  const articleDate = document.getElementById("article-date");
  const articleReadTime = document.getElementById("article-read-time");
  const articleImage = document.getElementById(
    "article-image",
  ) as HTMLImageElement | null;
  const articleImageSkeleton = document.getElementById(
    "article-image-skeleton",
  );
  const articleBody = document.getElementById("article-body");
  const articleTags = document.getElementById("article-tags");

  if (!articleTitle) return;

  // Get post slug from URL query params
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  // Fallback to first post if no slug is provided; if a slug WAS provided but doesn't exist, post will be undefined
  const post = slug !== null ? posts.find((p) => p.slug === slug) : posts[0];

  // Render 404 screen if slug was provided but no matching post was found
  if (!post) {
    document.body.innerHTML = `
      <div class="flex min-h-screen items-center justify-center text-center p-6">
        <div>
          <h1 class="text-4xl font-bold tracking-tight text-foreground">404</h1>
          <p class="mt-2 text-lg text-muted-foreground">Article not found.</p>
          <a href="/" class="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Back to Home
          </a>
        </div>
      </div>
    `;
    return;
  }

  // Populate text values (replaces skeleton placeholders)
  articleTitle.textContent = post.title;
  document.title = `Blog - ${post.title}`;

  if (articleSummary) {
    articleSummary.textContent = post.summary;
  }

  if (articleDate) {
    articleDate.innerHTML = `<i class="fa-regular fa-calendar"></i> ${post.date}`;
  }

  if (articleReadTime) {
    articleReadTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${post.readTime} min read`;
  }

  // Render article content (removes skeleton classes)
  if (articleBody) {
    articleBody.classList.remove("animate-pulse", "space-y-4", "pt-2");
    articleBody.innerHTML = renderArticleBody(post.body);
  }

  // Render tags
  if (articleTags) {
    articleTags.innerHTML = renderArticleTags(post.tags);
  }

  // Handle image loading with skeleton transition
  if (articleImage) {
    articleImage.src = post.image;
    articleImage.alt = post.title;

    // Smooth transition from skeleton once image finishes downloading
    articleImage.onload = () => {
      articleImageSkeleton?.classList.add("hidden");
      articleImage.classList.remove("hidden");
    };
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // Re-enable CSS transitions only after initial paint is complete
  requestAnimationFrame(() => {
    document.documentElement.classList.add("dom-loaded");
  });
});
