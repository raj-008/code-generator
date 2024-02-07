import React, { useContext } from "react";
import "./content.css";

const Content = (props) => {
  const copyToClipboard = (data, id) => {
    navigator.clipboard.writeText(data);
    alert("Copied to Clipborad !");
  };

  if (props.store) {
    return (
      <>
        <div className="content">
          <div className="copy-btn">
            <button onClick={() => copyToClipboard(props.store)}>Copy</button>
          </div>
          <pre>{props.store}</pre>
        </div>

        <div className="content">
          <div className="copy-btn">
            <button onClick={() => copyToClipboard(props.edit)}>Copy</button>
          </div>
          <pre>{props.edit}</pre>
        </div>

        <div className="content">
          <div className="copy-btn">
            <button onClick={() => copyToClipboard(props.update)}>Copy</button>
          </div>
          <pre>{props.update}</pre>
        </div>

        <div className="content">
          <div className="copy-btn">
            <button onClick={() => copyToClipboard(props.delete)}>Copy</button>
          </div>
          <pre>{props.delete}</pre>
        </div>
      </>
    );
  }

  return null;
};

export default Content;
