import React from "react";

const Yuweet = ({ yuweetObj, isOwner }) => {
  return (
    <div>
      <h4>{yuweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete Yuweet</button>
          <button>Edit Yuweet</button>
        </>
      )}
    </div>
  );
};

export default Yuweet;
