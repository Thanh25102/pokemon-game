interface IResult {
  timer: number;
  onStartAgain: () => void;
}
const ResultScreen = (props: IResult) => {
  return (
    <div className="screen">
      <div className="warp_screen">
        <h2>Congratulations</h2>
        <p>{Math.round(props.timer / 1000)}s</p>
        <button className="button-fancy" onClick={props.onStartAgain}>
          Start Again
        </button>
      </div>
    </div>
  );
};
export default ResultScreen;
