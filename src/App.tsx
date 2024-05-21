import { useState } from "react";
import logo from "./assets/scratch_trax.png";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ScratchTraxGallery } from "./ScratchTraxGallery";
import { ScratchTraxPlayer } from "./ScratchTraxPlayer";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export enum ScreenType {
  Login = 0,
  Signup = 1,
  TraxGallery = 2,
  TraxPlayer,
}

function App() {
  // this setWhichScreen state function will be available in
  // subsequent component source files (e.g., LoginForm) by
  // passing setWhichScreen as an argument (see LoginForm and
  // SignupForm below)
  const [whichScreen, setWhichScreen] = useState(ScreenType.Login);
  const [videoURL, setVideoURL] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [jsonInfo, setJsonInfo] = useState([]);

  return (
    <div className="h-lvh w-lvw grid place-content-center">
      <div className="flex-initial flex-col space-between">
        {currentUser === null ? (
          whichScreen === ScreenType.Login ? (
            <>
              <img className="m-auto mb-4" src={logo} alt="Scratch Trax logo" />
              <LoginForm
                setWhichScreen={setWhichScreen}
                setCurrentUser={setCurrentUser}
                setJsonInfo={setJsonInfo}
              />
            </>
          ) : (
            <>
              <img className="m-auto mb-4" src={logo} alt="Scratch Trax logo" />
              <SignupForm
                setWhichScreen={setWhichScreen}
                setCurrentUser={setCurrentUser}
                setJsonInfo={setJsonInfo}
              />
            </>
          )
        ) : whichScreen === ScreenType.TraxGallery ? (
          <ScratchTraxGallery
            setWhichScreen={setWhichScreen}
            setVideoURL={setVideoURL}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setJsonInfo={setJsonInfo}
            jsonInfo={jsonInfo}
          />
        ) : (
          <ScratchTraxPlayer
            setWhichScreen={setWhichScreen}
            videoURL={videoURL}
            username={currentUser.displayName}
          />
        )}
      </div>
    </div>
  );
}

export default App;
