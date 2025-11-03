import React,{useState} from "react";

// const user = [
//     { id: 1, name: "Jigar", age: 38 },
//     { id: 2, name: "Alpesh", age: 35 },
//     { id: 3, name: "Mitesh", age: 33 },
//     { id: 4, name: "Vivek", age: 20 },
//     { id: 5, name: "Manish", age: 28 },
//     { id: 6, name: "Jaymin", age: 26 },
//     { id: 7, name: "Vishal", age: 22 }
// ]
// console.log(user);
export function ArrayOfObjectState() { 
    // const [data,setData] = useState(user);
    const [data,setData] = useState([
        { id: 1, name: "Jigar", age: 38 },
        { id: 2, name: "Alpesh", age: 35 },
        { id: 3, name: "Mitesh", age: 33 },
        { id: 4, name: "Vivek", age: 20 },
        { id: 5, name: "Manish", age: 28 },
        { id: 6, name: "Jaymin", age: 26 },
        { id: 7, name: "Vishal", age: 21 },
    ]);

    const userCount = data.length;
    
    const avgAge = data.reduce((total, usr) => total + usr.age, 0) / userCount;
    console.log("Average Age:", avgAge);
    return (
        <div>
            <h2>Array of Object State Example</h2>
            {data.map((usr)=>{
                // console.log(usr);
                return (
                    <div key={usr.id} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                        <p><strong>ID:</strong> {usr.id}</p>
                        <p><strong>Name:</strong> {usr.name}</p>
                        <p><strong>Age:</strong> {usr.age}</p>
                    </div>
                )
            })}
            <h3>Total Users: {userCount}</h3>
            <h3>Average Age: {avgAge.toFixed(2)}</h3>
        </div>
    )

}