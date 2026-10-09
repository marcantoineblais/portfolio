/**
 * Smooth-scrolls to a section by id.
 *
 * Sections are sticky "scenes", so the browser's native anchor scrolling can
 * aim at where a section is currently pinned rather than where it naturally
 * starts. We compute the natural position instead: the scenes' container top
 * plus the heights of every scene before the target.
 */
export function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const container = target.parentElement;
  let top: number;

  if (target.hasAttribute("data-scene") && container) {
    top = container.getBoundingClientRect().top + window.scrollY;
    for (const child of Array.from(container.children)) {
      if (child === target) break;
      top += (child as HTMLElement).offsetHeight;
    }
  } else {
    top = target.getBoundingClientRect().top + window.scrollY;
  }

  window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}
