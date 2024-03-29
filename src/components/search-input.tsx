import React, { useEffect, useRef } from "react";
import { getLocations, GeoLocation } from "../api/location";
import { useState, useTransition } from "react";

type SearchInputProps = {
  onChange: (value: GeoLocation) => void;
};

export default function SearchInput({ onChange }: SearchInputProps) {
  const [, startTransition] = useTransition();
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  // returns event callback with capital
  const onSuggestionClick = (location: GeoLocation) => () => {
    onChange(location);
    setLocations([]);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setLocations([]);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="flex flex-col gap-6 w-72">
      <div className="relative h-11 w-full min-w-[200px]" ref={ref}>
        <input
          placeholder="Enter Your City"
          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans font-normal text-xl text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-white focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          onChange={(e) => {
            const text = e.target.value;
            startTransition(() => {
              getLocations(text).then((locations) => setLocations(locations));
            });
          }}
        />
        {!!locations.length && (
          <div className="absolute top-full bg-white text-black w-full rounded-b-lg">
            {locations.map((location, index) => (
              <button
                onClick={onSuggestionClick(location)}
                className="w-full p-4 flex cursor-pointer"
                key={index}
              >
                {location.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
