import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot } from "firebase/firestore";

import Yuweet from "../components/Yuweet";
import YuweetFactory from "../components/YuweetFactory";

const Home = ({ userObj }) => {
  const [yuweets, setYuweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "yuweets"), (snapshot) => {
      const yuweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setYuweets(yuweetArray);
    });
  }, []);

  return (
    <div className="routes">
      <div className="container">
        <YuweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
          {yuweets.map((yw) => (
            <Yuweet key={yw.id} yuweetObj={yw} isOwner={yw.creatorId === userObj.uid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
