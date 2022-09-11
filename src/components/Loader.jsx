import React from "react";
import LoaderGif from "../assets/loader.gif";

function Loader() {
  return (
    <div className="loader">
      <div className="loaderDisplay">
        <img src={LoaderGif} className="loaderImage" alt="loader" />
      </div>
    </div>
  );
}

export default Loader;
