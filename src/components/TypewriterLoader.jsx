import React, { useState, useEffect } from "react";
import Typewriter from "./Typewriter.jsx";
import injector from "./Inject.jsx";

export default function TypewriterLoader() {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    async function fetchTexts() {
      const injectedTexts = await injector();
      setTexts(injectedTexts);
    }
    fetchTexts();
  }, []);

  return <Typewriter texts={["", ...texts, "Oh fuck, I'm unmuted", "umm....You didn't see anything.", "Got it.","","","A",""]} speed={24} pause={750} />;
}
