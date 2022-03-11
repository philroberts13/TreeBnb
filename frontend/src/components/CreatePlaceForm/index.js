import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlace, getPlaceList } from "../../store/places";
import { useSelector } from "react-redux"
import './createPlace.css';


function CreatePlaceForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const userId = user.id
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState();
    const [imageUrl, setImageUrl] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPlace = {
            userId,
            name,
            address,
            city,
            state,
            country,
            price,
            imageUrl,
        };


    let createdPlace = dispatch(createPlace(newPlace));


    history.push(`/places`)

    await dispatch(getPlaceList(user?.id))

      };
      if (!user || !user.id) return null;

    return (
    <div className="container">
        <h1>
            build a tree house
        </h1>
        <form className="createForm" onSubmit={handleSubmit}>
        <label>
        Title
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          type="text"
          placeholder="per night in dollars"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL
        <input
          type="text"
          placeholder="image url link here"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create</button>
      </form>

      <div className="background">
      </div>
    </div>
    )
}

export default CreatePlaceForm;
