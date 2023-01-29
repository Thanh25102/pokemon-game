import CardPokemon from './CardPokemon';
import { Pokemon } from '../type/Pokemon';
import { useRef } from 'react';

interface IInteract {
  pokemons: Pokemon[];
  started: number;
  onFinish: () => void;
}

const InteractScreen = (props: IInteract) => {
  const { pokemons, started, onFinish } = props;
  let disabledElement = 0;
  const rules = useRef<{ id: number; index: number }[]>([]);
  const childRefs = useRef<
    Array<{ toggle: () => void; disabledMode: () => void } | null>
  >([]);

  const checkRules = (id: number, index: number): boolean => {
    if (rules.current.length === 2) return false;

    rules.current = [...rules.current, { id, index }];

    if (
      rules.current.length === 2 &&
      rules.current[0].id === rules.current[1].id
    ) {
      childRefs.current[rules.current[0].index]?.disabledMode();
      childRefs.current[rules.current[1].index]?.disabledMode();
      rules.current = [];
      disabledElement++;
      if (disabledElement === pokemons.length / 2) onFinish();
      return true;
    } else if (
      rules.current.length === 2 &&
      rules.current[0].id !== rules.current[1].id
    ) {
      setTimeout(() => {
        childRefs.current[rules.current[0].index]?.toggle();
        childRefs.current[rules.current[1].index]?.toggle();
        rules.current = [];
      }, 800);
      return false;
    }
    return false;
  };

  return (
    <div className="screen">
      <div className="screen__warp">
        <div
          className="screen__inner"
          style={{
            width: `${
              ((((750 - 16 * 4) / Math.sqrt(pokemons.length) - 16) * 3) / 4 +
                16) *
              Math.sqrt(pokemons.length)
            }px`,
          }}
        >
          {pokemons.map((pokemon, index) => (
            <CardPokemon
              ref={(el) => {
                childRefs.current[index] = el;
              }}
              index={index}
              checkRules={checkRules}
              pokemon={pokemon}
              key={index}
              total={pokemons.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default InteractScreen;
