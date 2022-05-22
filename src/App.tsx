import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <header>
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
      </header>
    </div>
  );
}

export default App;
