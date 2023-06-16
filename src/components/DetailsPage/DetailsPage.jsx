import { useSelector } from "react-redux";

function DetailsPage() {
    const details = useSelector(store => store.details)
    const genres = useSelector(store => store.genres)
    console.log(genres);



	return (
		<>
			<h1>Details</h1>
			<div>

					<div key={details.id}>
						<p>{details.title}</p>
						<img src={details.poster}></img>
						<p>{details.description}</p>
					</div>
				<div>
					{genres.map((genre) => (
						<p>{genre.category}</p>
					))}
				</div>
			</div>
		</>
	);
}


export default DetailsPage