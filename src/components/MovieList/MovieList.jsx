import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Link} from "react-router-dom";
import {Container, Grid, Card, CardContent, CardMedia, Typography} from '@mui/material'


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
			<Container maxWidth="xl">
				<Grid container spacing={5}>
					{movies.map((movie) => (
						<Grid item xs={3} key={movie.id}>
							<Card
								raised
								sx={{
									margin: "0 auto",
									padding: 0.5,
								}}
							>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
								>
									{movie.title}
								</Typography>
								<CardMedia
									component="img"
									sx={{
										height: 375,
										objectFit: "contain",
									}}
									image={movie.poster}
									title={movie.title}
								/>
								<CardContent></CardContent>
							</Card>
						</Grid>
					))}
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