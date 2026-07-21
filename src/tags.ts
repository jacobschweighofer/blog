import "./theme";

import { posts } from "./data";

// Element Selectors
const tagInput = document.querySelector(
  'details input[type="text"]',
) as HTMLInputElement;
const orderSelect = document.querySelector(
  "details select",
) as HTMLSelectElement;
const searchButton = document.querySelector(
  "details button",
) as HTMLButtonElement;
const tagsListContainer = document.querySelector(
  "main section > div.divide-y",
) as HTMLDivElement;

// Data Processing: Calculate Tag Frequencies
// This maps over all posts to extract tag names and accurately compute their article count.
interface TagMap {
  [tagName: string]: number;
}

const tagCounts: TagMap = {};
posts.forEach((post) => {
  post.tags.forEach((tag) => {
    if (tagCounts[tag]) {
      tagCounts[tag]++;
    } else {
      tagCounts[tag] = 1;
    }
  });
});

// Convert object map into a structured array of objects for sorting/filtering
interface TagItem {
  name: string;
  count: number;
}

const allTags: TagItem[] = Object.keys(tagCounts).map((name) => ({
  name: name,
  count: tagCounts[name],
}));

// Render & Handle UI State Updates
function updateAndRenderTags() {
  const query = tagInput.value.toLowerCase().trim();
  const orderBy = orderSelect.value; // "Count" or "Alphabetical"

  if (allTags.length === 0) {
    tagsListContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center px-6 py-14 text-center">
  <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-card/15">
    <i class="fa-solid fa-tags text-3xl text-secondary-foreground/70"></i>
  </div>

  <h3 class="text-xl font-semibold text-secondary-foreground">
    No tags found
  </h3>

  <p class="mt-2 max-w-sm text-sm leading-relaxed text-secondary-foreground/75">
    Try a different search term or browse all articles instead.
  </p>

  <a
    href="archive.html"
    class="mt-6 rounded-lg bg-card px-5 py-2 font-medium text-foreground transition hover:bg-muted"
  >
    Browse Articles
  </a>
</div>
  `;

    return;
  }

  // Filter based on input string matching
  let displayTags = allTags.filter((tag) =>
    tag.name.toLowerCase().includes(query),
  );

  // Sort logically according to drop-down selection
  if (orderBy === "Count") {
    // Sort highest counts first
    displayTags.sort((a, b) => b.count - a.count);
  } else if (orderBy === "Alphabetical") {
    // Sort A-Z
    displayTags.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Handle empty search results state
  if (displayTags.length === 0) {
    tagsListContainer.innerHTML = `
      <div class="px-5 py-6 text-center text-sm text-muted-foreground">
        No tags found matching your criteria.
      </div>
    `;
    return;
  }

  // Inject generated functional links. Links route parameters straight to the archive page.
  tagsListContainer.innerHTML = displayTags
    .map(
      (tag) => `
    <a
      href="archive.html?search=${encodeURIComponent(tag.name)}"
      class="block px-5 py-3.5 text-secondary-foreground font-semibold hover:bg-card/45 transition-colors"
    >
      ${tag.name} (${tag.count})
    </a>
  `,
    )
    .join("");
}

// Instantly update when changing sorting values
orderSelect.addEventListener("change", updateAndRenderTags);

searchButton.addEventListener("click", updateAndRenderTags);
tagInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    updateAndRenderTags();
  }
});

// Initial Execution on Document Load
updateAndRenderTags();

window.addEventListener("DOMContentLoaded", () => {
  // Re-enable CSS transitions only after initial paint is complete
  requestAnimationFrame(() => {
    document.documentElement.classList.add("dom-loaded");
  });
});
