"use client";
import "@xyflow/react/dist/style.css";
import "@/styles/mapCss.css";

import { Background, Controls, Panel, ReactFlow } from "@xyflow/react";
import { Button } from "@/app/_components/components";

export default function MapPageClient() {
  return (
    <main className="h-full w-full">
      <ReactFlow>
        <Background />
        <Controls showInteractive={false} />
        <div className="p-4">
          <div className="sticky z-10 flex w-full justify-between rounded border bg-white p-3">
            <h1 className="items-center text-xl">Mind Map</h1>
            <div className="flex justify-between gap-3 px-2">
              <Button>New</Button>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </ReactFlow>
    </main>
  );
}
