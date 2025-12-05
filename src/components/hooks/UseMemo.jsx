
import { useMemo, useState } from "react";

const HeavyCalculation = () => {
    const sum = () => {
         let i = 0;
         while (i <= 1000000000) i++;
         i += 1;
         return i;
    }
    // const result = sum();

    const result = useMemo(() =>{
        return sum();
    }, []);
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