import { csrfFetch } from './csrf';

const LOAD_PLACES = 'places/LOAD_PLACES';
const ADD_PLACE = 'places/ADD_PLACE'
const LOAD_PLACE = 'places/LOAD_PLACE'
const REMOVE_PLACE = 'places/REMOVE_PLACE'
const UPDATE_PLACE = 'places/UPDATE_PLACE'
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

const loadPlaces = list => ({
    type: LOAD_PLACES,
    list
});

const addPlace = (place) => ({
    type: ADD_PLACE,
    place
})

const loadPlace = (place) => ({
    type: LOAD_PLACE,
    place
})

const removePlace = (placeId) => ({
    type: REMOVE_PLACE,
    placeId
})

const updatePlace = (place) => ({
    type: UPDATE_PLACE,
    place
})

export const loadAllReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews,

    }
};

export const getPlaceList = () => async dispatch => {
    const response = await fetch('/api/places');

    if(response.ok) {
        const list = await response.json();
        dispatch(loadPlaces(list));
    }
}

export const getPlaceById = (id) => async (dispatch) => {
    const response = await fetch(`/api/places/${id}`);
    if(response.ok) {
        let place = await response.json();

        dispatch(loadPlace(place));
    }
    return response;
}

export const createPlace = (payload) => async dispatch => {
    const response = await csrfFetch('/api/places/form', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const newPlace = await response.json()
        dispatch(addPlace(newPlace))
        return newPlace
    }
    return response;
}

export const editPlace = (place) => async (dispatch) => {
    const response = await csrfFetch(`/api/places/edit/${place.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(place)
    })
    if(response.ok) {
        const updatedPlace = await response.json()
        dispatch(updatePlace(updatedPlace))
        return updatedPlace;
    }
    return response;
}

export const deletePlace = (placeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/places/${placeId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        dispatch(removePlace(placeId))
    }
}

// export const getReviews = (placeId, reviews) => async dispatch => {
//     const response = await fetch(`/api/places/${placeId}`);

//     if(response.ok) {
//         const reviews = await response.json();
//         dispatch(loadAllReviews(placeId, reviews));

//         }
//     }

let initialState = {};

const placesReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_PLACES:
            const allPlaces = {}
            action.list.forEach(place => {
                allPlaces[place.id] = place;
            });
            return {
                ...allPlaces,
                ...state
            }
        case LOAD_PLACE:
            newState = {...state}
            newState[action.place.id] = action.place;
            return newState;

        case ADD_PLACE:
            if (!state[action.place.id]) {
                const newState = {
                    ...state,
                    [action.place.id]: action.place
                }
                return newState;
            }
            return {
                ...state,
                [action.place.id]: {
                    ...state[action.place.id],
                    ...state.place
                }
            }

        case REMOVE_PLACE: {
            const newState = {...state};
            delete newState[action.placeId];
            return newState;
        }
        case UPDATE_PLACE: {
            const newState = {...state, [action.place.id]: action.place};
            return newState;
        }
        case LOAD_REVIEWS:
                let reviews = {};
                action.reviews.forEach(review => {
                    reviews[review.id] = review;
                });
                return {
                    ...state,
                    ...reviews
                }

        default: return state;
    }

}

export default placesReducer;
