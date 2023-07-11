import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [yuweet, setYuweet] = useState("");
  const [yuweets, setYuweets] = useState([]);

  const getYuweets = async () => {
    const dbYuweets = await getDocs(collection(dbService, "yuweets"));
    dbYuweets.forEach((document) => {
      const yuweetObject = {
        ...document.data(),
        id: document.id,
      };
      setYuweets((prev) => [yuweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getYuweets();
  }, []);

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

  console.log(yuweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={yuweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Yuweet" />
      </form>
      <div>
        {yuweets.map((yw) => (
          <div key={yw.id}>
            <h4>{yw.yuweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
