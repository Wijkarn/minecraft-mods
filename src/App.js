import React, { useEffect, useState } from "react";
import "./css/App.css";
import FilterButton from "./components/FilterButton";
import ModsContainer from "./components/ModsContainer";
import SortButton from "./components/SortButton";

export default function App() {
  const [modList, setModList] = useState();
  const [mods, setMods] = useState();
  const [gameVersions, setGameVersions] = useState();
  const [displayGameVersion, setDisplayGameVersion] = useState();

  useEffect(() => {
    async function getModNames() {
      try {
        const response = await fetch("https://minecraft-mods-page-default-rtdb.europe-west1.firebasedatabase.app/.json");
        const data = await response.json();

        setModList(data);
      }
      catch (e) {
        console.error(e);
      }
    }

    getModNames();
  }, []);

  useEffect(() => {
    async function getMods() {
      try {
        const newModsArray = [];

        fetchMod("fabric-api", newModsArray);

        for (const mod in modList) {
          const modObj = modList[mod];

          if (modObj.modrinth) {
            await fetchMod(mod, newModsArray);
          }
          else if (modObj.curseforge) {
            console.warn(`${mod} doesn't exist on modrinth. But ${mod} exists on Curseforge.`);
          }
          else {
            console.warn(`${mod} doesn't exist on modrinth or curseforge!`);
          }
        }

        newModsArray.sort((a, b) => a.title.localeCompare(b.title));
        setMods(newModsArray);
      }
      catch (e) {
        console.error(e);
      }
    }
    if (modList) {
      getMods();
    }
  }, [modList]);

  async function fetchMod(mod, newModsArray) {
    const regex = /[a-z]/i;

    const response = await fetch(`https://api.modrinth.com/v2/project/${mod}`);
    const modData = await response.json();

    modData.game_versions = modData.game_versions.filter(version => !regex.test(version));
    modData.name = mod;
    newModsArray.push(modData);
    modData.modrinth = true;

    if (mod === "fabric-api") {
      const versions = [...modData.game_versions].reverse();
      setGameVersions(versions);
    }
  }

  return (
    <main>
      <div>
        <FilterButton gameVersions={gameVersions} setDisplayGameVersion={setDisplayGameVersion} />
        <SortButton mods={mods} setMods={setMods} />
      </div>
      {mods ? (
        <ModsContainer mods={mods} displayGameVersion={displayGameVersion} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
