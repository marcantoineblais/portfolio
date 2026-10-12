/** Deterministic pseudo-random in [0, 1), so server and client render the same thing. */
export function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 999.13) * 10000;
  return x - Math.floor(x);
}
