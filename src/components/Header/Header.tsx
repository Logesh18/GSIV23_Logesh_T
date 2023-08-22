import { memo, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import './Header.css';

function Header({
  searchBar, setQuery, setMovies, setPage}:
  {searchBar: boolean, setQuery?: any, setMovies?: any, setPage?: any}
) {
    const navigate = useNavigate();
    const [previousQuery, setPreviousQuery] = useState<string>("");
    const handleNavigation = () => {
        navigate('/movies');
    };

    const Search = (event: any) => {
      if (event.key === 'Enter' && event.target.value !== previousQuery) {
        setMovies([]);
        setPreviousQuery(event.target.value);
        setQuery(event.target.value);
        setPage(1);
      }
    };

    return (
      <>
          <div className="App HeaderContainer">
            <div className = "SearchContainer">
                  { 
                    searchBar ?
                      <span className = "SearchBarContainer">
                        <span className = "SearchIcon">
                          <SearchIcon />
                        </span>
                        <input className = "SearchBar" type="search" placeholder="Search"
                           onKeyDown = {(event) => Search(event)}
                        />
                      </span> 
                    : <strong className = "Title">Movie Details</strong>
                  }
            </div>

            <div className = "HomeIconContainer">
              <HomeIcon className = "HomeIcon" onClick = {handleNavigation}/>
            </div>
          </div>
      </>
    );
  }

export default memo(Header);