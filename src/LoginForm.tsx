import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

// import the enumeration from App, to use for calling setWhichScreen
import { ScreenType } from "./App";

import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { storageRef } from "./firebase";
import { ref, getBytes } from "firebase/storage";

// modified from: https://www.material-tailwind.com/docs/react/form

// note that a reference to App's setWhichScreen is passed as an arg
export function LoginForm({ setWhichScreen, setCurrentUser, setJsonInfo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const loginUser = (event) => {
  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email + " logged in");
        setCurrentUser(user);

        // now fetch the user's JSON, if any
        const dirName = String(user.displayName) + "/";
        const jsonRef = ref(storageRef, String(dirName) + "info.json");
        console.log(jsonRef);
        getBytes(jsonRef)
          .then((result) => {
            // see: https://www.geeksforgeeks.org/javascript-program-to-convert-byte-array-to-json/#
            // see: https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
            // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
            //console.log(">>>>>>>>>>>>>>");
            //console.log(result);
            let json_string = new TextDecoder().decode(result);
            let json_obj = JSON.parse(json_string);
            //console.log(json_string);
            //console.log(typeof json_string);
            //console.log(json_obj);
            setJsonInfo(json_obj);
          })
          .catch((error) => {
            if (error.message.includes("storage/object-not-found")) {
              // no info.json exists on storage; create an empty one
              setJsonInfo([]); // initially empty list of dicts
            }
          });
        // user is logged in, so swap to the Trax Gallery
        setWhichScreen(ScreenType.TraxGallery);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("in second");
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Welcome to Scratch Trax!
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to log in.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email Address
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button onClick={loginUser} className="mt-6 bates-button" fullWidth>
            Log In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <a
              onClick={() => setWhichScreen(ScreenType.Signup)}
              className="ml-2 text-gray-600 font-extrabold hover:text-bates-light"
            >
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
    </>
  );
}
