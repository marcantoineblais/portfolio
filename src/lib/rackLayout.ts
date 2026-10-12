const UNIT_HEIGHTS = {
  sw: 26,
  patch: 18,
  s1: 24,
  s2: 24,
  storage: 56,
  s3: 24,
  blank: 16,
  ups: 44,
};

type Unit = keyof typeof UNIT_HEIGHTS;

/** Vertical layout of the hero cabinet: the top of each unit, and the total height. */
export function rackLayout() {
  let y = 40;
  const tops = {} as Record<Unit, number>;

  for (const [key, height] of Object.entries(UNIT_HEIGHTS)) {
    tops[key as Unit] = y;
    y += height + 6;
  }
  return { ...tops, H: y + 26 };
}
