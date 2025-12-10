import { use, useEffect, useState } from "react";

export const UseEffectExample = () => {
  const API = "https://jsonplaceholder.typicode.com/posts";
  const [posts, setPosts] = useState([]);

  // fetch(API).then(response => response.json()).then(data => setPosts(data));
  // console.log(posts);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Use Effect Example</h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          border: "1px solid #ccc",
          borderRadius: "4px",
          flexDirection: "column",
          display: "flex",
        }}
      >
        {posts.map((post) => (
          <li
            key={post.id}
            style={{ borderBottom: "1px solid #eee", padding: "12px 16px" }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
