import React, { useEffect, useState } from "react";
import "./css/App.css";
import FilterButton from "./components/FilterButton";
import ModsContainer from "./components/ModsContainer";

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
          const newMods = {};
          for (const mod in modNames) {
            const modObj = modNames[mod];
            if (modObj.modrinth) {
              const response = await fetch(`https://api.modrinth.com/v2/project/${mod}`);
              const modData = await response.json();
              modData.game_versions = modData.game_versions.filter(version => !regex.test(version));
              newMods[mod] = modData;
              if (mod === "fabric-api") {
                setGameVersions(modData.game_versions.reverse());
              }
            }
            else if (modObj.curseforge) {
              console.log(`${mod} doesn't exist on modrinth. But ${mod} exists on Curseforge.`);
            }
            else {
              console.log(`${mod} doesn't exist on modrinth or curseforge`);
            }
          }
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
      <FilterButton gameVersions={gameVersions} setDisplayGameVersion={setDisplayGameVersion} />
      <div id="mods-div">
        {allMods ? (
          <ModsContainer allMods={allMods} displayGameVersion={displayGameVersion} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
