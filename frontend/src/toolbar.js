// toolbar.js

import { DraggableNode } from './draggableNode';
import './styles/toolbar.css';

export const PipelineToolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <h2 className="pipeline-toolbar-title">VectorShift Flow</h2>
      <div className="pipeline-toolbar-list">
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='math' label='Math' />
        <DraggableNode type='constant' label='Constant' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='timer' label='Timer' />
        <DraggableNode type='conditional' label='Conditional' />
      </div>
    </div>
  );
};
