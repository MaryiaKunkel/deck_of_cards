import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";

const Deck = () => {
  const [deckId, setDeckId] = useState(null);
  const [cardImages, setCardImages] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function findDeckId() {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/new/draw/?count=1`
      );
      const deckId = res.data.deck_id;
      setDeckId(deckId);
    }
    findDeckId();
  }, []);

  async function newCard() {
    if (!deckId) return;
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    setCardImages((imagesArr) => [...imagesArr, res.data.cards[0].image]);
  }

  async function shuffle() {
    if (!deckId) return;
    setIsShuffling(true);
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
    );
    setCardImages([]);
    setIsShuffling(true);
  }

  return (
    <div>
      <button onClick={newCard}>New card</button>
      <button onClick={shuffle}>Shuffle</button>
      <Cards images={cardImages} />
    </div>
  );
};
export default Deck;
