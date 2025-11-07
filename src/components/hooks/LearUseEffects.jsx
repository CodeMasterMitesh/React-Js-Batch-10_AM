import { useState, useEffect } from "react";

export const LearnUseEffect = () => {
  const [count, setCount] = useState(0);

  // ✅ EXAMPLE 1: Update document title when count changes
  // Dependency: [count] - runs whenever count changes
  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  // ✅ EXAMPLE 2: Run once on mount (like componentDidMount)
  // Dependency: [] - runs only once when component mounts
  useEffect(() => {
    console.log('Component mounted!');
    return () => console.log('Component will unmount!');
  }, []);

  // ✅ EXAMPLE 3: Proper timer with cleanup
  // Runs once on mount, cleanup on unmount
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(`Current count: ${count}`);
    }, 2000);

    // Cleanup function - runs before next effect or on unmount
    return () => {
      console.log('Cleaning up timer');
      clearInterval(timer);
    };
  }, [count]); // Re-run when count changes

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>useEffect Examples</h2>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Click Me
      </button>
      <p style={{ fontSize: '18px', marginTop: '10px' }}>
        Button clicked <strong>{count}</strong> times
      </p>
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
        <p><strong>Check browser console for:</strong></p>
        <ul>
          <li>Mount/unmount logs</li>
          <li>Timer logs every 2 seconds</li>
          <li>Cleanup logs when count changes</li>
        </ul>
      </div>
    </div>
  );
};
