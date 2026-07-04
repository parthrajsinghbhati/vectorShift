import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ResultPanel } from './components/ResultPanel';
import { useStore } from './store';

function App() {
  const submitResult = useStore((state) => state.submitResult);
  const clearSubmitResult = useStore((state) => state.clearSubmitResult);

  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      {submitResult && (
        <ResultPanel result={submitResult} onClose={clearSubmitResult} />
      )}
    </div>
  );
}

export default App;

