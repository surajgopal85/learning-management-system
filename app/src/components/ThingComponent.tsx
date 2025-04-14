// import React, { useState, useEffect } from "react";
// import { getThings, addThing } from "../api/thingApi";

const ThingComponent: React.FC = () => {
  // const [things, setThings] = useState<{ name: string }[]>([]);
  // const [name, setName] = useState("");

  // useEffect(() => {
  //   async function fetchThings() {
  //     try {
  //       const data = await getThings();
  //       setThings(data);
  //     } catch (error) {
  //       console.error("Error fetching things:", error);
  //     }
  //   }
  //   fetchThings();
  // }, []);

  // const handleAddThing = async () => {
  //   try {
  //     await addThing(name);
  //     const data = await getThings();
  //     setThings(data);
  //     setName("");
  //   } catch (error) {
  //     console.error("Error adding thing:", error);
  //   }
  // };

  return (
    <div>
      <h1>Home - #MySchool</h1>
      <h3>All About My School</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      {/* <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter thing name"
      />
      <button onClick={handleAddThing}>Add Thing</button>
      <ul>
        {things.map((thing, index) => (
          <li key={index}>{thing.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default ThingComponent;
