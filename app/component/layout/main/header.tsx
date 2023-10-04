"use client";
import { signOut } from "next-auth/react";
import { Typography, Button } from "@mui/material";

const MainHeader = () => {
  return (
    <header className="flex">
      <Typography className="flex justify-center w-full">
        this is header
      </Typography>
      <Button onClick={() => signOut({ redirect: true })}>signout</Button>
    </header>
  );
};

export default MainHeader;
