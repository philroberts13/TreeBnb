import { csrfFetch } from './csrf';

const LOAD_PLACES = 'places/LOAD_PLACES';
const ADD_PLACE = 'places/ADD_PLACE'
const LOAD_PLACE = 'places/LOAD_PLACE'
const REMOVE_PLACE = 'places/REMOVE_PLACE'

const loadPlaces = list => ({
    type: LOAD_PLACES,
    list
});

const addPlace = (place) => ({
    type: ADD_PLACE,
    place
})

const loadPlace = list => ({
    type: LOAD_PLACE,
    list
})

const removePlace = (placeId) => ({
    type: REMOVE_PLACE,
    placeId
})

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
        let list = await response.json();
        dispatch(loadPlace(list));
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

export const deletePlace = (placeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/places/${placeId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        dispatch(removePlace(placeId))
    }
}

let initialState = {
    list: [],
};

const placesReducer = (state = initialState, action) => {
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
        default: return state;
    }

}

export default placesReducer;
