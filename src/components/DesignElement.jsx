// DesignElement.jsx
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

export default function DesignElement({
  el,
  index,
  activeIndex,
  setActiveIndex,
  handleDrag,
  handleScale,
}) {
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: el.x,
    y: el.y,
    scale: el.scale,
  }));

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx, my], memo }) => {
        if (!memo) memo = { startX: el.x, startY: el.y };
        const newX = memo.startX + mx;
        const newY = memo.startY + my;
        api.start({ x: newX, y: newY });
        return memo;
      },
      onPinch: ({ da: [d], origin, memo }) => {
        if (!memo) memo = el.scale;
        const newScale = memo * (d / 100);
        api.start({ scale: newScale });
        return memo;
      },
      onPinchEnd: () => {
        handleScale(index, 1); // обновляем scale в состоянии
      },
      onDragEnd: () => {
        handleDrag(index, 0, 0); // обновим положение
      },
    },
    {
      drag: {
        filterTaps: true,
      },
      pinch: {
        scaleBounds: { min: 0.3, max: 4 },
        rubberband: true,
      },
    }
  );

  return (
    <animated.div
      {...bind()}
      style={{
        position: "absolute",
        x,
        y,
        scale,
        touchAction: "none",
        zIndex: activeIndex === index ? 10000 : 9999,
      }}
      onClick={() => setActiveIndex(index)}
    >
      {el.type === "text" ? (
        <p
          className="font-bold text-xl"
          style={{
            color: el.color || "#000",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {el.content}
        </p>
      ) : (
        <img
          src={el.content}
          alt="uploaded"
          className="max-w-[150px]"
          draggable={false}
          style={{ pointerEvents: "none" }}
        />
      )}
    </animated.div>
  );
}
