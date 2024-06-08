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
    async function getData() {
      try {
        const newMods = {};
        for (const mod of mods) {
          const response = await fetch(`https://api.modrinth.com/v2/project/${mod}`);
          const data = await response.json();
          newMods[mod] = data;
        }
        setData(newMods);
      }
      catch (e) {
        console.error(e);
      }
    }
    getData();
  }, [mods]);

  return (
    <div>

      {data ? (
        Object.keys(data).map(mod => {
          const modObj = data[mod];
          return (
            <div key={mod} className="mod-div">
              <span>{modObj.title} latest verson: {modObj.game_versions[modObj.game_versions.length - 1]}</span>
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
