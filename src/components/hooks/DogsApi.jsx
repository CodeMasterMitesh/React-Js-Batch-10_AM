import { use, useEffect, useState } from "react";

export const DogsApi = () => {
  const API = "https://dog.ceo/api/breeds/image/random";

  const [dogImage, setDogImage] = useState("");

  // console.log(API);
  const getDogImage = () => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setDogImage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    getDogImage();
  }, []);
  return (
    <div>
      <h2>Dogs API Example</h2>
      <button
        onClick={() => {
          getDogImage();
        }}
      >
        Fetch Dog Image
      </button>
      {dogImage && <img src={dogImage} alt="A Random Dog" />}
    </div>
  );
};
