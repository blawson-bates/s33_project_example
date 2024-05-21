import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { ScreenType } from "./App";
import { AddNew } from "./AddNew";

import { auth, storageRef } from "./firebase";
import { signOut } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";

/*
const jsonInfo = [
  {
    bandName: "Wilco",
    songName: "Everyone Hides",
    url: "https://www.youtube.com/embed/P2Gbbd6pVMg?si=vLIzIaxuDG45bXcD",
  },
];
*/

// modified from: https://www.material-tailwind.com/docs/react/gallery

export function ScratchTraxGallery({
  setWhichScreen,
  setVideoURL,
  setCurrentUser,
  currentUser,
  setJsonInfo,
  jsonInfo,
}) {
  // just a state variable to reset inside AddNew when jsonInfo is updated
  // so that this Gallery component will be refreshed;
  // see "Forcing an Update on a Function Component" @
  // https://blog.logrocket.com/how-when-to-force-react-component-re-render/
  const [refresh, setRefresh] = useState("");
  const refreshTraxGallery = () => setRefresh({ ...refresh });

  // format:   http://img.youtube.com/vi/[video-id]/[thumbnail-number].jpg
  // videoURL: https://www.youtube.com/embed/P2Gbbd6pVMg?si=vLIzIaxuDG45bXcD&autoplay=1
  // http://img.youtube.com/vi/P2Gbbd6pVMg/0.jpg
  const getImageLink = (the_url) => {
    return (
      "http://img.youtube.com/vi/" +
      the_url.split("/").pop().split("?")[0] +
      "/0.jpg"
    );
  };

  const writeJsonFile = () => {
    const dirName = String(currentUser.displayName) + "/";
    const jsonRef = ref(storageRef, String(dirName) + "info.json");

    // Stringify the JSON object
    const jsonString = JSON.stringify(jsonInfo);
    // Create a Blob object with the JSON string and
    // set the content type as "application/json"
    const jsonBlob = new Blob([jsonString], { type: "application/json" });

    // Blob object representing the JSON data
    console.log(jsonBlob);

    uploadBytes(jsonRef, jsonBlob).then((snapshot) => {
      console.log("Uploaded file " + dirName + "info.json to Cloud Storage!");
    });
  };

  const logoutUser = (event) => {
    event.preventDefault();
    // first, want to write the current state of the json info to storage
    writeJsonFile();
    // now sign the user out
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("user logged out");
        // change back to the login screen and reset the user state
        setWhichScreen(ScreenType.Login);
        setCurrentUser(null);
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <Typography variant="h4" className="w-[425px] m-auto mb-4 text-center">
        Hello {currentUser.displayName}!
      </Typography>
      <Typography variant="lead" className="w-[425px] m-auto mb-4 text-center">
        Click on an image below to open a video player, or click the + button to
        add a new video entry.
      </Typography>
      <div className="max-h-[450px] w-auto overflow-y-scroll">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {jsonInfo.map(({ bandName, songName, embedURL }, index) => (
            <div key={index}>
              <img
                className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                src={getImageLink(embedURL)}
                alt={bandName + ":" + songName}
                onClick={() => {
                  setWhichScreen(ScreenType.TraxPlayer);
                  setVideoURL(embedURL + "&autoplay=1");
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 space-x-3">
        <AddNew
          setJsonInfo={setJsonInfo}
          jsonInfo={jsonInfo}
          refreshTraxGallery={refreshTraxGallery}
        />
        <Button onClick={logoutUser} className="bates-button">
          Log Out
        </Button>
      </div>
    </div>
  );
}
