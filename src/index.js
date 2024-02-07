import React from "react";
import { createRoot } from "react-dom/client";
import Button from "@mui/material/Button";
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import Title from "./Components/Title/Title";
import Content from "./Components/Content/Content";

const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <Header />
    <Title />
    <Form />
    
  </>
);
