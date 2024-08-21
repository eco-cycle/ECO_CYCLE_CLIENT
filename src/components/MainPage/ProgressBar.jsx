import React from "react";
import "../../styles/components/MainPage/ProgressBar.scss";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
  }

  return (
    <div className="ProgressBar--Wrapper">
      <div style={fillerStyles}>
      </div>
    </div>
  );
};

export default ProgressBar;
