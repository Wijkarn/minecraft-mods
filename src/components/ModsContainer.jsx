import ModCard from "./ModCard";

export default function ModsContainer({ mods, displayGameVersion }) {
    return (
        <div id="mods-container">
            {mods.map(mod => <ModCard key={mod.name} mod={mod} displayGameVersion={displayGameVersion} />)}
        </div>
    );
}