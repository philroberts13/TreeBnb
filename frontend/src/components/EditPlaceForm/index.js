import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editPlace } from "../../store/places";
import { useParams } from "react-router-dom";
import './EditForm.css'

function EditPlacePage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { placeId } = useParams();
    const place = useSelector(state => state.places[placeId])

    const [name, setName] = useState(place.name);
    const [address, setAddress] = useState(place.address);
    const [city, setCity] = useState(place.city);
    const [state, setState] = useState(place.state);
    const [country, setCountry] = useState(place.country);
    const [price, setPrice] = useState(place.price);
    const [errors, setErrors] = useState(['nada'])

    const updateName = (e) => setName(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUpdatedPlace = {
            ...place,
            name,
            address,
            city,
            state,
            country,
            price,
        };

        let updatedPlace = await dispatch(editPlace(newUpdatedPlace))
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) {
            if (data.errors)
            setErrors(data.errors);
          }});


        if (updatedPlace.id) {
          history.push("/places")
          }

      };

    return (

    <div className="container">
        <h1 className="editHeader">
            adding a hot tub?
        </h1>
        {errors && !(errors[0] === 'nada') && (
          <ul>
          {errors?.map((error) => (
            <li>{error}</li>
          ))}
          </ul>
        )}
    <form className='editForm' onSubmit={handleSubmit}>
         <label>
         Title
         <input
          type="text"
          value={name}
          onChange={updateName}

        />
      </label>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={updateAddress}

        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={updateCity}

        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={updateState}

        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={updateCountry}

        />
      </label>
      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={updatePrice}

        />
      </label>
      <button type="submit">Update</button>
      </form>
      <div className="background"></div>
    </div>
    )
}

export default EditPlacePage;
