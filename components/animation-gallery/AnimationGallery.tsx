"use client";

import { useCallback, useState } from "react";
import type { AnimationItem } from "./data/animations";
import { ANIMATIONS, ALL_TAGS, TYPE_COLOR } from "./data/animations";
import AnimationCard from "./AnimationCard";
import FilterBar from "./FilterBar";
import CodePanel from "./CodePanel";

export default function AnimationGallery() {
  const [tag, setTag] = useState("all");
  const [selected, setSelected] = useState<AnimationItem | null>(null);

  const filtered = ANIMATIONS.filter((animation) =>
    tag === "all" || animation.tags.includes(tag)
  );

  return (
    <div>
      <FilterBar tags={ALL_TAGS} active={tag} setActive={setTag}/>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {filtered.map((animation) => (
          <AnimationCard
            key={animation.id}
            item={animation}
            active={selected?.id === animation.id}
            onClick={() => setSelected(animation)}
            typeStyle={TYPE_COLOR[animation.type]}
          />
        ))}
      </div>

      <CodePanel
        selected={selected}
        onCopy={() => selected && navigator.clipboard.writeText(selected.code)}
      />
    </div>
  );
}