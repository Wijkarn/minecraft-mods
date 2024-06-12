export default function SortButton({ allMods, setAllMods }) {

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const formSorted = formJson.sort;

        let sortedMods = [...allMods];

        if (formSorted.includes("desc")) {
            const sort = formSorted.replace(" (desc)", "").toLowerCase().trim();
            sortedMods.sort((a, b) => b[sort].localeCompare(a[sort]));
        }
        else {
            const sort = formSorted.replace(" (asc)", "").toLowerCase().trim();
            sortedMods.sort((a, b) => a[sort].localeCompare(b[sort]));
        }

        setAllMods(sortedMods);
    }

    return (
        <form onSubmit={handleSubmit} className="sort-filter-form">
            <select name="sort">
                <option>Name (asc)</option>
                <option>Name (desc)</option>
                <option>Updated (desc)</option>
                <option>Updated (asc)</option>
            </select>
            <button className="sort-filter-button">Sort</button>
        </form>
    );
}