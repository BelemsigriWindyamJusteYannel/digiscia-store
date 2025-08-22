import { useRef } from "react";
import "../App.css"

function AutoScrollContainer({ children }) {
    const scrollRef = useRef(null);
    

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto w-full gap-5 p-5 scroll-smooth custom-scroll-hide whitespace-nowrap"
    >
      {children}
    </div>
  );
}

export default AutoScrollContainer;