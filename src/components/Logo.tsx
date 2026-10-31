/** The official logo files from the app (res/drawable-nodpi), never redrawn. */
export function Logo({
  variant = "mark",
  height,
  className = "",
  priority = false,
}: {
  variant?: "mark" | "white";
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round((height * 608) / 263); // native aspect ratio of the PNG
  return (
    <img
      src={variant === "white" ? "/brand/logo-white.png" : "/brand/logo-mark.png"}
      width={width}
      height={height}
      alt="حِفظ"
      className={className}
      style={{ height, width: "auto", aspectRatio: "608 / 263" }}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );
}
