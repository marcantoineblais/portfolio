import { isSection, type Section } from "./sections";

/** Id of the hero, the "scene" before every [data-scene] */
export const TOP = "top";

export function getScenes() {
  const nodes = document.querySelectorAll<HTMLElement>("[data-scene]");
  return Array.from(nodes);
}

/**
 * Where a scene starts in the page. Scenes are sticky, so their bounding box
 * can be where one is pinned rather than where it naturally starts: we add
 * up the heights of the scenes before it instead.
 */
export function sceneTop(id: string): number | null {
  if (id === TOP) return 0;

  const target = document.getElementById(id);
  if (!target) return null;

  const container = target.parentElement;
  if (!target.hasAttribute("data-scene") || !container) {
    return target.getBoundingClientRect().top + window.scrollY;
  }

  let top = container.getBoundingClientRect().top + window.scrollY;
  for (const child of Array.from(container.children)) {
    if (child === target) break;
    top += (child as HTMLElement).offsetHeight;
  }
  return top;
}

/**
 * The scene on screen: scenes stack on top of each other, so it's the last
 * one whose top passed mid-screen (the hero when none did).
 */
export function currentScene(): HTMLElement | null {
  const middle = window.innerHeight / 2;
  let current: HTMLElement | null = null;

  for (const scene of getScenes()) {
    if (scene.getBoundingClientRect().top <= middle) current = scene;
  }
  return current;
}

/** The section on screen (project scenes all belong to "projects"). */
export function currentSection(): Section | null {
  const scene = currentScene();
  if (!scene) return null;

  const section = scene.dataset.nav ?? scene.id;
  if (!isSection(section)) return null;
  return section;
}
