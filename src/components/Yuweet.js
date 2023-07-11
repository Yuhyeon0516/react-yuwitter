import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { deleteObject, ref } from "firebase/storage";

const Yuweet = ({ yuweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newYuweet, setNewYuweet] = useState(yuweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this yuweet?");

    if (ok) {
      const deleteYuweet = doc(dbService, "yuweets", `${yuweetObj.id}`);
      await deleteDoc(deleteYuweet);
      if (yuweetObj.fileUrl !== "") await deleteObject(ref(storageService, yuweetObj.fileUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (e) => {
    e.preventDefault();

    const updateYuweet = doc(dbService, "yuweets", `${yuweetObj.id}`);

    updateDoc(updateYuweet, { text: newYuweet });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNewYuweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit your yuweet" value={newYuweet} onChange={onChange} required />
            <input type="submit" value="Update Yuweet" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{yuweetObj.text}</h4>
          {yuweetObj.fileUrl && <img src={yuweetObj.fileUrl} width="50px" height="50px" alt="yuweetImage" />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Yuweet</button>
              <button onClick={toggleEditing}>Edit Yuweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Yuweet;
