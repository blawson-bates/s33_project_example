import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

// import the enumeration from App, to use for calling setWhichScreen
import { ScreenType } from "./App";

import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// modified from: https://www.material-tailwind.com/docs/react/form

// note that a reference to App's setWhichScreen is passed as an arg
export function SignupForm({ setWhichScreen, setCurrentUser, setJsonInfo }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = (event) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // https://firebase.google.com/docs/reference/node/firebase.auth#usercredential
        // https://firebase.google.com/docs/reference/node/firebase.User
        console.log("user with email " + user.email + " created!");
        // note:  have to update account with username after creation
        updateProfile(user, { displayName: username }).then(() => {
          console.log(user.displayName);
          setCurrentUser(user);
          setWhichScreen(ScreenType.TraxGallery);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            User Name
          </Typography>
          <Input
            size="lg"
            placeholder="username"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
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
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree to the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button onClick={signupUser} className="mt-6 bates-button" fullWidth>
          Sign Up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            onClick={() => setWhichScreen(ScreenType.Login)}
            className="ml-2 text-gray-600 font-extrabold hover:text-[#881124] "
          >
            Log In
          </a>
        </Typography>
      </form>
    </Card>
  );
}
