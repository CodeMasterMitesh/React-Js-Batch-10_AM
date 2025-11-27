import React,{useReducer} from "react"

const Increment = ()=>{
    const reducer = (state, action) =>{
        console.log("Reducer called with state and action:",state, action);
        if(action.type === 'increment' && action.payload){
            return state + action.payload;
        }

        if(action.type === 'decrement' && action.payload){
            return state - action.payload;
        }
    }
    const [count, dispatch] = useReducer(reducer,0);
    console.log(count);
    return (
        <div>
            <h1>Count :{count}</h1>
            <button onClick={()=> dispatch({type: 'increment',payload: 1})}>Increase</button>
            <button onClick={()=> dispatch({type: 'decrement',payload: 2})}>Decrease</button>
        </div>
    )

}

export default Increment;