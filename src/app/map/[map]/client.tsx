"use client";
import "@xyflow/react/dist/style.css";
import "@/styles/mapCss.css";
import { useRouter } from "next/navigation";
import {
  Background,
  Controls,
  ReactFlow,
  type OnConnectStart,
  OnConnectEnd,
  ColorMode,
  useStoreApi, useReactFlow, InternalNode, XYPosition
} from "@xyflow/react";
import { shallow } from "zustand/shallow"
import {Touch, TouchEvent, useCallback, useRef} from "react";

import { Button } from "@/components/ui/button";
import useStore, { type MindmapState } from "./_/store";
import MindmapNode from "./_/mindmapNode";
import {useTheme} from "next-themes";
import Link from "next/link";

const selector = (state: MindmapState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNodes: state.addChildNodes,
});
const nodeTypes = { mindmap: MindmapNode }

export default function MapPageClient({ page }: { page: string }) {
  const { theme, resolvedTheme } = useTheme()
  const store = useStoreApi()
  const { nodes, edges, onEdgesChange, onNodesChange, addChildNodes } = useStore(selector, shallow)
  const connectingNodeId = useRef<string | null>(null)
  const { screenToFlowPosition } = useReactFlow()

  const onConnectStart: OnConnectStart = useCallback((_, {nodeId}) => {
    connectingNodeId.current = nodeId;
  }, [])

  const onConnectEnd: (event: (MouseEvent | React.TouchEvent<Element>)) => void = useCallback((event: MouseEvent | TouchEvent<Element>) => {
    const { nodeLookup } = store.getState()
    const targetIsPane = (event.target as Element).classList.contains("react-flow__pane");

    if(targetIsPane && connectingNodeId.current) {
      const parentNode = nodeLookup.get(connectingNodeId.current) as InternalNode
      const childNodePosition = getChildNodePosition(event, parentNode)
      console.log(childNodePosition)
      if(!childNodePosition) throw new Error("Could not find node position")
      addChildNodes(parentNode, childNodePosition)
    }
  }, [])


  function getChildNodePosition(event: MouseEvent | TouchEvent, parentNode?: InternalNode) {
    const { domNode } = store.getState()

    if(!domNode || !parentNode?.internals) return;
    if(!parentNode) throw new Error("No child node found");
    if(!parentNode.measured.width || !parentNode.measured.height) throw new Error("No measured node found");

    const isTouchEvent = 'touches' in event;
    const x = isTouchEvent ? 0 : event.clientX;
    const y = isTouchEvent ? 0 : event.clientY;

    const panePosition = screenToFlowPosition({x, y})

    return {
      x: panePosition.x - parentNode.internals.positionAbsolute.x,
      y: panePosition.y - parentNode.internals.positionAbsolute.y
    }
  }

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        colorMode={resolvedTheme as ColorMode}
        fitView
      >
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
      <div className="sticky z-10 flex w-full justify-between rounded-lg border bg-white p-3 shadow-lg dark:bg-neutral-900">
        <Link href="/">
          <h1 className="items-center text-center border-red-600 text-xl">App Name</h1>
        </Link>
        <div className="flex justify-between gap-3 px-2">
          <Button variant="outline" onClick={() => handelSave()}>
            Save
          </Button>
          <Button variant="default" onClick={() => handelNew()}>
            New
          </Button>
        </div>
      </div>
    </div>
  );
}
