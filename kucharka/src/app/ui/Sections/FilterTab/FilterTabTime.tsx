"use client";

import { getCookingTime } from "@/utils/database/getCookingTime";
import { AsyncReturnType } from "@/utils/types/AsyncReturnType";
import { useCallback, useEffect, useRef, useState } from "react";
import style from "./FilterTabTime.module.css";

export type FilterTabTimeProps = AsyncReturnType<typeof getCookingTime>;

export default function FilterTabTime({
  _max: { totalTimeInMinutes: lte },
  _min: { totalTimeInMinutes: gte },
}: FilterTabTimeProps) {
  const min = gte || 0;
  const max = lte || 0;
  const [values, setValues] = useState({ gte: min, lte: max });

  const gteValRef = useRef<HTMLInputElement>(null);
  const lteValRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [max, min]
  );

  useEffect(() => {
    if (lteValRef.current) {
      const minPercent = getPercent(values.gte);
      const maxPercent = getPercent(Number(lteValRef.current.value));

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [getPercent, values.gte]);

  useEffect(() => {
    if (gteValRef.current) {
      const minPercent = getPercent(Number(gteValRef.current.value));
      const maxPercent = getPercent(values.lte);

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [getPercent, values.lte]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-teal-400 underline underline-offset-2">
        Rozsah času:
      </h3>
      <div className={style.inputWrapper}>
        <input
          type="range"
          min={min}
          max={max}
          value={values.gte}
          ref={gteValRef}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), values.lte - 1);
            setValues((prev) => ({ ...prev, gte: value }));
            e.target.value = value.toString();
          }}
          className={`${
            values.gte > max - 100 ? "z-50" : "z-30"
          } appearance-none pointer-events-none absolute h-[0] w-52 outline-none`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={values.lte}
          ref={lteValRef}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), values.gte + 1);
            setValues((prev) => ({ ...prev, lte: value }));
            e.target.value = value.toString();
          }}
          className="z-40 appearance-none pointer-events-none absolute h-0 w-52 outline-none"
        />
        <div className="relative w-52">
          {/* slider */}
          <div className="rounded-md h-2 absolute bg-teal-900 w-full z-10"></div>
          <div
            ref={rangeRef}
            className="rounded-md h-2 absolute bg-teal-300 z-20"
          ></div>
          <div className="text-yellow-500 text-sm mt-5 absolute left-2">
            {values.gte}
          </div>
          <div className="text-yellow-500 text-sm mt-5 absolute -right-1">
            {values.lte}
          </div>
        </div>
      </div>
    </div>
  );
}
