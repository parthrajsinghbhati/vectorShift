import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      label="LLM"
      inputs={[
        { id: `${id}-system`, label: 'system' },
        { id: `${id}-prompt`, label: 'prompt' },
      ]}
      outputs={[
        { id: `${id}-response`, label: 'response' },
      ]}
      width={200}
    >
      <div className="node-description">
        This is a LLM.
      </div>
    </BaseNode>
  );
};
