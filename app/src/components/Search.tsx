import { useRef } from "react";
import "./Search.css";
import Button from "./Button";
// import { NavLink } from "react-router-dom";

// import CustomSelect from "./CustomSelect";

function Search({setFilterParams,setPage}:any) {

    let searchRef = useRef<HTMLInputElement>(null)
    let selectRef = useRef<HTMLSelectElement>(null)
    let searchVal = searchRef.current? searchRef.current.value : ""
    let selectVal = selectRef.current? selectRef.current.value : ""
    function handleSearch(e:Event) {
        e.preventDefault()
        searchVal = searchRef.current? searchRef.current.value : ""
        selectVal = selectRef.current? selectRef.current.value : ""
        let params:Record<string,string> = {}
        if(searchVal)
          params["message"] = searchVal;
        if(selectVal)
          params["level"] = selectVal
		    // setPage(1)
        setFilterParams(params)
        setPage(1)
      }

    function clearSearch() {
      if(searchRef.current)
        searchRef.current.value = ''
      if(selectRef.current)
        selectRef.current.value = ''
      setFilterParams({})
      setPage(1)
    }

  return (
    <div className="filterSection">
      <div className='filterComponents'>
        <div className="searchBarContainer" >
        <input
            type="text"   
            className="searchBar"
            placeholder="search log message"
            ref={searchRef}
        />
        </div>
        <div className="searchSelectContainer">
          <select className="searchSelect" ref={selectRef}>
            <option value="">All</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
          </select>

        </div>
        <div className='searchDiv' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Button type="button" onClick={handleSearch} className="searchButton cardButton">Search</Button>
            <Button type="button" onClick={clearSearch} className="clearButton">Clear</Button>
        </div>
      </div>
    </div>
  )
}

export default Search
