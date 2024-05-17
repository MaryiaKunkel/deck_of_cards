import React, { useState, useEffect } from "react";
import axios from "axios";

const Cards = ({ images }) => {
  return (
    <div>
      {images.length === 0
        ? null
        : images.map((image, index) => (
            <img key={index} src={image} alt="card" />
          ))}
    </div>
  );
};
export default Cards;
