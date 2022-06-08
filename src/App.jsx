import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

const chardChoice = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turn, setTurn] = useState(0);
  const [disabed, setDisabed] = useState(false);

  const shuffleCard = () => {
    const newCards = [...chardChoice, ...chardChoice]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(newCards);
    setTurn(0);
  };

  useEffect(() => {
    shuffleCard();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabed(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleChange = (card, id) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prev) => prev + 1);
    setDisabed(false);
  };

  console.log(choiceOne, choiceTwo);
  console.log(cards);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChange={handleChange}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabed={disabed}
          />
        ))}
      </div>
      <p>Turn : {turn}</p>
    </div>
  );
};

export default App;
