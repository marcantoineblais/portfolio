import { currentScene, sceneTop, TOP } from "./scenes";

const KEY = "scroll-memory";

export type ScrollPosition = {
  /** Scene on screen ("top" for the hero) */
  scene: string;
  /** How far into that scene, as a share of its height */
  progress: number;
};

function sceneHeight(id: string) {
  const scene = document.getElementById(id);
  if (!scene || id === TOP) return window.innerHeight;
  return scene.offsetHeight;
}

/**
 * Remembers which scene is on screen, and how far into it, before the page
 * is re-rendered in another language. Texts change length between
 * languages, so the position is kept relative to the scene.
 */
export function rememberScrollPosition() {
  const id = currentScene()?.id ?? TOP;
  const top = sceneTop(id) ?? 0;
  const position: ScrollPosition = {
    scene: id,
    progress: (window.scrollY - top) / sceneHeight(id),
  };

  try {
    sessionStorage.setItem(KEY, JSON.stringify(position));
  } catch {
    // Storage blocked: the page opens on the current section instead
  }
}

/** The remembered position, forgotten once read. */
export function takeRememberedPosition(): ScrollPosition | null {
  try {
    const saved = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (!saved) return null;
    return JSON.parse(saved) as ScrollPosition;
  } catch {
    return null;
  }
}

export function scrollToPosition(position: ScrollPosition) {
  const top = sceneTop(position.scene);
  if (top === null) return;

  const offset = position.progress * sceneHeight(position.scene);
  window.scrollTo({ top: top + offset, behavior: "instant" });
}
