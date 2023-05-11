import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Box from '@mui/material/Box';
import axios from 'axios';

const TVshows = () => {
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useState([]);

  const fetchHomePageMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`);
    setContent(data.results);
    console.log(data);
  };
  useEffect(() => {
    fetchHomePageMovies();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {content && content.map((c) =>
        (<MovieCard
          key={c.id}
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          overview={c.overview}
          voteAvg={c.vote_average}
          date={c.first_air_date || c.release_date}
          mediaType={c.media_type ? 'tv' : '' }
          video={c.video}
        />))
      }
    </Box>
  );
};

export default TVshows;