import React, { useEffect, useState } from "react";
import "./css/App.css";
import FilterButton from "./components/FilterButton";
import ModsContainer from "./components/ModsContainer";
import SortButton from "./components/SortButton";

export default function App() {
  const [allMods, setAllMods] = useState();
  const [modNames, setModNames] = useState();
  const [gameVersions, setGameVersions] = useState();
  const [displayGameVersion, setDisplayGameVersion] = useState();

  useEffect(() => {
    async function mods() {
      try {
        const response = await fetch("https://minecraft-mods-page-default-rtdb.europe-west1.firebasedatabase.app/.json");
        const data = await response.json();

        setModNames(data);
      }
      catch (e) {
        console.error(e);
      }
    }

    mods();
  }, []);

  useEffect(() => {
    if (modNames) {
      async function getModNames() {
        try {
          const regex = /[a-z]/i;
          const newMods = [];

          for (const mod in modNames) {
            const modObj = modNames[mod];

            if (modObj.modrinth) {
              const response = await fetch(`https://api.modrinth.com/v2/project/${mod}`);
              const modData = await response.json();

              modData.game_versions = modData.game_versions.filter(version => !regex.test(version));
              modData.name = mod;
              newMods.push(modData);
              modData.modrinth = true;

              if (mod === "fabric-api") {
                const versions = [...modData.game_versions].reverse();
                setGameVersions(versions);
              }
            }
            else if (modObj.curseforge) {
              console.warn(`${mod} doesn't exist on modrinth. But ${mod} exists on Curseforge.`);
            }
            else {
              console.warn(`${mod} doesn't exist on modrinth or curseforge!`);
            }
          }

          newMods.sort((a, b) => a.title.localeCompare(b.title));
          setAllMods(newMods);
        }
        catch (e) {
          console.error(e);
        }
      }

      getModNames();
    }
  }, [modNames]);

  return (
    <main>
      <div>
        <FilterButton gameVersions={gameVersions} setDisplayGameVersion={setDisplayGameVersion} />
        <SortButton allMods={allMods} setAllMods={setAllMods} />
      </div>
      {allMods ? (
        <ModsContainer allMods={allMods} displayGameVersion={displayGameVersion} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
