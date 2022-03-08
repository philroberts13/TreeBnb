import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import PlacesPage from "./components/PlacesPage";
import CreatePlaceForm from "./components/CreatePlaceForm";
import PlaceDetailPage from "./components/PlaceDetailPage";
import EditPlacePage from "./components/EditPlaceForm";
import ReviewsPage from './components/ReviewsPage';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/places">
            <PlacesPage />
          </Route>
          <Route exact path="/places/form">
            <CreatePlaceForm />
          </Route>
          <Route exact path='/places/:placeId'>
            <PlaceDetailPage />
          </Route>
          <Route exact path='/places/edit/:placeId'>
            <EditPlacePage />
          </Route>
          <Route exact path='/reviews'>
            <ReviewsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
