//import React from "react";
import { Button } from "@material-tailwind/react";
import { ScreenType } from "./App";

// iframe from YouTube's embed option, with camel-case names per React
//export function ScratchTraxPlayer({ setWhichScreen, username, videoURL }) {
export function ScratchTraxPlayer({ setWhichScreen, videoURL }) {
  return (
    <div className="flex flex-col items-center border-2 border-black border-solid rounded-lg bg-gray-200 w-full h-full p-8">
      <iframe
        width="560"
        height="315"
        src={videoURL}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <Button
        onClick={() => setWhichScreen(ScreenType.TraxGallery)}
        className="w-48 bates-button mt-8"
      >
        &lt;&lt;&lt;&nbsp; Back to Gallery
      </Button>
    </div>
  );
}
