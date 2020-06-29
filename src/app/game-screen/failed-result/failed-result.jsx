import React from "react";

import Result from "@components/result";


const FailedResult = () => {
  return <Result>
    <h2 className="result__title">Какая жалость!</h2>
    <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
    <button className="replay" type="button">Попробовать ещё раз</button>
  </Result>;
};

export default FailedResult;
