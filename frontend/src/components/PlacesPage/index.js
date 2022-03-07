import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getPlaceList } from "../../store/places";
// import { getReviews } from "../../store/reviews";


function PlacesPage() {
    const dispatch = useDispatch();
    const { placeId } = useParams();
    // const place = useSelector(state => (state.places[placeId]));


    const places = useSelector(state => {
        return Object.values(state.places);
      });

      useEffect(() => {
        dispatch(getPlaceList())
      }, [dispatch]);




      if(!places) return null;

    return (
        <div>
            <h1>Tree Houses</h1>
            <ul>
                {places?.map(place => (
                <ul>
                <NavLink className={'link'} key={place.id} to={`/places/${place.id}`}>
                <img key={place.id} src={place.imageUrl} className="image" alt=""/> {place.name}
                </NavLink>
                </ul>))}
            </ul>
        </div>
    )
}

export default PlacesPage;
