import React, { useEffect, useRef, useState } from "react";
// import logo from './logo.svg';
import "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import './App.css'
import { drawHand, predictPose } from "./utilities";
import PlayerView from "./components/PlayerView";
import InteractionBox from "./components/InteractionBox";
var hand;
var arr = ["rock", "paper", "scissor"];
const webcamRef = React.createRef(null);
const canvasRef = React.createRef(null)

const App = () => {
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [draw, setDraw] = useState(0);
  const [stateNo, setStateNo] = useState(0);
  const [boolValue, setBoolValue] = useState(true);
  const [computer, setComputer] = useState("rock");
  const [logArr, setLogArr] = useState([]);
  const [modelLoded, setModelLoded] = useState(false);
  const [round, setRound] = useState(0);
  const [you, setYou] = useState("");

  const runHandpose = async () => {
    console.log("started to load model")
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    setInterval(() => {
      detectHandPose(net);
    }, 100);
    setModelLoded(true);
  };

  useEffect(() => {
    runHandpose();
  }, []);
  useEffect(()=>{
    if (!boolValue) {
      var r = check(you, computer);
      var array2 = logArr;
      if (r == -1) {
        array2[logArr.length] = [you, "draw", computer];
        setDraw(draw + 1);
        setStateNo(9);
        setLogArr([...array2]);
      } else if (r == 0) {
        array2[logArr.length] = [you, "lose", computer];
        setBotScore(botScore + 1);
        setStateNo(8);
        setLogArr([...array2]);
      } else if (r == 1) {
        array2[logArr.length] = [you, "won", computer];
        setUserScore(userScore + 1);
        setStateNo(7);
        setLogArr([...array2]);
      }
    }
  },[round])
  return (
    <div className="App text-center ">
      <div style={{ boxShadow: "0px -10px 50px  lightgray" }}>
        <header className="App-eader d-flex ">
          <div className=" p-4 col-4 d-block mx-auto text-center">
            ROUND {round}
          </div>
        </header>
      </div>
      <div className=" col-sm-11 col-md-10 mt-5 pb-5 col-lg-9 d-flex mx-auto  flex-wrap justify-content-around">
        <div className="justify-content-between row  col-12">
          <PlayerView userScore={userScore} webcamRef={webcamRef} canvasRef={canvasRef} />
          <InteractionBox boolValue={boolValue} setStateNo={setStateNo} setBoolValue={setBoolValue}  hand={hand} setYou={setYou} logArr={logArr} game={game} draw={draw}modelLoded={modelLoded}  stateNo={stateNo}    />
          <div
            className="p-4 col-4 d-flex justify-center flex-column "
            style={{ boxShadow: "0px 5px 30px lightgray", borderRadius: 30 }}
          >
            <span className="text-secondary col-12">SCORE</span>
            <span className="col-12">{botScore}</span>
            <img
              src={require("../images/" +
                Number(arr.indexOf(computer) * 2 + 1) +
                ".png")} 
            />
            <div className="mt-5">{computer.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </div>
  );

  function game(you) {
    setComputer(com());
    setRound(round+1)
  }
  function com() {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function check(you, computer) {
    if (you == computer) return -1;
    if( (arr.indexOf(you)+1)%3 === arr.indexOf(computer)) return 0;
    else return 1;
  }

  
};

const detectHandPose = async (net) => {
  // Check data is available
  if (
    typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    // Get Video Properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    
    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;
    
    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    
    // Make Detections
    hand = await net.estimateHands(video);
    
    // Draw mesh
    const ctx = canvasRef.current.getContext("2d");
    drawHand(hand, ctx);
    predictPose(hand, ctx);
  }
};

export default App;

