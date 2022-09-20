import Webcam from "react-webcam";
import '../App.css'
const PlayerView = ({userScore,webcamRef ,canvasRef}) => {
  return (
    <div
      className="p-4 col-4 d-flex flex-wrap"
      style={{ boxShadow: "0px 5px 30px lightgray", borderRadius: 30 }}
      >
      <span className="text-secondary col-12">SCORE</span>
      <span className="col-12">{userScore}</span>
      
      <div
        className="frame col-12 d-flex mt-3 "
        style={{
          position: "relative",
          alignItems: "center",
          minHeight: 1,
        }}
      >
        <Webcam
          id="webcam"
          ref={webcamRef}
          className="col-12 "
          style={{
            position: "absolute",
            zindex: 0,
            left: 0,
            height: "100%",
          }}
        ></Webcam>
        <canvas
          ref={canvasRef}
          className="col-12"
          style={{
            position: "relative",
            zindex: 20,
            left: 0,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default PlayerView;