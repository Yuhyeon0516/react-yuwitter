import React, { useEffect } from "react";
import { authService, dbService } from "../fbase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = async () => {
    await authService.signOut();
    navigate("/");
  };

  const getMyYuweets = async () => {
    const q = query(collection(dbService, "yuweets"), where("creatorId", "==", userObj.uid), orderBy("creatorId", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getMyYuweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
