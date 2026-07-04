import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200 });

  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const deleteEdgesForHandles = useStore((state) => state.deleteEdgesForHandles);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.push(match[1]);
    }
    const uniqueVars = Array.from(new Set(matches));

    const removedVars = variables.filter((v) => !uniqueVars.includes(v));
    if (removedVars.length > 0) {
      const removedHandleIds = removedVars.map((v) => `${id}-${v}`);
      deleteEdgesForHandles(id, removedHandleIds);
    }

    if (JSON.stringify(uniqueVars) !== JSON.stringify(variables)) {
      setVariables(uniqueVars);
    }

    updateNodeField(id, 'text', currText);
  }, [currText, variables, id, deleteEdgesForHandles, updateNodeField]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${scrollHeight}px`;

    const lines = currText.split('\n');
    const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
    
    const newWidth = Math.min(Math.max(longestLine * 8 + 42, 200), 450);

    setDimensions({ width: newWidth });
  }, [currText, variables]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, dimensions, variables, updateNodeInternals]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const inputHandles = variables.map((v) => ({
    id: `${id}-${v}`,
    label: v,
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      label="TEXT"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      width={dimensions.width}
    >
      <div className="node-field">
        <label className="node-label">
          Text
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className="node-textarea"
            rows={1}
          />
        </label>
      </div>
    </BaseNode>
  );
};
