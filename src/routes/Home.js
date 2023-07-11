import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Yuweet from "../components/Yuweet";

const Home = ({ userObj }) => {
  const [yuweet, setYuweet] = useState("");
  const [yuweets, setYuweets] = useState([]);
  const [attachment, setAttachment] = useState();

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

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (readerEvent) => {
      const {
        currentTarget: { result },
      } = readerEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachClick = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={yuweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Yuweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="file" />
            <button onClick={onClearAttachClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {yuweets.map((yw) => (
          <Yuweet key={yw.id} yuweetObj={yw} isOwner={yw.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
