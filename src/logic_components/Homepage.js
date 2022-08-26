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
  const [showResults,setShowResults] = useState(false);

  const handleReset = () => {
    setS_length("");
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
    if (text === utext && text.length > 0) {
      setStarttimer(false);
      setComplete(true);
      setShowResults(true);
    }
  },[utext]);

  // useEffect(()=>{
  //   if (complete === true && text.length > 0) 
  //   {
  //     const interval2 = setInterval(() => setShowResults(true), 500);

  //     return () => clearInterval(interval2);
  //   }
  // },[complete])
  //console.log(showResults);
  return (
    <>
      <div className="row justify-content-evenly align-items-center">
        <div className="col col-md-6 col-sm-12 col-xs-12 input-group align-items-center">
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
              min="1"
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
        </div>

        <div className="col col-md-6 col-sm-12 col-xs-12 row justify-content-evenly align-items-center">
          <div className="col-md-3 col-sm-6 input-group">
            <span className="input-group-text">Time</span>
            <span className="input-group-text">
              {Math.floor(timer / 60) < 10
                ? "0" + Math.floor(timer / 60)
                : Math.floor(timer / 60)}
              :{timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}
            </span>
          </div>

          <div className="col-md-3 col-sm-6 input-group">
            <span className="input-group-text">WPM</span>
            <span className="input-group-text">
              {timer > 0 ? (wcount / (timer / 60)).toFixed(2) : 0}
            </span>
          </div>
        </div>
      </div>
      <br></br>
      <div className="row ">
        <div className="center">
          <button
            className="btn btn-outline-secondary btn_custom"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        </div>
      </div>
      <br></br>

      <div>
        <textarea
          className="text_area form-control"
          placeholder="Enter the number of sentences you want to practice typing. Do not use Autocorrect/Autocomplete."
          value={text}
          readOnly={true}
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
          onCopy={(e) => {
            e.preventDefault();
            return false;
          }}
        ></textarea>
      </div>

      <br></br>

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
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
          onCopy={(e) => {
            e.preventDefault();
            return false;
          }}
          spellcheck="false"
          autocorrect="off"
          autocomplete="off"
          autocapitalize="off"
        ></textarea>
      </div>

      <div className={`popupbg ${showResults ? "" : "displaynone"}`}>
        <div className="popupwindow">
          <h2>Your Results</h2>
          <br></br>
          <div>
            <h4>
              Time Taken: {timer > 0 ? (wcount / (timer / 60)).toFixed(2) : 0}
            </h4>
            <h4>Errors: {nerrors}</h4>
            <h4>Total Words: {wcount} </h4>
            <h4>
              Accuracy :
              {timer > 0 ? ((wcount / (wcount + nerrors)) * 100).toFixed(2) : 0}
              %
            </h4>
            <h4>
              Words per minute :
              {timer > 0 ? (wcount / (timer / 60)).toFixed(2) : 0}
            </h4>
            <br></br>
            <button className="btn" onClick={() => setShowResults(false)}>
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}



export default Homepage;