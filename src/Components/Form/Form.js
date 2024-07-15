import React from "react";
import "./form.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import Content from "../Content/Content";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { snakeToCamelCase } from "../../helpers";

const DarkTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "lightgrey",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

const Form = () => {
  const [formInput, setFormInput] = useState([]);
  const [modalName, setModalName] = useState("Modal");

  const setModal = (e) => {
    let modalName = e.target.value;

    setModalName(() => {
      if (modalName.length) {
        return modalName[0].toUpperCase() + modalName.slice(1);
      }

      return modalName;
    });
  };

  const [value, setValue] = useState([]);

  const setNewValue = (event) => {
    setFormInput([]);
    setValue([]);
    const formInput = event.currentTarget.value;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formInput;
    const inputElements = tempDiv.querySelectorAll("input, textarea,select");
    setFormInput(inputElements);
  };

  const [storeOutput, setStore] = useState();

  const generateStore = () => {
    let resultString = "function store(Request $request){\n";
    resultString += "\n $input = $request->all();\n\n";
    resultString += " " + modalName + "::store([\n";
    value.forEach((newValue, index) => {
      if (newValue != "") resultString += `   '${newValue}' => $${snakeToCamelCase(newValue)}`;
      if (index < value.length - 1) {
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
    resultString += " " + modalName + "::update([\n";
    value.forEach((newValue, index) => {
      if (newValue != "") resultString += `  '${newValue}' => $${snakeToCamelCase(newValue)}`;
      if (index < value.length - 1) {
        resultString += ",\n";
      }
    });
    resultString += "\n ]);\n\n}\n";
    setUpdate(resultString);
  };

  const [edit, setEdit] = useState();

  const generateEdit = () => {
    let resultString = "function edit($id){\n\n";
    resultString += "  $data = " + modalName + "::find($id)->all();\n\n";
    resultString += "  return view(route('ROUTE_NAME', compact('data)));\n";
    resultString += "}\n";
    setEdit(resultString);
  };

  const [deleteCode, setDelete] = useState();

  const generateDelete = () => {
    let resultString = "function delete($id){\n\n";
    resultString += "  $data = " + modalName + "::find($id)->delete();\n\n";
    resultString += "  return view(route('ROUTE_NAME', compact('data)));\n";
    resultString += "}\n";
    setDelete(resultString);
  };
  const callfunctions = () => {
    if (!formInput.length) {
      setValue([]);
      setStore("");
    }

    formInput.forEach(function (inputTag) {
      let inputName = inputTag.name.length ? inputTag.name.trim() : inputTag.id.trim();
      inputName = inputName.split(" ").join("_");

      if (!value.includes(inputName)) value.push(inputName);
    });

    if (!value.length) {
      alert("😣 aww, There is no input field in your html form !");
      return false;
    }

    generateStore();
    generateUpdate();
    generateEdit();
    generateDelete();
  };

  return (
    <>
      <div className="form">
        <DarkTextField id="modelName" name="modal_name" label="Modal Name" variant="outlined" sx={{ mb: 2 }} onChange={setModal} defaultValue={modalName != "Modal" ? modalName : ""} />
        <textarea name="formInput" id="formInput" onChange={setNewValue} className="form-input" cols={200} placeholder="Type HTML form inputs & simply click on generate"></textarea>
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
