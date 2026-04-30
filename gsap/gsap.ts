import _gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import _SplitText from "gsap/SplitText";

if (typeof window !== "undefined") {
  _gsap.registerPlugin(_ScrollTrigger, _SplitText);
}

export default _gsap;
export { _ScrollTrigger as ScrollTrigger, _SplitText as SplitText };
