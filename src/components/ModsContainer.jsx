import ModCard from "./ModCard";

export default function ModsContainer({ mods, displayGameVersion }) {

    function formatDateString(dateString) {
        const date = new Date(dateString);

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    return (
        <div id="mods-container">
            {mods.map(mod => <ModCard key={mod.name} mod={mod} displayGameVersion={displayGameVersion} formatDateString={formatDateString}/>)}
        </div>
    );
}