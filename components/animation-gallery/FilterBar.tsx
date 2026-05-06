import type { Dispatch, SetStateAction } from "react";

interface FilterBarProps {
  tags: string[];
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

export default function FilterBar({ tags, active, setActive }: FilterBarProps) {
  return (
    <div>
      {tags.map(t => (
        <button key={t} onClick={()=>setActive(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}