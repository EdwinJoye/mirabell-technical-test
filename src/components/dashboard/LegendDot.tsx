type LegendDotProps = {
  color: string;
};

export function LegendDot({ color }: LegendDotProps) {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );
}
