import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  const handleDelayChange = (e) => {
    setDelay(Number(e.target.value));
  };

  return (
    <BaseNode
      id={id}
      title="Timer Delay"
      label="TIMER"
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
          Delay (ms)
          <input 
            type="number" 
            value={delay} 
            onChange={handleDelayChange} 
            className="node-input"
            min="0"
            step="100"
          />
        </label>
      </div>
    </BaseNode>
  );
};
