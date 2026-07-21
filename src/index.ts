import "./theme";
import { posts } from "./data";
import { renderFeaturedPost, renderPostCard } from "./components";

const featuredContainer = document.getElementById("featured-post");
const postsContainer = document.getElementById("posts");
const recentTopicsContainer = document.getElementById("recent-topics");

// Collect unique first tags from recent posts
function getRecentTags(postsList: typeof posts, limit = 3): string[] {
  const recentTags = new Set<string>();

  for (const post of postsList) {
    if (post.tags && post.tags.length > 0) {
      // Pull the first tag
      recentTags.add(post.tags[0]);
    }

    if (recentTags.size === limit) {
      break;
    }
  }

  return Array.from(recentTags);
}

// --- EMPTY STATE CHECK ---
const mainGrid = document.querySelector("main > .grid");

if (posts.length === 0 && mainGrid) {
  mainGrid.innerHTML = `
    <div class="col-span-full flex flex-col items-center py-24 text-center">
      <div class="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <i class="fa-regular fa-newspaper text-4xl text-muted-foreground"></i>
      </div>

      <h2 class="text-3xl font-bold">
        No articles yet
      </h2>

      <p class="mt-3 max-w-lg text-muted-foreground">
        This blog doesn't have any published articles yet.
      </p>
    </div>
  `;
} else {
  // Render Featured & Latest Posts (Only runs if posts exist)
  if (featuredContainer && postsContainer && posts.length) {
    featuredContainer.innerHTML = renderFeaturedPost(posts[0]);
    postsContainer.innerHTML = posts.slice(1, 4).map(renderPostCard).join("");
  }

  // Render Recent Topics
  if (recentTopicsContainer) {
    const tagsToDisplay = getRecentTags(posts);

    recentTopicsContainer.innerHTML = tagsToDisplay
      .map(
        (tag) => `
      <a
        href="archive.html?search=${encodeURIComponent(tag)}"
        class="rounded-full bg-muted px-4 py-1.5 text-sm hover:bg-accent transition-colors"
      >
        ${tag}
      </a>
    `,
      )
      .join("");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Re-enable CSS transitions only after initial paint is complete
  requestAnimationFrame(() => {
    document.documentElement.classList.add("dom-loaded");
  });
});
