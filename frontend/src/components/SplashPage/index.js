import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './splash.css';

function SplashPage() {
    return (
        <div >

        <div>
        <h1 className="header">treebnb</h1>
        </div>

        <div className="treehouseContainer">
        <div className="treehouse">
        </div>
        <div className="treehouse3">
        </div>
        <div className="treehouse2">
        </div>
        </div>

        </div>
    )
}

export default SplashPage;
