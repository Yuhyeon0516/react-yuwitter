import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [yuweet, setYuweet] = useState("");
  const [yuweets, setYuweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "yuweets"), (snapshot) => {
      const yuweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setYuweets(yuweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, "yuweets"), {
      text: yuweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
      <div>
        {yuweets.map((yw) => (
          <div key={yw.id}>
            <h4>{yw.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
