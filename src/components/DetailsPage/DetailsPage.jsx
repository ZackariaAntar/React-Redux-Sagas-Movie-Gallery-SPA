import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

function DetailsPage() {
    const details = useSelector(store => store.details)
    const genres = useSelector(store => store.genres)

	return (
		<>
			<h1>Details</h1>
			<Link to={"/"}>
				<input type="button" value="BACK"/>
			</Link>
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