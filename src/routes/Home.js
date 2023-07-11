import React, { useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const [yuweet, setYuweet] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, "yuweets"), {
      yuweet: yuweet,
      createdAt: Date.now(),
    });
    setYuweet("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setYuweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={yuweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Yuweet" />
      </form>
    </div>
  );
};

export default Home;
