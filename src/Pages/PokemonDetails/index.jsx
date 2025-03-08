import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(async (response) => {
        const data = response.data;

        const abilitiesData = await Promise.all(
          data.abilities.map(async (a) => {
            const abilityDetails = await axios.get(a.ability.url);
            const descriptionEntry = abilityDetails.data.effect_entries.find(
              (entry) => entry.language.name === "en"
            );
            return {
              name: a.ability.name,
              description: descriptionEntry
                ? descriptionEntry.effect
                : "Descrição não disponível",
            };
          })
        );

        setPokemon(data);
        setAbilities(abilitiesData);
      })
      .catch((error) =>
        console.error("Erro ao buscar detalhes do Pokémon", error)
      );
  }, [id]);

  if (!pokemon) return <p>Carregando...</p>;

  return (
    <Main>
      <Card>
        <NameType>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>Type:</h3>
          <br />
          <ul>
            {pokemon.types.map((t) => (
              <li key={t.type.name}>{t.type.name}</li>
            ))}
          </ul>
        </NameType>
        <Description>
          <h3>Abilities:</h3>
          <br />
          <ul>
            {abilities.map((a) => (
              <>
                <li key={a.name}>
                  <strong>{a.name}:</strong> {a.description}
                </li>
                <br />
              </>
            ))}
          </ul>
          <h3>Moves:</h3>
          <br />
          <ul>
            {pokemon.moves.slice(0, 3).map((m) => (
              <li key={m.move.name}>{m.move.name}</li>
            ))}
          </ul>
        </Description>
      </Card>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.bgmain};
  min-height: 84.3vh;
  padding-top: 30px;
  @media (max-width: 710px) {
    padding-top: 320px;
  }
`;
const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  width: 800px;
  min-height: 540px;
  background: ${({ theme }) => theme.bgcard};
  border-radius: 10px;
  box-shadow: 0 0 10px ${({ theme }) => theme.color};
  padding: 30px;
  gap: 50px;
  border: 2px solid ${({ theme }) => theme.color};
  & img {
    width: 180px;
    margin: 20px;
  }
  & p {
    text-align: center;
    font-size: 20px;
    font-weight: 900;
  }
  & li::first-letter,
  h1::first-letter {
    text-transform: uppercase;
  }
  @media (max-width: 830px) {
    width: 95%;
    flex-direction: column;
  }
`;
const NameType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  margin: 50px;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgmain};
  border: none;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color};
  &:hover {
    scale: 1.1;
  }
`;
