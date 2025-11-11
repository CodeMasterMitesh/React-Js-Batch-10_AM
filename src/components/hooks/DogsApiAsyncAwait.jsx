import { use, useEffect, useState } from "react";


export const DogsApiAsyncAwait = () => {
    const API = 'https://dog.ceo/api/breeds/image/random';

    const [dogImage, setDogImage] = useState('');

    // console.log(API);
    const getDogImage = async () => {
        const response = await fetch(API);
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        setDogImage(data.message);
    }
    return (
    <div>
            <h2>Dogs API Example</h2>
            <button onClick={ () => {
                getDogImage();
            }}>Fetch Dog Image</button>
            {dogImage && <img src={dogImage} alt="A Random Dog" />}
        </div>
    );

}