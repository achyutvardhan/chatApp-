import React from "react";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
export default function Hamburgerstate() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        size={20}
        easing="ease-in"
        hideOutline={true}
        direction="right"
      />
    </>
  );
}
