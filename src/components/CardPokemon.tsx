import classes from '../public/css/CardPokemon.module.css';
import React, { useImperativeHandle, useState } from 'react';
import { Pokemon } from '../type/Pokemon';
interface Card {
  pokemon: Pokemon;
  index: number;
  total: number;
  checkRules(id: number, index: number): boolean;
}
interface ChildRef {
  toggle: () => void;
  disabledMode: () => void;
}

const CardPokemon = React.forwardRef<ChildRef, Card>((cardPokemon, ref) => {
  const { pokemon, checkRules, index, total } = cardPokemon;
  const [isBack, setBack] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const toggle = () => {
    if (disabled) return;
    setBack(!isBack);
    checkRules(pokemon.id, index);
  };
  const disabledMode = () => {
    setDisabled(true);
  };

  useImperativeHandle(ref, () => ({
    toggle,
    disabledMode,
  }));
  console.log(Math.sqrt(total));
  return (
    <div
      className={`${classes.card} `}
      style={{
        height: `${(750 - 16 * 4) / Math.sqrt(total) - 16}px`,
        width: `${(((750 - 16 * 4) / Math.sqrt(total) - 16) * 3) / 4}px`,
        perspective: `${
          ((((750 - 16 * 4) / Math.sqrt(total) - 16) * 3) / 4) * 2
        }px`,
      }}
    >
      <div
        className={`${classes.card__inner} ${isBack && classes['is-flipped']} ${
          disabled && classes.disabled
        }`}
        onClick={toggle}
      >
        <div
          className={`${classes.card__face} ${classes['card__face--front']}`}
        >
          <div
            className={classes.card__content}
            style={{
              backgroundImage: `url(${require('../public/images/' +
                pokemon.image)}`,
              backgroundPositionX: 'center',
              backgroundPositionY: 'center',
            }}
          ></div>
        </div>
        <div className={`${classes.card__face} ${classes['card__face--back']}`}>
          <div
            className={classes.card__content}
            style={{
              backgroundSize: `${
                (((750 - 16 * 4) / Math.sqrt(total) - 16) * 3) / 4 / 3
              }px ${(((750 - 16 * 4) / Math.sqrt(total) - 16) * 3) / 4 / 3}px`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
});
export default CardPokemon;
