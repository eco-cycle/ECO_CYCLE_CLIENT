import React from "react";
import "../../styles/components/MainPage/Transaction.scss";

const Transaction = (props) => {
  const { bgcolor, completed} = props;

  return (
    <div className="Transaction--Container">
      <div className="Transaction--Circle">
        <svg className="Transaction--Svg">
          <circle className="Transaction--Bg" cx="50%" cy="50%" r="45%"></circle>
          <circle
            className="Transaction--Fg"
            cx="50%"
            cy="50%"
            r="45%"
            style={{
              strokeDasharray: `${Math.PI * 2 * 45}회`,
              strokeDashoffset: `${Math.PI * 2 * 45 * (1 - completed / 100)}회`,
              stroke: bgcolor,
            }}
          ></circle>
        </svg>
        <div className="Transaction--Text">
          <div className="Transaction--Label">거래횟수</div>
          <div>{completed}회</div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
