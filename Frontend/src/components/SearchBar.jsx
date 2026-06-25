const SearchBar = ({ query, setQuery, onSearch, loading }) => {
    return (
        <div>
            <h3>Busqueda por Nombre</h3>
            <form onSubmit={onSearch} className="d-flex flex-column flex-md-row gap-2">

                <input 
                    type="text"
                    placeholder="Buscar Planta"
                    className="form-control text-center flex-grow-1"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                <button 
                    className="btn btn-success col-md-2"
                    disabled={loading}
                    >
                    {loading ? "..." : "Buscar"}
                </button>

            </form>
        </div>
    )
}
export default SearchBar