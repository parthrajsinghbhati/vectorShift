import React, { useEffect } from 'react';
import '../styles/ResultPanel.css';

export const ResultPanel = ({ result, onClose }) => {
  useEffect(() => {
    if (!result || result.loading) return;

    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [result, onClose]);

  if (!result) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={`result-panel ${result.loading ? 'loading' : ''} ${result.error ? 'error' : ''}`}>
      <button className="result-panel-close-btn" onClick={handleClose} aria-label="Close panel">
        &times;
      </button>
      
      {result.loading && (
        <>
          <h3 className="result-panel-title">Analyzing Pipeline</h3>
          <div className="result-panel-loading-text">
            Checking structure and topology...
          </div>
        </>
      )}

      {result.error && (
        <>
          <h3 className="result-panel-title error-title">Submission Failed</h3>
          <div className="result-panel-error-text">
            {result.error}
          </div>
        </>
      )}

      {!result.loading && !result.error && (
        <>
          <h3 className="result-panel-title">Pipeline Summary</h3>
          <div className="result-stats">
            <div className="result-row">
              <span className="result-label">Nodes</span>
              <span className="result-value">{result.num_nodes}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Edges</span>
              <span className="result-value">{result.num_edges}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Structure</span>
              <span className={`result-value ${result.is_dag ? 'dag-valid' : 'dag-invalid'}`}>
                {result.is_dag ? 'Valid DAG \u2713' : 'Contains Cycle'}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
