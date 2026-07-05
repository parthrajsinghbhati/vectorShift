import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'x > 0');

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Filter Data"
      label="FILTER"
      inputs={[
        { id: `${id}-input`, label: 'input' },
      ]}
      outputs={[
        { id: `${id}-output`, label: 'output' },
      ]}
      width={200}
    >
      <div className="node-field">
        <label className="node-label">
          Condition
          <input 
            type="text" 
            value={condition} 
            onChange={handleConditionChange} 
            className="node-input"
            placeholder="e.g. x > 0"
          />
        </label>
      </div>
    </BaseNode>
  );
};
