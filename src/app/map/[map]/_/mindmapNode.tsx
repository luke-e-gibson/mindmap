import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type NodeData = {
  label: string;
};

function MindmapNode({ id, data }: NodeProps<Node<NodeData>>) {
  return (
      <div className="p-1">
          <div className="border rounded p-1 bg-white dark:bg-neutral-900">
              <input className="dark:bg-neutral-900" defaultValue={data.label}/>
          </div>
          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
      </div>
  );
}

export default MindmapNode;
