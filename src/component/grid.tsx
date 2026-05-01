export default function Grid() {
  const letters = ["A", "B", "C", "D", "E", "F", "G"];

  const labels = Array.from({ length: 7 }, (_, i) =>
    letters.map((x) => `${x}${i + 1}`),
  ).flat();

  return (
    <div className="grid grid-cols-7 gap-2 bg-dark p-4 m-auto rounded-md w-[80vmin] h-[80vmin]">
      {labels.map((label, _) => (
        <div className="block bg-light rounded-sm" key={label}>
          <span className="m-1">{label}</span>
        </div>
      ))}
    </div>
  );
}
