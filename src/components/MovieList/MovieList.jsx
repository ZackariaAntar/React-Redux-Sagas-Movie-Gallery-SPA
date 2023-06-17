import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Link} from "react-router-dom";
import {Container, Grid} from '@mui/material'


function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const goToDetails = (film) =>{
        dispatch({type: 'FETCH_GENRES', payload: film})
    }



    return (
		<main>
			<h1 className="page-title">Movie List</h1>
			<Container maxWidth="lg">
				<Grid spacing={3}>
					<Grid item xs>
						<p>xs</p>
					</Grid>

				</Grid>
				{movies.map((movie) => {
					return (
						<div key={movie.id} onClick={() => goToDetails(movie)}>
							<h3>{movie.title}</h3>
							<p>
								<Link to={"/details"}>
									<img src={movie.poster} alt={movie.title} />
								</Link>
							</p>
						</div>
					);
				})}
			</Container>
			<section className="movies"></section>
		</main>
	);
}

export default MovieList;