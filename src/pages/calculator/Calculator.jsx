import React, { useState } from "react";
import MenuButton from "../../components/menuButton/MenuButton";
import "./calculator.scss";

function Calculator() {
  const [result, setResult] = useState("");

  const handleClick = (event) => {
    setResult(result.concat(event.target.name));
  };

  const calculate = () => {
    setResult(eval(result));
  };

  const clearAll = () => {
    setResult("");
  };

  const deletePrevious = () => {
    setResult(result.slice(0, -1));
  };

  return (
    <div className="calculator-page">
      <MenuButton/>
      <div className="calculator-wrapper">
        <div className="calculator-container">
          <div className="display">
            <h1>{result}</h1>
          </div>
          <button onClick={clearAll} className="span-two alt-color" id="clear">
            AC
          </button>
          <button onClick={deletePrevious} className="alt-color" id="delete">
            DEL
          </button>
          <button onClick={handleClick} className="alt-color-2" name="+" id="">
            &#43;
          </button>
          <button onClick={handleClick} name="7">
            7
          </button>
          <button onClick={handleClick} name="8">
            8
          </button>
          <button onClick={handleClick} name="9">
            9
          </button>
          <button onClick={handleClick} className="alt-color-2" name="*" id="">
            &times;
          </button>
          <button onClick={handleClick} name="4">
            4
          </button>
          <button onClick={handleClick} name="5">
            5
          </button>
          <button onClick={handleClick} name="6">
            6
          </button>
          <button onClick={handleClick} className="alt-color-2" name="-">
            &minus;
          </button>
          <button onClick={handleClick} name="1">
            1
          </button>
          <button onClick={handleClick} name="2">
            2
          </button>
          <button onClick={handleClick} name="3">
            3
          </button>
          <button onClick={handleClick} className="alt-color-2" name="/">
            &divide;
          </button>
          <button onClick={handleClick} className="alt-color-2" name="0">
            0
          </button>
          <button
            onClick={handleClick}
            className="alt-color-2"
            name="."
            id="decimal"
          >
            .
          </button>
          <button
            onClick={calculate}
            className="span-two alt-color"
            name="="
            id="equals"
          >
            &#61;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
