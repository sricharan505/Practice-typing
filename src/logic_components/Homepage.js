import randomText from "./textGenerator"
import React, { useEffect, useState } from "react";

const Homepage = () => {
  const [s_length, setS_length] = useState('');
  const [text, setText] = useState("");
  const [utext, setUtext] = useState(""); // User typed text
  const [currentpos, setCurrentpos] = useState(0); // Position of user typed text.
  const [errorflag, setErrorflag] = useState(false); // did user type incorrectly?
  const [nerrors, setNerrors] = useState(0); // No of errors user did.
  const [wcount, setWcount] = useState(0); // Word count of user
  const [totwords, setTotwords] = useState(0); // total no of words in the sentence.
  const [starttimer, setStarttimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [complete,setComplete] = useState(false);

  const handleReset = () => {
    setS_length(1);
    setText("");
    setUtext("");
    setCurrentpos(0);
    setErrorflag(false);
    setNerrors(0);
    setWcount(0);
    setComplete(false);
    setTimer(0);
    setStarttimer(false);
  };

  useEffect(() => {
    setTotwords(text !=="" ? text.split(" ").length : 0);
    setUtext("");
    setCurrentpos(0);
    setErrorflag(false);
    setNerrors(0);
    setWcount(0);
    setComplete(false);
    setTimer(0);
    setStarttimer(false);
  }, [text]);

  useEffect(() => {
    if (starttimer === true) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, starttimer]);

  useEffect(()=>{
    //if user has completed typing the sentences.
    if (text === utext) {
      setStarttimer(false);
      setComplete(true);
    }
  },[utext]);

  //console.log(typeof s_length);
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">Number of Sentences</span>
        <div>
          <input
            id="s_length"
            className="form-control"
            type="number"
            value={s_length}
            onChange={(event) => {
              return setS_length(event.target.value);
            }}
          ></input>
        </div>
        <button
          className="btn btn-outline-secondary btn_custom"
          onClick={async () => {
            if (parseInt(s_length) === 0 || isNaN(parseInt(s_length))) {
              return alert("enter a digit greater than 0");
            } else {
              return setText(await randomText(s_length));
            }
          }}
        >
          Let's Go
        </button>
        <button
          className="btn btn-outline-secondary btn_custom"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>

      <br></br>
      {/* {parseInt(s_length) === 0 || s_length.trim().length === 0 ? (
        <p>Enter the number of sentences you want to practice typing.</p>
      ) : (
        <></>
      )} */}

      <div>
        <textarea
          className="text_area form-control"
          placeholder="Enter the number of sentences you want to practice typing"
          value={text}
          readOnly={true}
        ></textarea>
      </div>

      <br></br>
      {/* <p id="randomText">{text}</p> */}
      <br></br>
      <div>
        <textarea
          id="userText"
          className={`text_area form-control ${
            errorflag ? "danger_border danger_border_focus" : ""
          }
          ${
            complete && utext.length > 0
              ? "complete_border complete_border_focus"
              : ""
          } `}
          readOnly={complete || text.length === 0 ? true : false}
          value={utext}
          onChange={(event) => {
            if (text.length !== 0 || complete !== true) {
              if (starttimer !== true) {
                setStarttimer(true);
              }
              if (
                event.target.value.charAt(currentpos) ===
                text.charAt(currentpos)
              ) {
                //console.log(event.target.value.charAt(currentpos) +" " + text.charAt(currentpos) );
                setCurrentpos((i) => i + 1);
                setUtext(event.target.value);
                //setWcount((i) => i + 1);
                setWcount(s_length !== 0 ? utext.split(" ").length : 0);
                setErrorflag(false);
              } else {
                setErrorflag(true);
                setNerrors((i) => i + 1);
              }
            }
          }}
        ></textarea>
      </div>

      <h1>{complete ? "complete" : ""}</h1>
      <h1>
        Timer:- {Math.floor(timer / 60)}:{timer % 60}
      </h1>
      <h1>Error count : {nerrors}</h1>
      <h1>Word count : {wcount}</h1>
      <h1>Total Words : {totwords}</h1>
      <h1>
        Accuracy :{" "}
        {timer > 0 ? ((wcount / (wcount + nerrors)) * 100).toFixed(2) : 0}
      </h1>
      <h1>
        words per minute : {timer > 0 ? (wcount / (timer / 60)).toFixed(2) : 0}
      </h1>
    </>
  );
}



export default Homepage;