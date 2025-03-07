import React, { useState, useEffect } from "react";
import { getThings, addThing } from "../api/thingApi";

const ThingComponent: React.FC = () => {
  const [things, setThings] = useState<{ name: string }[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchThings() {
      try {
        const data = await getThings();
        setThings(data);
      } catch (error) {
        console.error("Error fetching things:", error);
      }
    }
    fetchThings();
  }, []);

  const handleAddThing = async () => {
    try {
      await addThing(name);
      const data = await getThings();
      setThings(data);
      setName("");
    } catch (error) {
      console.error("Error adding thing:", error);
    }
  };

  return (
    <div>
      <h1>Things</h1>
      <input
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
      </ul>
    </div>
  );
};

export default ThingComponent;
