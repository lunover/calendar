"use client";

import React from "react";
import { cn } from "@/lib/utils";

function FullCalendarSkeleton() {
  return (
    <>
      {Array.from({ length: 42 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "aspect-square md:aspect-[4/2] pt-2 pb-10 px-3 font-mono text-lg relative flex flex-col space-y-2 select-none bg-background h-full overflow-hidden"
          )}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-2xl">
              <span className="bg-muted w-12 h-10 block"></span>
            </div>
            <div className="bg-muted w-12 h-4"></div>
          </div>
          <div className="flex flex-col w-full">
            <div className="inline-flex items-center border px-2.5 py-0.5 mb-2 bg-muted w-full h-4"></div>
            <div className="bg-muted py-1 px-2 w-full min-h-[23px]"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export default FullCalendarSkeleton;
