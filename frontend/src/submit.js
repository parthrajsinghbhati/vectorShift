import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const submitResult = useStore((state) => state.submitResult);
  const setSubmitResult = useStore((state) => state.setSubmitResult);

  const isLoading = !!submitResult?.loading;

  const handleSubmit = async () => {
    if (isLoading) return;

    // Set loading state in the store
    setSubmitResult({ loading: true });

    // Extract only necessary fields for nodes and edges
    const payload = {
      nodes: nodes.map((node) => ({ id: node.id })),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      })),
    };

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSubmitResult({
        num_nodes: result.num_nodes,
        num_edges: result.num_edges,
        is_dag: result.is_dag,
      });
    } catch (error) {
      setSubmitResult({
        error: `Could not reach backend. Make sure the backend server is running on port 8000. (${error.message})`,
      });
    }
  };

  return (
    <div className="submit-container">
      <button 
        className="submit-btn" 
        onClick={handleSubmit} 
        disabled={isLoading}
        type="button"
        style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        {isLoading ? 'Submitting...' : 'Submit Pipeline'}
      </button>
    </div>
  );
};

