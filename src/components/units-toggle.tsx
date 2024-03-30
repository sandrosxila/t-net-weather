import React from "react";
import { UNITS } from "../api/models";

type UnitsToggleProps = {
  units: UNITS;
  onChange: (units: UNITS) => void;
};

export const UnitsToggle = ({ units, onChange }: UnitsToggleProps) => {
  const onButtonClick = (newUnits: UNITS) => () => {
    if (newUnits !== units) {
      onChange(newUnits);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex relative gap-4 w-80">
        <div
          className={`transition-[transform] duration-300 w-[calc(50%-0.5rem)] ${
            units === UNITS.IMPERIAL && `translate-x-[calc(100%+1rem)]`
          } h-full bg-white rounded absolute`}
        />
        <button
          onClick={onButtonClick(UNITS.METRIC)}
          className={`z-10 flex grow basis-0 justify-center transition-[color] duration-300 ${
            units === UNITS.METRIC ? "text-black" : "text-white"
          }`}
        >
          Metric: °C, m/s
        </button>
        <button
          onClick={onButtonClick(UNITS.IMPERIAL)}
          className={`z-10 flex grow basis-0 justify-center transition-[color] duration-300 ${
            units === UNITS.IMPERIAL ? "text-black" : "text-white"
          }`}
        >
          Imperial: °F, mph
        </button>
      </div>
    </div>
  );
};
