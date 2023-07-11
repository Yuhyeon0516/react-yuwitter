import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const YuweetFactory = ({ userObj }) => {
  const [yuweet, setYuweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (e) => {
    if (yuweet === "") {
      return;
    }
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input value={yuweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} className="factoryInput__input" />

        <input type="submit" value="Yuweet" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt="attachImage"
          />
          <div className="factoryForm__clear" onClick={onClearAttachClick}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default YuweetFactory;
