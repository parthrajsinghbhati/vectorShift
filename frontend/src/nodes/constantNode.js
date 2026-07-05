import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConstantNode = ({ id, data }) => {
  const [val, setVal] = useState(data?.value || '1.0');

  const handleValueChange = (e) => {
    setVal(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Constant"
      label="CONSTANT"
      inputs={[]}
      outputs={[
        { id: `${id}-value`, label: 'value' },
      ]}
      width={200}
    >
      <div className="node-field">
        <label className="node-label">
          Value
          <input 
            type="text" 
            value={val} 
            onChange={handleValueChange} 
            className="node-input"
          />
        </label>
      </div>
    </BaseNode>
  );
};
