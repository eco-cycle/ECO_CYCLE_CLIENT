import React from "react";
import "../../styles/components/MainPage/ProgressBar.scss";

const ProgressBar = (props) => {
  const { bgcolor, completed, currentLevel, nextLevel } = props;

  return (
    <div className="ProgressBar--Container">
      <div className="ProgressBar--Circle">
        <svg className="ProgressBar--Svg">
          <circle className="ProgressBar--Bg" cx="50%" cy="50%" r="45%"></circle>
          <circle
            className="ProgressBar--Fg"
            cx="50%"
            cy="50%"
            r="45%"
            style={{
              strokeDasharray: `${Math.PI * 2 * 45}%`,
              strokeDashoffset: `${Math.PI * 2 * 45 * (1 - completed / 100)}%`,
              stroke: bgcolor,
            }}
          ></circle>
        </svg>
        <div className="ProgressBar--Text">
          <div className="ProgressBar--Label">진행도</div>
          <div>{completed}%</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
