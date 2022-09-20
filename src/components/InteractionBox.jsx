import { useEffect } from "react";
import "../App"
import { det } from "../utilities";
var arr = ["rock", "paper", "scissor"];
var asciiArr = ["fa-hand-back-fist", "fa-hand", "fa-hand-scissors"];
const InteractionBox = ({stateNo,setStateNo,setBoolValue,setYou,game,hand,boolValue,logArr,draw ,modelLoded }) => {
      async function onstart() {
        if (modelLoded) {
            console.log(boolValue)
          setBoolValue(!boolValue);
          console.log(boolValue);
          setStateNo(1)
        }
      }
      function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      function stop() {
        setBoolValue(true);
        setStateNo(0);
      }
      function listLog(logArr) {
        console.log(logArr)
        if (logArr.length ==0) {
            return (<></>)
        }

        return (
          <div className="overflow-auto " style={{overflowY:"auto"}} >
            {logArr.map((item, k) => {
              var ky = k + 1;
              var str;
              if (item[1]==="won") {
                str = " text-success"
              }
              else if (item[1] ==="draw") {
                str = "text-secondary"
              }
              else {
                str = "text-danger"
              }
              return (
                <span className="h4  "
                  key={ky}
                >
                  <div
                    className={`txt-scroll  my-2 border- p-2`}
                  ><span className="font-lg">{k+1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <i className={`text-secondary font-md fa-solid ` + asciiArr[arr.indexOf(item[0])]}></i>
                    &nbsp;&nbsp;&nbsp;&nbsp; <span className={str} >{item[1]}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                    <i className={`text-secondary fa-solid ` + asciiArr[arr.indexOf(item[2])]}></i>
                  </div>
                </span>
              );
            })}
          </div>
        );
      }
    useEffect(() => {
        const  fun2 = async () => {
            if (stateNo>0 && stateNo  <6 && !boolValue) {
                await delay(1000);
                setStateNo(stateNo+1);
                console.log( stateNo)
                return;
            }
            else if (stateNo ==6 && !boolValue) {
                await delay(1000);
                const result = det(hand);
                setYou( result);
                console.log(result);
                if (result == "stop" || boolValue) {
                    console.log("stoped");
                    stop();
                } else {
                    game(result);
                }
            }
            else if (stateNo >5 && stateNo < 10 && !boolValue) {
                await delay(2000);
                setStateNo(1);
            }
            
        }
        fun2()
    }, [stateNo,boolValue]);
    
    return (
        <div className="p-4 col-3 d-flex flex-column justify-center flex-wrap">
            <span className="text-secondary col-12">Draw</span>
            <span className="col-12">{draw}</span>
            <span className="d-block my-md-2 " style={{ fontSize: 20 }}>
              {boolValue?"": statusMessage(stateNo)}
            </span>
            {logArr.length ===0 ? <></> :<span className="log " style={{overflow:"auto",height:220,scrollbarWidth:0,background:"rgb(230,230,230)",borderRadius:20 }} >{listLog(logArr)}</span>}
            <button
              name="formBtn"
              id="playbtn"
              className={
                !boolValue ? "d-none" : (" mt-auto mb-5 btn  px-sm-2 px-lg-4 "+(modelLoded?"btn-success":"btn-secondary"))
              }
              onClick={onstart}
            >
              {modelLoded?"Play":"Loading..."}
            </button>
            <button
              name="formBtn"
              id="playbtn"
              className={
                boolValue ? "d-none" : " mt-auto mb-5 btn btn-danger px-sm-2 px-lg-4"
              }
              onClick={stop}
            >
              Stop
            </button>
          </div>
    )
}

const  statusMessage = (key) => {
    switch (key) {
    case 0:
        return <div className="msg no"></div>;
    case 1:
        return <div className="msg no">5</div>;
    case 2:
        return <div className="msg no">4</div>;
    case 3:
        return <div className="msg no">3</div>;
    case 4:
        return <div className="msg no">2</div>;
    case 5:
        return <div className="msg no">1</div>;
    case 6:
        return <div className="msg fail">Show Your Hand</div>;
    case 7:
        return <div className="msg suc">You Won</div>;
    case 8:
        return <div className="msg fail">You Loose</div>;
    case 9:
        return <div className="msg draw">Draw</div>;
    default:
        break;
    }
  }
export default InteractionBox ;