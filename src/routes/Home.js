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
    <div>
      <YuweetFactory userObj={userObj} />
      <div>
        {yuweets.map((yw) => (
          <Yuweet key={yw.id} yuweetObj={yw} isOwner={yw.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
