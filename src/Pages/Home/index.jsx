import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const getRandomOffset = () => Math.floor(Math.random() * 100);

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(getRandomOffset());

  const fetchPokemons = (newOffset) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${newOffset}`)
      .then(async (response) => {
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: details.data.sprites.front_default,
              id: details.data.id,
            };
          })
        );

        setPokemons((prev) => {
          const uniquePokemons = [...prev, ...pokemonData].filter(
            (poke, index, self) =>
              index === self.findIndex((p) => p.id === poke.id)
          );
          return uniquePokemons;
        });
      })
      .catch((error) => console.error("Erro ao buscar Pokémon", error));
  };

  useEffect(() => {
    fetchPokemons(offset);
  }, []);

  const loadMorePokemons = () => {
    const newOffset = getRandomOffset();
    setOffset(newOffset);
    fetchPokemons(newOffset);
  };

  return (
    <Main>
      <List>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`} className="link">
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </Link>
          </Card>
        ))}
      </List>
      <Button onClick={loadMorePokemons}>Load more ...</Button>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.bgmain};
  min-height: 84.3vh;
`;
const Card = styled.li`
  width: 150px;
  height: 240px;
  background: ${({ theme }) => theme.bgcard};
  margin: 30px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 10px ${({ theme }) => theme.color};
  border: 2px solid ${({ theme }) => theme.color};
  & img {
    width: 110px;
    margin: 20px;
  }
  & p {
    text-align: center;
    font-size: 20px;
    font-weight: 900;
  }
  & p::first-letter {
    text-transform: uppercase;
  }
  &:hover {
    scale: 1.1;
  }
`;
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-template-rows: repeat(2, 300px);
  justify-content: center;
  @media (max-width: 1050px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
const Button = styled.button`
  margin: 50px;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgbutton};
  border: none;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color};
  &:hover {
    scale: 1.1;
  }
`;
