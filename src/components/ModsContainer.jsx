import ModCard from "./ModCard";

export default function ModsContainer({ allMods, displayGameVersion }) {
    return (
        <div id="mods-container">
            {allMods.map(mod => <ModCard key={mod.name} mod={mod} displayGameVersion={displayGameVersion} />)}
        </div>
    );
}