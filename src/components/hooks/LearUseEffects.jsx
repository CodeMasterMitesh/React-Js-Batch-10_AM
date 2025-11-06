import { useEffect , useState} from "react";


export const LearUseEffects = () => {
    const [count , setCount] = useState(0);

    useEffect(() => {
       console.log("Component Mounted",count);
    },[count]);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click Me</button>
            <p>Button clicked {count} times</p>
        </div>
    );
}
