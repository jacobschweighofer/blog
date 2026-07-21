import "./theme";
import { posts } from "./data";
import { renderPostCard } from "./components";
import type { Post } from "./types";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector<HTMLInputElement>(
    'section input[type="text"]',
  );
  const sortSelect =
    document.querySelector<HTMLSelectElement>("section select");
  const postsContainer = document.querySelector<HTMLDivElement>(".grid.gap-8");
  const loadMoreBtn = document.querySelector<HTMLButtonElement>("main button");
  const loadMoreWrapper = loadMoreBtn?.parentElement;

  // Early exit narrows postsContainer to HTMLDivElement for the rest of this scope
  if (!postsContainer) return;

  // --- Pagination State ---
  let currentPage = 1;
  const postsPerPage = 5; // Adjust this number to change how many posts show at a time
  let currentFilteredPosts: Post[] = [];

  // Read initial query params from URL (e.g., ?search=2026-03)
  const params = new URLSearchParams(window.location.search);
  const initialSearch = params.get("search") || "";

  if (searchInput && initialSearch) {
    searchInput.value = initialSearch;
  }

  // Main Filter & Sort function
  function updatePosts(container: HTMLDivElement, resetPagination = true) {
    if (resetPagination) {
      currentPage = 1;
    }

    const query = searchInput?.value.trim().toLowerCase() || "";
    // Fallback defaults to the lowercase string value
    const sortOrder = sortSelect?.value || "newest";

    // Filter by title, summary, tags, or date string
    currentFilteredPosts = posts.filter((post: Post) => {
      const matchesText =
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query);

      const matchesTag = post.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      );

      const matchesDate = post.date.toLowerCase().includes(query);

      return matchesText || matchesTag || matchesDate;
    });

    // Sort by Date
    currentFilteredPosts.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();

      // Compares against explicit lowercase values ("newest" vs "oldest")
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

    // Handle empty state
    if (currentFilteredPosts.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <p class="text-lg text-muted-foreground">No articles found matching your query.</p>
        </div>
      `;
      if (loadMoreWrapper) loadMoreWrapper.classList.add("hidden");
      return;
    }

    // Slice the array to only get the posts up to the current page threshold
    const totalToShow = currentPage * postsPerPage;
    const postsToRender = currentFilteredPosts.slice(0, totalToShow);

    // Render results
    container.innerHTML = postsToRender.map(renderPostCard).join("");

    // Toggle Load More button visibility
    if (loadMoreWrapper) {
      if (totalToShow >= currentFilteredPosts.length) {
        loadMoreWrapper.classList.add("hidden");
      } else {
        loadMoreWrapper.classList.remove("hidden");
      }
    }
  }

  searchInput?.addEventListener("input", () =>
    updatePosts(postsContainer, true),
  );
  sortSelect?.addEventListener("change", () =>
    updatePosts(postsContainer, true),
  );

  // Handle Load More clicks
  loadMoreBtn?.addEventListener("click", () => {
    currentPage++;
    // Pass false so it doesn't reset pagination back to page 1
    updatePosts(postsContainer, false);
  });

  // Initial render on load
  updatePosts(postsContainer, true);
});

window.addEventListener("DOMContentLoaded", () => {
  // Re-enable CSS transitions only after initial paint is complete
  requestAnimationFrame(() => {
    document.documentElement.classList.add("dom-loaded");
  });
});
