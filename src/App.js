import react from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "1780a169";

const Container = styled.div`
  display:flex;
  flex-direction:column;
`;

const Header = styled.div`
 display:flex;
 align-items:center;
 flex-direction:row;
 justify-content: space-between;
 background-color:black;
 color: white;
 padding: 10px;
 font-size: 25px;
 font-weight: bold;
 box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
 display: flex;
 align-items: center;
 flex-direction: row;
`;

const MovieImage = styled.img`
 width:48px;
 height:48px;
 margin:15px;
`;

const SearchBox = styled.div`
 display: flex;
 flex-direction: row;
 padding: 10px 10px;
 background-color: white;
 border-radius: 5px;
 margin-left: 20px;
 width:50%;
 align-items: center;
`;

const SearchIcon = styled.img`
 width: 32px;
 height: 32px;
`;

const SearchInput = styled.input`
 color: black;
 font-size: 16px;
 border: none;
 font-weight: bold;
 outline: none;
 margin-left: 15px;
`;

const MovieListContainer = styled.div`
 display: flex;
 flex-direction: row;
 gap: 2rem;
 flex-wrap: wrap;
 padding: 30px;
 justify-content: space-evenly;
`;

const Placeholder = styled.img`
 width: 120px;
 height: 120px;
 margin: 150px;
 opacity: 50%
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const[movieList, updateMovieList] = useState([]);
  const[selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
      );
      updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value),500);
    updateTimeoutId(timeout);
  };

  return(
    <Container>
      <Header><AppName> <MovieImage src="/movie-icon.svg" /> React Movie-App </AppName>
       <SearchBox>
         <SearchIcon src="/search-icon.svg" />
         <SearchInput placeholder="Search Movie"
         value={searchQuery}
          onChange={onTextChange} />
       </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent 
      selectedMovie={selectedMovie}
      onMovieSelect={onMovieSelect} />}
      <MovieListContainer>
        {movieList?.length
        ? (movieList.map((movie, index) => ( 
           <MovieComponent
            key={index}
            movie={movie}
            onMovieSelect={onMovieSelect} />
          ))
        )
        : (
          <Placeholder src="/info.png" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
