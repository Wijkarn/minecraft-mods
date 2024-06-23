export default function SortButton({ mods, setMods }) {

    const options = [
        "Title (asc)",
        "Title (desc)",
        "Updated (asc)",
        "Updated (desc)",
        "Name (asc)",
        "Name (desc)",
    ];

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const formSorted = formJson.sort;

        const sortedMods = [...mods];

        if (formSorted.includes("desc")) {
            const sort = formSorted.replace(" (desc)", "").toLowerCase().trim();
            sortedMods.sort((a, b) => b[sort].localeCompare(a[sort]));
        }
        else {
            const sort = formSorted.replace(" (asc)", "").toLowerCase().trim();
            sortedMods.sort((a, b) => a[sort].localeCompare(b[sort]));
        }

        setMods(sortedMods);
    }

    return (
        <form onSubmit={handleSubmit} className="sort-filter-form">
            <select name="sort">
                {options.map(option => <option key={option}>{option}</option>)}
            </select>
            <button className="sort-filter-button">Sort</button>
        </form>
    );
}