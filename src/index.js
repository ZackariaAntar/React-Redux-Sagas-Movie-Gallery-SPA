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
// Used to store all movie data from the DB as an array of objects returned by the server

const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
// ===================  GENRE REDUCER  ===========================//
//  Used to store the movie's genres from the DB as an array of objects returned by the server

const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
// ===================  DETAILS REDUCER  ===========================//
//  Stores the sequestered movie data as an object from the Movie List page to be used on the details page

const details = (state = [], action) => {
    if (action.type === 'SET_DETAILS'){
        return action.payload;
    }
    return state;
}
// =======================   FETCH MOVIES SAGA   ==============================//
//  Requesting data for every movie from the movies table in the DB via the server

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
//  Using the sequestered movie object dispatched here by clicking on that movie's poster on the Movie List Page,
//      we first send a request for that movie's genres from the DB using its object's id as "action.payload.id",
//      and storing that response in the genres reducer as genres.data to be returned via the store.

// THEN, we store that movie's object in the details reducer to be returned via the store.

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
//  Create the rootSaga generator function to handle routing dispatches from the app side to the necessary generator functions on this file.

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
