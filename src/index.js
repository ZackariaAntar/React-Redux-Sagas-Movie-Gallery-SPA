import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';




// =========================  MOVIE REDUCER  ===============================//
//              Used to store movies returned from the server

const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
// ===================  GENRE REDUCER  ===========================//
//              Used to store the movie genres

const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const details = (state = [], action) => {
    if (action.type === 'SET_DETAILS'){
        return action.payload;
    }
    return state;
}

// =======================   FETCH MOVIES SAGA   ==============================//
//                  get all movies from the DB

function* fetchAllMovies() {

    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }

}
// =======================   FETCH GENRES SAGA   ==============================//
//  using the "movie" object dispatched from clicking on a particular fromn the movielist
//  we first request the genres associated with that movie from the DB using that movie object's id as action.payload.id
//  then we store that response in the genres reducer as genres.data and return it via the store.

// THEN, store the clicked on movie's object in the details reducer and return it via the store. 


function* fetchGenres(action) {

    try {
        const genres = yield axios.get(`/api/genre/${action.payload.id}`);
        console.log('get genre data:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data});
        yield put({ type: 'SET_DETAILS', payload: action.payload});

    } catch {
        console.log('get GENRES error');
    }

}

// =========================    ROOT SAGA    ===============================//
//              Create the rootSaga generator function

function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeLatest('FETCH_GENRES', fetchGenres);

}

// =====================  Create sagaMiddleware  ==================================//

const sagaMiddleware = createSagaMiddleware();


// ====================     STORE    =========================//
//          Create one store that all components can use

const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// =====================   Pass rootSaga into our sagaMiddleware  ========================//

sagaMiddleware.run(rootSaga);

// ======================================================================//

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
