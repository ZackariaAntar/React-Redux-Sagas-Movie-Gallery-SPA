import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import { Link } from "react-router-dom";
import {
	Container,
	Grid,
	Card,
	CardActionArea,
	CardMedia,
	Typography,
} from "@mui/material";

function MovieList() {
	// enbling dispatch functionality
	const dispatch = useDispatch();

	// bringing in the movies reducer from the store
	const movies = useSelector((store) => store.movies);

	// preventing an infinite loop of requesting movie data by limiting request only on page load.
	useEffect(() => {
		dispatch({ type: "FETCH_MOVIES" });
	}, []);

	// function to cpature specific movie data for display on the Details Page
	const sequesterMovieData = (film) => {
		dispatch({ type: "FETCH_GENRES", payload: film });
	};
	// rendering DOM elements:
	// registering the sequesterMovieData click event to the parent Card component and routing event to the CardActionArea to facilitate sync/async event process resolution
	// modeled below:
	//  (((capture object data -> dispatch object data to GENRES SAGA) -> (use dispatched data in axios request -> store returned genre data -> store captured object)) --> (ROUTE to /details))

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
									borderRadius: 4,
								}}
								onClick={() => sequesterMovieData(movie)}
							>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									sx={{ mt: 2 }}
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
