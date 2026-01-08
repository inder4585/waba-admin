'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  type NodeChange,
  applyNodeChanges,
  type EdgeChange,
  applyEdgeChanges,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import FlowStartNode from '../node/FlowStartNode';
import TextNode from '../node/TextNode';
import AskQuestionNode from '../node/AskQuestionNode';
import ButtonNode from '../node/ButtonNode';
import ListNode from '../node/ListNode';
import ConditionNode from '../node/ConditionNode';
import WebhookNode from '../node/WebhookNode';
import SwitchNode from '../node/SwitchNode';
import ScriptNode from '../node/ScriptNode';
import TemplateNode from '../node/TemplateNode';
import MediaButtonNode from '../node/MediaButtonNode';
import MediaNode from '../node/MediaNode';
import CTAButtonNode from '../node/CTAButtonNode';
import EndNode from '../node/EndNode';
import LocationNode from '../node/LocationNode';
import ContactsNode from '../node/ContactsNode';
import CarouselNode from '../node/CarouselNode';

import { dataItems } from '../Sidebar/dataItems';
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = {
  flowStart: FlowStartNode,
  text: TextNode,
  askQuestion: AskQuestionNode,
  template: TemplateNode,
  button: ButtonNode,
  mediaButton: MediaButtonNode,
  media: MediaNode,
  ctaButton: CTAButtonNode,
  list: ListNode,
  condition: ConditionNode,
  webhook: WebhookNode,
  switch: SwitchNode,
  script: ScriptNode,
  end: EndNode,
  location: LocationNode,
  contacts: ContactsNode,
  carousel: CarouselNode,
};

import Overlay from '../overlay';

import Topbar from '../Topbar/Topbar';
import { BackgroundVariant } from '@xyflow/react';
import { MdAdd } from 'react-icons/md';

import { useParams } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { flowBuilderService } from '@/services/flowBuilderService';
import toast from 'react-hot-toast';

const FlowContent: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition, getNodes, getEdges, setCenter } =
    useReactFlow();

  const { data: flowData, isLoading } = useQuery({
    queryKey: ['flow', id],
    queryFn: () => flowBuilderService.getById(id!),
    enabled: !!id,
  });

  React.useEffect(() => {
    if (flowData && flowData) {
      const loadedNodes =
        flowData.nodes?.map((n: any) => ({
          id: n.id,
          type: n.type,
          position: n.position || { x: 0, y: 0 },
          data: n.data || n,
        })) || [];

      const loadedEdges =
        flowData.edges?.map((e: any) => ({
          id: e.id,
          source: e.from || e.source,
          target: e.to || e.target,
          type: 'default',
        })) || [];

      setNodes(loadedNodes);
      setEdges(loadedEdges);
    }
  }, [flowData, setNodes, setEdges]);

  const handleEdit = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node) {
        console.log('click on Seleted Node', node);
        setSelectedNode(node);
        setOpen(true);
      }
    },
    [getNodes]
  );

  const onSubmit = (id: string, data: any) => {
    console.log('onSubmit', id, data);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...data.properties },
            ...data,
          };
        }
        return node;
      })
    );
    setOpen(false);
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeId = uuidv4();
      const initialData = (dataItems as any)[type] || {};

      const newNode: Node = {
        id: newNodeId,
        type,
        position,
        data: initialData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const saveMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      flowBuilderService.update(id, data),
    onSuccess: () => {
      toast.success('Flow saved successfully!');
    },
    onError: (error: any) => {
      toast.error(
        'Failed to save flow: ' +
          (error.response?.data?.message || 'Unknown error')
      );
    },
  });

  const handleSave = useCallback(() => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    const formattedNodes = currentNodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      ...node.data,
    }));

    const formattedEdges = currentEdges.map((edge) => ({
      id: edge.id,
      from: edge.source,
      to: edge.target,
    }));

    const payload = {
      nodes: formattedNodes,
      edges: formattedEdges,
    };

    console.log('Saving Flow:', payload);

    if (id) {
      saveMutation.mutate({ id, data: payload });
    } else {
      toast.error('No Flow ID found to save to.');
    }
  }, [getNodes, getEdges, id, saveMutation]);

  const addNodeCentered = (type: string) => {
    const id = uuidv4();
    const newNode: Node = {
      id,
      type,
      position: { x: 0, y: 0 },
      data: (dataItems as any)[type] || {},
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div
      className="w-full h-full flex flex-col"
      ref={reactFlowWrapper}
    >
      <Topbar
        onSave={handleSave}
        name={flowData?.name ?? ''}
      />

      <div className="flex-1 w-full h-full relative bg-slate-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={() => {}}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          onNodeClick={handleEdit}
          proOptions={{ hideAttribution: true }}
          className="bg-slate-50 transition-colors duration-300"
        >
          <MiniMap
            className=" m-4 border rounded-xl shadow-lg"
            nodeColor={(n) => {
              if (n.type === 'flowStart') return '#10b981';
              if (n.type === 'end') return '#ef4444';
              return '#cbd5e1';
            }}
            maskColor="rgba(241, 245, 249, 0.7)"
          />
          <Controls className="m-4 border-none shadow-lg rounded-xl overflow-hidden" />
          <Background
            color="#e2e8f0"
            gap={24}
            size={2}
            variant={BackgroundVariant.Dots}
          />

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="text-center space-y-4 pointer-events-auto bg-white/50 backdrop-blur-sm p-12 rounded-3xl border border-white/50 shadow-sm">
                <div className="w-20 h-20 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-violet-200 mb-6 rotate-3">
                  <MdAdd className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Start Building Your Flow
                </h2>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Drag components from the sidebar or select a starter:
                </p>

                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={() => addNodeCentered('flowStart')}
                    className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-600 border border-slate-200 hover:border-emerald-200 rounded-full text-sm font-semibold shadow-sm transition-all"
                  >
                    + Start
                  </button>
                  <button
                    onClick={() => addNodeCentered('text')}
                    className="px-4 py-2 bg-white hover:bg-violet-50 text-violet-600 border border-slate-200 hover:border-violet-200 rounded-full text-sm font-semibold shadow-sm transition-all"
                  >
                    + Text
                  </button>
                  <button
                    onClick={() => addNodeCentered('askQuestion')}
                    className="px-4 py-2 bg-white hover:bg-orange-50 text-orange-600 border border-slate-200 hover:border-orange-200 rounded-full text-sm font-semibold shadow-sm transition-all"
                  >
                    + Question
                  </button>
                </div>
              </div>
            </div>
          )}
        </ReactFlow>

        <Overlay
          open={open}
          setOpen={setOpen}
          selectedNode={selectedNode}
          onSubmit={onSubmit}
          onDelete={(id) => setNodes((nds) => nds.filter((n) => n.id !== id))}
        />
      </div>
    </div>
  );
};

const FlowWithProvider = () => (
  <ReactFlowProvider>
    <FlowContent />
  </ReactFlowProvider>
);

export default FlowWithProvider;
