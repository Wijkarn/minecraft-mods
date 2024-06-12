export default function ModCard({ mod, modObj, displayGameVersion }) {
    const modGameVersion = modObj.game_versions;
    const displayMod = displayGameVersion ? modGameVersion.includes(displayGameVersion) : true;
    const latestVersion = mod !== "fabric-api" ? modGameVersion[modGameVersion.length - 1] : modGameVersion[0];

    return displayMod ? (
        <div key={mod} className="mod-div">
            <span>{modObj.title} latest verson: {latestVersion}</span>
            <a href={`https://modrinth.com/mod/${mod}`} target="_blank" rel="noreferrer" className="mod-source-url">Download page </a>
            {modObj.source_url ? <a href={modObj.source_url} target="_blank" rel="noreferrer" className="mod-source-url">Source url</a> : <span>No source url</span>}
            <span>{modObj.description}</span>
        </div>
    )
        : "";
}