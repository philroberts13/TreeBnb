import { csrfFetch } from './csrf';

const LOAD_REVIEWS_PLACE = 'reviews/LOAD_REVIEWS_PLACE'
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS_PLACE,
        reviews
    }
};

export const loadAllReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews,

    }
};

export const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

// export const getReviews = () => async dispatch => {
//     const response = await fetch(`/api/places/:placeId`);

//     if(response.ok) {
//         const reviews = await response.json();
//         dispatch(loadAllReviews(reviews));
//     }
// }

export const createReview = (payload) => async dispatch => {
    const response = await csrfFetch('/api/reviews/:placeId', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const newReview = await response.json()
        dispatch(addReview(newReview))
        return newReview
    }
    return response
}

export const getReivewsOfPlace = (placeId) => async (dispatch, getState) => {
    const res = await fetch(`/api/reviews/${placeId}`);
    if (res.ok) {
        const placeReviews = await res.json();
        return dispatch(loadReviews(placeReviews))
    }
}

const initialState = {}


const reviewsReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case LOAD_REVIEWS_PLACE:
            let placeReviews = {};
            action.reviews.forEach(review => {
                placeReviews[review.id] = review;
            });
            return {
                ...state,
                ...placeReviews
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
        case ADD_REVIEW:
                const newState = {
                    ...state,
                    [action.review.id]: action.review
                }
                return newState;

        default: return state;
        }
    }

    export default reviewsReducer;