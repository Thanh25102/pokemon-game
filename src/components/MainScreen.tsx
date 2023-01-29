interface IMain {
  handleMatch(num: number): void;
}

const MainScreen = (main: IMain) => {
  const { handleMatch } = main;
  return (
    <div className="screen">
      <h1>Pokemon's Thanh Game With React TypeScript</h1>
      <h3>Select mode to start game</h3>
      <div className="action">
        <button className="button-fancy small" onClick={() => handleMatch(8)}>
          <span>4x4</span>
          <span>Easy</span>
        </button>
        <button className="button-fancy small" onClick={() => handleMatch(18)}>
          <span>6x6</span>
          <span>Normal</span>
        </button>
        <button className="button-fancy small" onClick={() => handleMatch(32)}>
          <span>8x8</span>
          <span>Hard</span>
        </button>
        <button className="button-fancy small" onClick={() => handleMatch(50)}>
          <span>10x10</span>
          <span>Super Hard</span>
        </button>
      </div>
    </div>
  );
};
export default MainScreen;
