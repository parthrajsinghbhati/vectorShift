import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      label="TEXT"
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      width={200}
    >
      <div className="node-field">
        <label className="node-label">
          Text
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
            className="node-input"
          />
        </label>
      </div>
    </BaseNode>
  );
};
