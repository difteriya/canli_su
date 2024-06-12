import React, { useRef, useState, useEffect } from "react";
import {
  Slider,
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
  SliderMarker
} from "@reach/slider";
import "@reach/slider/styles.css";

const MySlider = ({ min, max, name, value, onChange }) => {
  const rangeRef = useRef(null);
  const thumbRef = useRef(null);
  const [val, setVal] = useState(value ?? 0);
  const onMove = (v) => {
    setVal(v);
    onChange(name, v);
  };

  useEffect(() => {
    if (rangeRef.current) {
      // console.log("styles", rangeRef.current.style.width);
      thumbRef.current.style.left = rangeRef.current.style.width;
    }
  }, [val]);

  return (
    <>
      <SliderInput
        min={min}
        max={max}
        step={1}
        defaultValue={val}
        onChange={onMove}
      >
        <SliderTrack>
          <SliderRange ref={rangeRef} />
          <SliderHandle className="!bg-th-700" />
          <span ref={thumbRef} className="thumb">
            <span className="thumb-value">{val}</span>
          </span>
          <div className="flex justify-between py-2 text-xs font-medium opacity-70">
            <div>{min}</div>
            <div>{max}</div>
          </div>
        </SliderTrack>
      </SliderInput>
    </>
  );
};

export default MySlider;
