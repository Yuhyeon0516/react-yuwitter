import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";

const Router = ({ isLoggedIn }) => {
  return (
    <HashRouter>
      <Routes>{isLoggedIn ? <Route path="/" element={<Home />} /> : <Route path="/" element={<Auth />} />}</Routes>
    </HashRouter>
  );
};

export default Router;
