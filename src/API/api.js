import axios from "axios";
// axios is a promise based HTTP client for the browser and node.js
import React, { useEffect, useState } from 'react';
// UseEffect to get data from api

// creating a function Pokemonlist which will be a component
// usestate function is used to update the state of the component once function is called
// array is empty then we will get the data from api
const Pokemonlist = () => {
    const [pokemon, setPokemon] = useState([]);

useEffect (() => {
    axios.get('localhost:3000/pokemon')
    .then(response => setPokemon(response.results))
    .catch(error => console.log(error));
},[]);

return (
    <div>
        <h1>Pokemon Entries</h1>
        <ul>
            {pokemon.map(p => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    </div>
);
            };
export default Pokemonlist;


