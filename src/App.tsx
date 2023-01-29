import { useState } from 'react';
import './App.css';
import CopyRight from './components/common/CopyRight';
import InteractScreen from './components/InteractScreen';
import MainScreen from './components/MainScreen';
import ResultScreen from './components/ResultScreen';
import { Pokemon } from './type/Pokemon';
import { DataPokemon } from './data/DataPokemon';
import { shuffled } from './utils/shuffled';

interface Settings {
  totalPokemon: number;
  pokemons: Pokemon[];
  started: number;
}

function App() {
  const [settings, setSettings] = useState<Settings>({
    totalPokemon: 16,
    pokemons: [],
    started: 0,
  });
  const [status, setStatus] = useState('default');
  const [timer, setTimer] = useState(0);

  const onStartAgain = () => {
    setStatus('default');
  };
  const handleMatch = (num: number) => {
    const pokemons1 = DataPokemon.slice(0, num);
    const pokemons2 = [...pokemons1];
    const results = shuffled(shuffled(shuffled([...pokemons1, ...pokemons2])));

    const settings = {
      totalPokemon: num,
      pokemons: results,
      started: new Date().getTime(),
    };
    setStatus('game');
    setSettings(settings);
  };

  const onFinish = () => {
    setTimer(new Date().getTime() - settings.started);
    setStatus('result');
  };

  return (
    <div className="App">
      {status === 'default' && <MainScreen handleMatch={handleMatch} />}
      {status === 'game' && (
        <InteractScreen
          pokemons={settings.pokemons}
          started={settings.started}
          onFinish={onFinish}
        />
      )}
      {status === 'result' && (
        <ResultScreen onStartAgain={onStartAgain} timer={timer} />
      )}
      <CopyRight />
    </div>
  );
}

export default App;
