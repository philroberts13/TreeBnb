import { csrfFetch } from './csrf';

const LOAD_PLACES = 'places/LOAD_PLACES';

const loadPlaces = list => ({
    type: LOAD_PLACES,
    list
});

export const getPlaceList = () => async dispatch => {
    const response = await fetch('/api/places');

    if(response.ok) {
        const list = await response.json();
        dispatch(loadPlaces(list));
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
        default: return state;
    }

}

export default placesReducer;
