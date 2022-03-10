import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getPlaceList } from "../../store/places";
// import { getReviews } from "../../store/reviews";
import './Places.css'


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


  let placeCards = places?.map(place => (
      <>
                <NavLink key={place.id} to={`/places/${place.id}`}>
                <div className={'imageCard'}key={place.id} style={{backgroundImage: `url(${place.imageUrl})`}}>
                {/* <img key={place.id} src={place.imageUrl} alt=""/> */}
                <div className="infoCard">
                    {place.city},{place.state}
                </div>
                </div>
                </NavLink>

    </>
                ));

    return (
        <div>
            <h1>tree houses</h1>
            <div className="cardsContainer">
                {placeCards}
            </div>
        </div>
    )
}

export default PlacesPage;
