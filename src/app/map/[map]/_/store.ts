import { createWithEqualityFn } from "zustand/traditional";
import {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  applyEdgeChanges,
} from "@xyflow/react";

export type MindmapState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
};

const useStore = createWithEqualityFn<MindmapState>((set, get) => ({
  nodes: [
    {
      id: "root",
      type: "mindmap",
      data: { label: "react flow" },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [],
  onNodesChange: (change: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(change, get().nodes),
    });
  },
  onEdgesChange: (change: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(change, get().edges),
    });
  },
}));

export default useStore;