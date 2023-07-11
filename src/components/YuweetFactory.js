import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { addDoc, collection } from "firebase/firestore";

const YuweetFactory = ({ userObj }) => {
  const [yuweet, setYuweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuid()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }
    const uploadYuweet = {
      text: yuweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl: fileUrl,
    };

    await addDoc(collection(dbService, "yuweets"), uploadYuweet);
    setYuweet("");
    setAttachment("");
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

  const onClearAttachClick = () => setAttachment("");

  return (
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
  );
};

export default YuweetFactory;
