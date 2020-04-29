import React, { useState, useEffect } from "react";

import SelectPokemon from "./components/SelectPokemon";

// get all images of pokemons
import alakazam from "./assets/images/alakazam.png";
import blastoise from "./assets/images/blastoise.png";
import bulbasaur from "./assets/images/bulbasaur.png";
import charizard from "./assets/images/charizard.png";
import flareon from "./assets/images/flareon.png";
import gengar from "./assets/images/gengar.png";
import haunter from "./assets/images/haunter.png";
import pikachu from "./assets/images/pikachu.png";
import vileplume from "./assets/images/vileplume.png";

// array of pokemons to Component Select
const pokemons = [
  "alakazam",
  "blastoise",
  "bulbasaur",
  "charizard",
  "flareon",
  "gengar",
  "haunter",
  "pikachu",
  "vileplume"
];

function App() {
  //define variables
  const [chosen, setChosen] = useState("alakazam");
  const [displayImage, setDisplayImage] = useState(alakazam);
  const [informationPokemon, setInformationPokemon] = useState({});
  const [typePokemon, setTypePokemon] = useState("psychic");
  const [styleType, setStyleType] = useState("psychic");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  //get the all object into the informationPokemon
  useEffect(() => {
    async function fetchPokemon() {
      try {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${chosen}/`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setInformationPokemon({ ...informationPokemon, [chosen]: data });
            setTitle("");
            setText("");
          });
      } catch (err) {
        console.log(err);
      }
    }
    fetchPokemon();
  }, [chosen]);

  

  //get the type of pokemon to display information
  useEffect(() => {
    switch (typePokemon) {
      case "psychic":
        setStyleType("psychic");
        break;
      case "water":
        setStyleType("water");
        break;
      case "poison":
        setStyleType("poison");
        break;
      case "flying":
        setStyleType("flying");
        break;
      case "fire":
        setStyleType("fire");
        break;
      case "electric":
        setStyleType("electric");
        break;
      default:
        console.log("Loading...");
    }
  }, [typePokemon]);

  // get stats
  function getType(feature) {
    switch (feature) {
      case "speed":
        return informationPokemon[chosen]?.stats[0]?.base_stat;
      case "specialDefense":
        return informationPokemon[chosen]?.stats[1]?.base_stat;
      case "specialAttack":
        return informationPokemon[chosen]?.stats[2]?.base_stat;
      case "defense":
        return informationPokemon[chosen]?.stats[3]?.base_stat;
      case "attack":
        return informationPokemon[chosen]?.stats[4]?.base_stat;
      case "hp":
        return informationPokemon[chosen]?.stats[5]?.base_stat;
      case "weight":
        return informationPokemon[chosen]?.weight;
      case "height":
        return informationPokemon[chosen]?.height;
      case "type":
        return informationPokemon[chosen]?.types[
          informationPokemon[chosen]?.types.length - 1
        ]?.type?.name;
      default:
        return;
    }
  }

  // change image by the value selected in option
  useEffect(() => {
    switch (chosen) {
      case "alakazam":
        setDisplayImage(alakazam);
        break;
      case "blastoise":
        setDisplayImage(blastoise);
        break;
      case "bulbasaur":
        setDisplayImage(bulbasaur);
        break;
      case "charizard":
        setDisplayImage(charizard);
        break;
      case "flareon":
        setDisplayImage(flareon);
        break;
      case "gengar":
        setDisplayImage(gengar);
        break;
      case "haunter":
        setDisplayImage(haunter);
        break;
      case "pikachu":
        setDisplayImage(pikachu);
        break;
      case "vileplume":
        setDisplayImage(vileplume);
        break;
      default:
        alert("error");
    }
  }, [chosen]);

  //change the value every time when the information it's different
  useEffect(() => {
    setTypePokemon(informationPokemon[chosen]?.types[0]?.type?.name);
  }, [informationPokemon[chosen]]);

  let habilityHiddenPokemon = informationPokemon[chosen]?.abilities.find(
    element => element.is_hidden
  )?.ability?.name;

  let habilityHiddenPokemonUrl = informationPokemon[chosen]?.abilities.find(
    element => element.is_hidden
  )?.ability.url;

  let hability = informationPokemon[chosen]?.abilities?.find(
    element => !element.is_hidden
  )?.ability?.name;

  let habilityUrl = informationPokemon[chosen]?.abilities?.find(
    element => !element.is_hidden
  )?.ability?.url;

  // here i'm getting information about the hability
  async function fetchInformationHability() {
    try {
      await fetch(habilityUrl)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setText(data.effect_entries[0].effect);
          setTitle(hability);
        });
    } catch (err) {
      setText("");
      setTitle("");
      console.log(err);
    }
  }

  // here i'm getting information about the hability hidden
  async function fetchInformationHabilityHidden() {
    try {
      await fetch(habilityHiddenPokemonUrl)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setText(
            data.effect_changes[0]?.effect_entries[0]?.effect
              ? data.effect_changes[0]?.effect_entries[0]?.effect
              : data.effect_entries[0]?.effect
          );
          setTitle(habilityHiddenPokemon);
        });
    } catch (err) {
      setText("");
      setTitle("");
      console.log(err);
    }
  }

  return (
    <main>
      <div className="container-select">
        <h3>Choose one pokemon</h3>

        <SelectPokemon
          items={pokemons}
          onChange={event => setChosen(event.target.value)}
        />
      </div>
      <div className="container">
        <div className={`display-information ${styleType}`}>
          <img src={displayImage} alt="pokemon" />

          <section>
            <h3>{chosen}</h3>

            <div className="type-pokemon">{typePokemon}</div>

            <article className="info-container">
              <ul>
                <li>
                  <span>HP:</span> <span>{getType("hp")}</span>
                </li>
                <li>
                  <span>ATTACK:</span> <span>{getType("attack")}</span>
                </li>
                <li>
                  <span>DEFENSE:</span> <span>{getType("defense")}</span>
                </li>
                <li>
                  <span>SPECIAL ATTACK:</span>{" "}
                  <span>{getType("specialAttack")}</span>
                </li>
                <li>
                  <span>SPECIAL DEFENSE:</span>{" "}
                  <span>{getType("specialDefense")}</span>
                </li>
                <li>
                  <span>SPEED:</span> <span>{getType("speed")} m/s</span>
                </li>
                <li>
                  <span>HEIGHT:</span> <span>{getType("height")} feets</span>
                </li>
                <li>
                  <span>WEIGHT:</span> <span>{getType("weight")} pounds</span>
                </li>
              </ul>
            </article>

            <div className="hability-information">
              <article onClick={fetchInformationHability}>
                <h4>HABILITY</h4>
                <p>{hability ? hability : "none"}</p>
              </article>

              <article onClick={fetchInformationHabilityHidden}>
                <h4>HIDDEN HABILITY</h4>
                <p>{habilityHiddenPokemon ? habilityHiddenPokemon : "none"}</p>
              </article>
            </div>
          </section>
        </div>

        <div className="container-text">
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
