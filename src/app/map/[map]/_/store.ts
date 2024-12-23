import { createWithEqualityFn } from "zustand/traditional";
import {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  applyEdgeChanges, XYPosition,
} from "@xyflow/react";
import {nanoid} from "nanoid";

export type MindmapState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addChildNodes: (parentNode: Node, position: XYPosition) => void;
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
  addChildNodes: (parentNode: Node, position: XYPosition) => {
      const newNode: Node = {
        id: nanoid(),
        type: 'mindmap',
        data: { label: "New Node" },
        position: { x: position.x, y: position.y },
        parentId: parentNode.id,
      }

      const newEdge: Edge = {
        id: nanoid(),
        source: parentNode.id,
        target: newNode.id,
      }

      set({
        nodes: [...get().nodes, newNode],
        edges: [...get().edges, newEdge],
      })
  }
}));

export default useStore;