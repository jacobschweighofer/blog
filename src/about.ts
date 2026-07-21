import "./theme";
import { marked } from "marked";
import DOMPurify from "dompurify";

const about = `
# Hi, I'm Jacob.

I'm a self-taught frontend developer who mainly works with TypeScript, Vite, and modern web technologies.

Most of my time is spent building software, figuring out why it breaks, and improving it.

Right now, I'm building an indie game from scratch while learning more about UI design and frontend architecture. I like interfaces that are simple, functional, and free of unnecessary clutter, with a lot of inspiration coming from Scandinavian and Japanese design.

## About this blog

This is where I document what I'm building, write about problems I've solved, and share tutorials on topics I've learned well enough to explain.

## Work

I'm currently looking for opportunities to work with a team, build useful software, and continue improving as a developer.

If you'd like to collaborate or get in touch, feel free to send me an email.
`;

window.addEventListener("DOMContentLoaded", async () => {
  // Re-enable CSS transitions after the first paint
  requestAnimationFrame(() => {
    document.documentElement.classList.add("dom-loaded");
  });

  const html = await marked.parse(about);

  document.querySelector("#about")!.innerHTML = DOMPurify.sanitize(html);
});
