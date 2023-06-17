import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import DetailsPage from '../DetailsPage/DetailsPage';

function App() {
  return (
    <div className="App">
      <header className='header'>
        <h1 className='title'>The Movies Saga!</h1>
      </header>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>

        <Route exact path='/details'>
          <DetailsPage />
        </Route>
      </Router>
    </div>
  );
}


export default App;
