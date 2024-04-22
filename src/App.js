import React, { useEffect, useState } from "react";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";
// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

import fakeBackend from "./helpers/AuthType/fakeBackend";
import UpdateActiveTimeModal from "./UpdateActiveTimeModal";
import { useLocation } from "react-router-dom";
import { updateSession } from "./helpers/fakebackend_helper";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

function App() {
  const location = useLocation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setModalVisible(true);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);

  function tog_modal() {
    setModalVisible(!modalVisible);
  }

  async function handleUpdateSession() {
    const response = await updateSession();
    console.log("update session response ->", response);

    setModalVisible(!modalVisible);
  }

  return (
    <React.Fragment>
      <UpdateActiveTimeModal
        modalVisible={modalVisible}
        tog_modal={tog_modal}
        handleUpdateSession={handleUpdateSession}
      />
      <Route />
    </React.Fragment>
  );
}

export default App;
