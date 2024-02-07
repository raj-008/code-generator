import React from "react";
import "./form.css";
import Button from "@mui/material/Button";
import { useState, createContext } from "react";
import Content from "../Content/Content";

const Form = () => {
  const [value, setValue] = useState([]);

  const setNewValue = (event) => {
    const formInput = event.currentTarget.value;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formInput;
    const inputElements = tempDiv.querySelectorAll("input, textarea,select");
    inputElements.forEach(function (inputTag) {
      value.push(inputTag.name);
    });
  };

  const [storeOutput, setStore] = useState();

  const generateStore = () => {
    let resultString = "function store(Request $request){\n";
    resultString += "\n $input = $request->all();\n\n";
    resultString += "  Modal::store([\n";
    value.forEach((newValue, index) => {
      if (newValue != "") resultString += `   '${newValue}' => $${newValue}`;
      if (index < value.length - 2) {
        resultString += ",\n";
      }
    });
    resultString += "\n ]);\n\n}\n";
    setStore(resultString);
  };

  const [update, setUpdate] = useState();

  const generateUpdate = () => {
    let resultString = "function update(Request $request){\n";
    resultString += "\n $input = $request->all();\n\n";
    resultString += "  Modal::update([\n";
    value.forEach((newValue, index) => {
      if (newValue != "") resultString += `   '${newValue}' => $${newValue}`;
      if (index < value.length - 2) {
        resultString += ",\n";
      }
    });
    resultString += "\n ]);\n\n}\n";
    setUpdate(resultString);
  };

  const [edit, setEdit] = useState();

  const generateEdit = () => {
    let resultString = "function edit($id){\n\n";
    resultString += "  $data = Modal::find($id)->all();\n\n";
    resultString += "  return view(route('ROUTE_NAME',compact('data)));\n";
    resultString += "}\n";
    setEdit(resultString);
  };

  const [deleteCode, setDelete] = useState();

  const generateDelete = () => {
    let resultString = "function delete($id){\n\n";
    resultString += "  $data = Modal::find($id)->delete();\n\n";
    resultString += "  return view(route('ROUTE_NAME',compact('data)));\n";
    resultString += "}\n";
    setDelete(resultString);
  };

  const callfunctions = () => {
    generateStore();
    generateUpdate();
    generateEdit();
    generateDelete();
  };

  return (
    <>
      <div className="form">
        <textarea name="formInput" id="formInput" onChange={setNewValue} className="form-input" cols={200} placeholder="Upload an HTML form & simply click on generate"></textarea>
        <div className="generate">
          <Button variant="contained" className="generate-btn" onClick={callfunctions}>
            Generate
          </Button>
        </div>
      </div>
      <Content store={storeOutput} edit={edit} update={update} delete={deleteCode} />
    </>
  );
};

export default Form;
