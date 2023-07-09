import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Main from "./Pages/Main/Main";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Forum from "./Pages/Forum/Forum";
import ForumDetails from "./Pages/ForumDetails/ForumDetails";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <Header />
              <Main />
            </div>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/profile/:username"
          element={
            <div>
              <Header />
              <Profile />
            </div>
          }
        />
        <Route
          exact
          path="/forum/:id"
          element={
            <div>
              <Header />
              <Forum />
            </div>
          }
        />
        <Route
          exact
          path="/forum-details/:id"
          element={
            <div>
              <Header />
              <ForumDetails />
            </div>
          }
        />
        <Route exact path="*" element={<NotFound />}></Route> *
      </Routes>
    </BrowserRouter>
  );
}

export default App;
