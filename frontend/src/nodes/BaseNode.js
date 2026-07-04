import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/BaseNode.css';

export const BaseNode = ({
  id,
  title,
  label,
  inputs = [],
  outputs = [],
  children,
  width,
  minWidth,
  height,
  style = {},
}) => {
  const nodeStyle = {
    width: width !== undefined ? width : undefined,
    minWidth: minWidth !== undefined ? minWidth : undefined,
    height: height !== undefined ? height : undefined,
    ...style,
  };

  return (
    <div className="base-node" style={nodeStyle}>
      {inputs.map((input, index) => {
        const topPercent = inputs.length > 0 
          ? `${((index + 1) * 100) / (inputs.length + 1)}%`
          : '50%';
        return (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={input.id}
            style={{ top: topPercent }}
            className="base-node-handle base-node-handle-input"
            title={input.label}
          />
        );
      })}

      {outputs.map((output, index) => {
        const topPercent = outputs.length > 0 
          ? `${((index + 1) * 100) / (outputs.length + 1)}%`
          : '50%';
        return (
          <Handle
            key={output.id}
            type="source"
            position={Position.Right}
            id={output.id}
            style={{ top: topPercent }}
            className="base-node-handle base-node-handle-output"
            title={output.label}
          />
        );
      })}

      <div className="base-node-header">
        {label && <span className="base-node-label">{label}</span>}
        <h3 className="base-node-title">{title}</h3>
      </div>

      <div className="base-node-content">
        {children}
      </div>
    </div>
  );
};
