import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || 'value === true');

  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Conditional Split"
      label="CONDITIONAL"
      inputs={[
        { id: `${id}-input`, label: 'input' },
      ]}
      outputs={[
        { id: `${id}-true`, label: 'true' },
        { id: `${id}-false`, label: 'false' },
      ]}
      width={200}
    >
      <div className="node-field">
        <label className="node-label">
          Condition Expression
          <input 
            type="text" 
            value={expression} 
            onChange={handleExpressionChange} 
            className="node-input"
            placeholder="e.g. value === true"
          />
        </label>
      </div>
    </BaseNode>
  );
};
