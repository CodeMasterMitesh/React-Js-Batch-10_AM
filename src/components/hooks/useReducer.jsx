import React,{use, useReducer, useState} from "react"

const UseReducerHook = ()=>{
    // useState example
    const [state, setState] = useState(0);
    console.log("State value:",state);
    
    const incrementState = () =>{
        setState(state + 1);
    }
    const decrementState = () =>{
        setState(state - 1);
    }
    
    // useReducer example
    const incDec = (rstate, action) =>{
        console.log("Reducer called with state and action:",rstate, action);
        if(action.type === 'increment' && action.payload){
            return rstate + action.payload;
        }

        if(action.type === 'decrement' && action.payload){
            return rstate - action.payload;
        }
        // return rstate;
    }
    const [count, dispatch] = useReducer(incDec,0);
    console.log(count);
    // console.log(dispatch);
    return (
        <div>
            <h1>Count :{count}</h1>
            <button onClick={()=> dispatch({type : 'increment',payload: 1})}>Increase</button>
            <button onClick={()=> dispatch({type: 'decrement',payload: 1})}>Decrease</button>
            <hr />
            <h2>State Value : {state}</h2>
            <button onClick={incrementState}>Increment State</button>
            <button onClick={decrementState}>Decrement State</button>
        </div>
    )

}

export default UseReducerHook;