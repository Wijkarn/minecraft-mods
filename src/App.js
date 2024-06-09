import React, { useEffect, useState } from "react";
import "./css/App.css";

export default function App() {
  const [data, setData] = useState();
  const [mods, setMods] = useState();

  useEffect(() => {
    async function mods() {
      try {
        const response = await fetch("https://minecraft-mods-page-default-rtdb.europe-west1.firebasedatabase.app/.json");
        const data = await response.json();
        setMods(data);
      }
      catch (e) {
        console.error(e);
      }
    }
    mods();
  }, []);

  useEffect(() => {
    if (mods) {
      async function getData() {
        try {
          const regex = /[a-z]/i;
          const newMods = {};
          for (const mod in mods) {
            if (mods[mod].modrinth) {
              const response = await fetch(`https://api.modrinth.com/v2/project/${mod}`);
              const modData = await response.json();
              modData.game_versions = modData.game_versions.filter(item => !regex.test(item));
              newMods[mod] = modData;
            }
            else if (mods[mod].curseforge) {
              console.log(`${mod} doesn't exist on modrinth. But ${mod} exists on Curseforge.`);
            }
            else {
              console.log(`${mod} doesn't exist on modrinth or curseforge`);
            }
          }
          setData(newMods);
        }
        catch (e) {
          console.error(e);
        }
      }
      getData();
    }
  }, [mods]);

  return (
    <div id="mods-div">
      {data ? (
        Object.keys(data).map(mod => {
          const modObj = data[mod];
          return (
            <div key={mod} className="mod-div">
              <span>{modObj.title} latest verson: {modObj.game_versions[modObj.game_versions.length - 1]}</span>
              <a href={`https://modrinth.com/mod/${mod}`} target="_blank" rel="noreferrer" className="mod-source-url">Download page </a>
              {modObj.source_url ? <a href={modObj.source_url} target="_blank" rel="noreferrer" className="mod-source-url">Source url</a> : <span>No source url</span>}
            </div>
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
