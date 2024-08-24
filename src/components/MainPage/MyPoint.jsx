import React from "react";
import "../../styles/components/MainPage/MyPoint.scss";

const MyPoint = (props) => {
  const { bgcolor, completed} = props;

  const formatNumber = (num) => {
    return num.toLocaleString();
};
  return (
    <div className="MyPoint--Container">
      <div className="MyPoint--Circle">
        <svg className="MyPoint--Svg">
          <circle className="MyPoint--Bg" cx="50%" cy="50%" r="45%"></circle>
          <circle
            className="MyPoint--Fg"
            cx="50%"
            cy="50%"
            r="45%"
            style={{
              strokeDasharray: `${Math.PI * 2 * 45}%`,
              strokeDashoffset: `${Math.PI * 2 * 45 * (1 - completed / 100)} P`,
              stroke: bgcolor,
            }}
          ></circle>
        </svg>
        <div className="MyPoint--Text">
          <div className="MyPoint--Label">내 포인트</div>
          <div>{formatNumber(completed)}P</div>
        </div>
      </div>
    </div>
  );
};

export default MyPoint;
