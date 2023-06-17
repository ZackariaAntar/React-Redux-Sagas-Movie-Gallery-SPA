import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { styled } from "@mui/material/styles";
import {
	Container,
	Grid,
	Card,
	CardContent,
    CardActions,
	CardMedia,
	Typography,
	Collapse,
	IconButton,
    Button

} from "@mui/material";

import  ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

function DetailsPage() {
    const details = useSelector(store => store.details)
    const genres = useSelector(store => store.genres)

    const [expanded, setExpanded] = useState(false);
    const ExpandMore = styled((props) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	}));
    	const expandIt = () => {
			setExpanded(!expanded);
		};



	return (
		<>
			<h1>Details</h1>
            <Button component={Link} to="/" variant="contained" sx={{mb:3}}>
                BACK
            </Button>
			<Container maxWidth="md">
				<Card
					raised
					sx={{
						height: "auto",
						width: 650,
						margin: "0 auto",
						padding: "0.1em",
					}}
				>
					<CardContent>
						<Typography variant="h3">{details.title}</Typography>
					</CardContent>
					<CardContent sx={{ textAlign: "left" }}>
						<CardMedia
							component="img"
							sx={{objectFit: "contain", height: 450 }}
							image={details.poster}
							alt={details.title}
						/>
						<CardContent sx={{mb:-7, mr:4.3}} align="end">
							<Typography>Genres:</Typography>
						</CardContent>
						<CardActions>
							<ExpandMore
								expand={expanded}
								onClick={expandIt}
								aria-expanded={expanded}
								aria-label="show more"
							>
								<ExpandMoreIcon />
							</ExpandMore>
						</CardActions>
						<Collapse
							in={expanded}
							timeout="auto"
							unmountOnExit
							align="start"
						>
							<Grid
								container
								justifyContent="center"
							>
								{genres.map((genre) => (
									<Grid
										item
										xs={4}
										sx={{ textAlign: "center", mb:5 }}
									>
										<Typography  variant="h4">
											{genre.category}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Collapse>

						<Typography variant="body2" color="text.secondary">
							{details.description}
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}


export default DetailsPage