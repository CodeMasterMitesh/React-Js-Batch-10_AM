
import { useMemo, useState } from "react";

const HeavyCalculation = () => {
    let i = 0;
    while (i < 10000) i++;

    const result = i++;
    return <div>Heavy Calculation Result: {result}</div>;
};

export const UseMemo = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((c) => c + 1);
    };

    return (
        <>
            <div>
                <HeavyCalculation />
                <h2>Use Memo Hook Example</h2>
                <p>Count: {count}</p>
                <button onClick={increment}>Increment</button>
            </div>
        </>
    );
}