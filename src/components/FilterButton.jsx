export default function FilterButton({ gameVersions, setDisplayGameVersion }) {
    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const formFiltered = formJson.filter;

        if (formFiltered === "All") {
            setDisplayGameVersion(null);
            return;
        }

        setDisplayGameVersion(formFiltered);
    }

    return (
        <form onSubmit={handleSubmit} className="sort-filter-form">
            <select name="filter">
                <option >All</option>
                {gameVersions ? gameVersions.map(version => <option key={version}>{version}</option>) : ""}
            </select>
            <button className="sort-filter-button">Filter</button>
        </form>
    );
}