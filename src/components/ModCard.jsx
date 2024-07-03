export default function ModCard({ mod, displayGameVersion, formatDateString }) {
    const modGameVersion = mod.game_versions;
    if (!(displayGameVersion ? modGameVersion.includes(displayGameVersion) : true)) return;
    const latestVersion = modGameVersion[modGameVersion.length - 1];
    const classes = `mod-source-url ${mod.modrinth ? "modrinth-url" : "curseforge-url"}`;

    return (
        <div key={mod.name} className="mod-div">
            <span>{mod.title} latest verson: {latestVersion}</span>
            <span>Updated at: <time>{formatDateString(mod.updated)}</time></span>
            <a href={`https://modrinth.com/mod/${mod.name}`} target="_blank" rel="noreferrer" className={classes}>Download page </a>
            {mod.source_url ? <a href={mod.source_url} target="_blank" rel="noreferrer" className={classes}>Source url</a> : <span>No source url</span>}
            <span>{mod.description}</span>
        </div>
    );
}