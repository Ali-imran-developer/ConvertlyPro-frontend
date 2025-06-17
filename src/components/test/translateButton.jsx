import React from "react";

const TranslateButton = ({ onClick, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="btn btn-primary"
  >
    {isLoading ? "Translating..." : "Translate"}
  </button>
);

export default TranslateButton;