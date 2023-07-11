import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="yuweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container yuweetEdit">
            <input type="text" placeholder="Edit your yuweet" autoFocus value={newYuweet} onChange={onChange} required className="formInput" />
            <input type="submit" value="Update Yuweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancle
          </span>
        </>
      ) : (
        <>
          <h4>{yuweetObj.text}</h4>
          {yuweetObj.fileUrl && <img src={yuweetObj.fileUrl} width="50px" height="50px" alt="yuweetImage" />}
          {isOwner && (
            <div className="yuweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Yuweet;
