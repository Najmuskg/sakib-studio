import type { AnimationItem } from "./data/animations";

interface CodePanelProps {
  selected: AnimationItem | null;
  onCopy: () => void;
}

export default function CodePanel({ selected, onCopy }: CodePanelProps) {
  if (!selected) return null;

  return (
    <div>
      <h3>{selected.title}</h3>
      <button onClick={onCopy}>Copy</button>
      <pre>{selected.code}</pre>
    </div>
  );
}