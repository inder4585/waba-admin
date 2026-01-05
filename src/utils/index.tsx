import { type Node, type XYPosition } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

let currentId = 0;

export function getNextId() {
  currentId += 1;
  return currentId;
}
interface NodeProperties {
  uniqueName: string;
  message: string;
  button: string[] | null;
  footer: string;
  headerText: string;
  list: Array<{
    title: string;
    sectionList: Array<{
      title: string;
      description: string;
    }>;
  }> | null;
}

interface NodeData {
  onEdit: (id: string) => void;
  onClone: (id: string) => void;
  onDelete: (id: string) => void;
  name: string;
  id: string;
  properties: NodeProperties;
  [key: string]: unknown;
}
export const addNode = (
  id: string,
  type: string,
  position: XYPosition,
  data: NodeData,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
  const newNode = {
    id: id,
    type: type,
    data: data,
    position: position,
  };
  setNodes((nds: Node[]) => nds.concat(newNode));
};

export const deleteNode = (
  id: string,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
  setNodes((nds) => {
    return nds.filter((node) => {
      return node.data?.id !== id;
    });
  });
};

export const updateNode = (
  id: string,
  data: object,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
  setNodes((nds) =>
    nds.map((node) => {
      if (node.id !== id) {
        return node;
      }

      return {
        ...node,
        data: {
          ...node.data,
          ...data,
        },
      };
    })
  );
};

export const uuid = () => {
  return uuidv4();
};
