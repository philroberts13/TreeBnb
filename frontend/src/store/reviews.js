import { csrfFetch } from './csrf';

const LOAD_REVIEWS_PLACE = 'reviews/loadReviewsPlace'
const LOAD_REVIEWS = 'reviews/loadAllReviews'

export const loadReviews = (reviews, placeId) => {
    return {
        type: LOAD_REVIEWS_PLACE,
        reviews,
        placeId
    }
};

export const loadAllReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews,

    }
};

export const getReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews`);

    if(response.ok) {
        const reviews = await response.json();
        dispatch(loadAllReviews(reviews));
    }
}

// export const getReivewsOfPlace = (placeId) => async (dispatch, getState) => {
//     const res = await fetch(`/api/places/${placeId}/reviews`);
//     if (res.ok) {
//         const placeReviews = await res.json();
//         return dispatch(loadReviews(placeReviews, placeId))
//     }
// }

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
        default: return state;
        }
    }

    export default reviewsReducer;
