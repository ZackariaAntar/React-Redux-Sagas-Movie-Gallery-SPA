import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Link} from "react-router-dom";
import {
	Container,
	Grid,
	Card,
	CardActionArea,
	CardMedia,
	Typography,
} from "@mui/material";


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
									paddingBottom: 4.5,
                                    borderRadius: 4
								}}
								onClick={() => goToDetails(movie)}
							>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
                                    sx={{mt:2}}
								>
									{movie.title}
								</Typography>
								<CardActionArea component={Link} to="/details">
									<CardMedia
										component={"img"}
										sx={{
											height: 375,
											objectFit: "contain",
										}}
										image={movie.poster}
										title={movie.title}
									/>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</main>
	);
}

export default MovieList;