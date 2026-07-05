import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || '+');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Math Operation"
      label="MATH"
      inputs={[
        { id: `${id}-num1`, label: 'num1' },
        { id: `${id}-num2`, label: 'num2' },
      ]}
      outputs={[
        { id: `${id}-result`, label: 'result' },
      ]}
      width={200}
    >
      <div className="node-field">
        <label className="node-label">
          Operation
          <select 
            value={operation} 
            onChange={handleOperationChange} 
            className="node-select"
          >
            <option value="+">Add (+)</option>
            <option value="-">Subtract (-)</option>
            <option value="*">Multiply (*)</option>
            <option value="/">Divide (/)</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
