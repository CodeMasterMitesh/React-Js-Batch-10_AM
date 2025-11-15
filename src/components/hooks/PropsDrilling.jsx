export const PropsDrilling = () => {

    return (
        <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '5px',border: '1px solid #ccc',height: '100vh',textAlign: 'center' }}>
            <h1>Props Drilling</h1>
            <p>Props drilling is a term used in React to describe the process of passing data from a parent component to a deeply nested child component through multiple layers of intermediary components. This can lead to code that is harder to maintain and understand, as each intermediary component must explicitly pass the props down to its children.</p>
            <p>To avoid props drilling, developers often use state management libraries like Redux or Context API, which allow for more direct access to shared state without the need to pass props through every level of the component tree.</p>
            <ParentComponent data="Hello From Parent" />
        </div>
    );
}

const ParentComponent = (props) => {
    return (
        <div style={{ padding: '10px', background: '#87c7fcff', borderRadius: '5px', border: '1px solid #ccc', width: '700px',textAlign: 'center',margin: '0 auto',marginTop: '20px' }}>
            <h2>Parent Component</h2>
            <ChildComponent data={props.data} />
        </div>
    )
}

const ChildComponent = (props) =>{
    return (
        <div style={{ padding: '10px', background: '#fcd87cff', borderRadius: '5px', border: '1px solid #ccc', width: '500px',textAlign: 'center',margin: '0 auto',marginTop: '20px' }}>
            <h3>Child Component</h3>
            <GrandChildComponent data={props.data} />
        </div>
    )
}

const GrandChildComponent = (props) =>{
    return (
        <div style={{ padding: '10px', background: '#d4fca3ff', borderRadius: '5px', border: '1px solid #ccc', width: '300px',textAlign: 'center',margin: '0 auto',marginTop: '20px' }}>
            <h4>GrandChild Component</h4>
            <GranGrandChildComponent data={props.data} />
        </div>
    )
}

const GranGrandChildComponent = (props) =>{
    return (
        <div style={{ padding: '10px', background: '#eeffb7ff', borderRadius: '5px', border: '1px solid #ccc', width: '200px',textAlign: 'center',margin: '0 auto',marginTop: '20px' }}>
            <h4>GranGrandChild Component</h4>
            <p>Data received: {props.data}</p>
        </div>
    )
}