/**
 * The hero title, typed letter by letter: "Marc Antoine" / "Blais" on two
 * lines, the first `visibleLetters` letters shown.
 */
export default function HeroName({
  name,
  visibleLetters,
}: {
  name: string;
  visibleLetters: number;
}) {
  const parts = name.split(" ");
  const lastName = parts.pop() ?? "";
  const lines = [parts.join(" "), lastName];

  return (
    <h1
      aria-label={name}
      className="font-display text-[12.5vw] leading-[0.98] tracking-[0.06em] text-white glow sm:text-[9vw] lg:text-[6.2vw] xl:text-[5.6rem]"
    >
      {lines.map((line, l) => {
        // Index of the line's first letter in the whole name
        const offset = lines.slice(0, l).join(" ").length;
        const letters = line.split("");

        return (
          <span key={l} className="block whitespace-nowrap">
            {letters.map((char, c) => (
              <span
                key={c}
                data-visible={offset + c < visibleLetters || undefined}
                className="opacity-0 transition-opacity duration-700 data-visible:opacity-100"
              >
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </h1>
  );
}
