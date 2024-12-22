"use client";
import "@xyflow/react/dist/style.css";
import "@/styles/mapCss.css";
import { useRouter } from "next/navigation";
import { Background, Controls, Panel, ReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";

export default function MapPageClient({ page }: { page: string }) {
  return (
    <main className="h-full w-full">
      <ReactFlow>
        <Header page={page} />
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </main>
  );
}

function Header({page}: {page: string}) {
  const router = useRouter();

  function handelNew() {
    if (confirm("Are you sure you want to create a new map?")) router.push("/map/new");
  } 

  function handelSave() {
    if(page === "new") {
      alert("Not implemented yet")
    }else {
      alert("Not implemented yet")
    }
  }

  return (
    <div className="p-4">
      <div className="sticky z-10 flex w-full justify-between rounded-lg border bg-white p-3">
        <h1 className="items-center text-xl">Mind Map</h1>
        <div className="flex justify-between gap-3 px-2">
          <Button variant="outline" onClick={()=>handelSave()}>Save</Button>
          <Button variant="default" onClick={()=>handelNew()}>New</Button>
        </div>
      </div>
    </div>
  );
}
