import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
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
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const nodeStyle = {
    width: width !== undefined ? width : undefined,
    minWidth: minWidth !== undefined ? minWidth : undefined,
    height: height !== undefined ? height : undefined,
    ...style,
  };

  return (
    <div className="base-node" style={nodeStyle}>
      <button className="base-node-delete-btn" onClick={handleDelete}>
        &times;
      </button>

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
            className="base-node-handle"
            title={input.label}
          />
        );
      })}

      {inputs.map((input, index) => {
        if (!input.label) return null;
        const topPercent = inputs.length > 0 
          ? `${((index + 1) * 100) / (inputs.length + 1)}%`
          : '50%';
        return (
          <div
            key={`label-input-${input.id}`}
            className="base-node-handle-label base-node-handle-label-input"
            style={{ top: topPercent }}
          >
            {input.label}
          </div>
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
            className="base-node-handle"
            title={output.label}
          />
        );
      })}

      {outputs.map((output, index) => {
        if (!output.label) return null;
        const topPercent = outputs.length > 0 
          ? `${((index + 1) * 100) / (outputs.length + 1)}%`
          : '50%';
        return (
          <div
            key={`label-output-${output.id}`}
            className="base-node-handle-label base-node-handle-label-output"
            style={{ top: topPercent }}
          >
            {output.label}
          </div>
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
