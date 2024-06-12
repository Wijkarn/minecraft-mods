import ModCard from "./ModCard";

export default function ModsContainer({ allMods, displayGameVersion }) {
    return Object.keys(allMods).map(mod => <ModCard key={mod} mod={mod} modObj={allMods[mod]} displayGameVersion={displayGameVersion} />);
}