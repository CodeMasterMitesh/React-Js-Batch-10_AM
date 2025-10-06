import React from "react";
import './Condition.css'

const student = [
    {"name" : "Jaymin","Education" : "B.Tech","collage":"Safrony","per" : 85},
    {"name" : "Bhavin","Education" : "B.E","collage":"HNGU","per" : 65},
    {"name" : "Chirag","Education" : "B.SC","collage":"GTU","per" : 34},
];
export const ConditionLoop = ()=>{

    return(
        <>
        <ul>
            <p>Students Details</p>
            <p><span>Name</span><span>Education</span><span>Collage</span><span>Per</span></p>
            {student.map((ele,index)=>{
                // console.log(ele.name);
            return <li key={index}>
                    <p>{ele.name}</p>
                    <p>{ele.Education}</p>
                    <p>{ele.collage}</p>
                    {/* ternory operator  */}
                    <p className={ele.per < 35 ? 'red' : 'green'}>{ele.per} ({ele.per < 35 ? 'Fail' : 'Pass'})</p> 
                </li>
            })}
        </ul>
        </>

    )
}