import type { AnimationItem } from "./data/animations";
import AnimationPreview from "./AnimationPreview";

interface AnimationCardProps {
  item: AnimationItem;
  onClick: () => void;
  active: boolean;
  typeStyle: {
    bg: string;
    text: string;
  };
}

export default function AnimationCard({ item, onClick, active, typeStyle }: AnimationCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        border: active ? "2px solid #6366f1" : "1px solid #222",
        borderRadius: 12,
        cursor: "pointer"
      }}>
      <div style={{height:120}}>
        <AnimationPreview id={item.id}/>
      </div>
      <div style={{padding:10}}>
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
      </div>
    </div>
  );
}