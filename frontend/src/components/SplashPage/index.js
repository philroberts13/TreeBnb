import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './splash.css';

function SplashPage() {
    return (
        <div >

        <div>
        <h1 className="header1">treebnb</h1>
        </div>

        <div className="treehouseContainer">
        <div className="treehouse">
        </div>
        <div className="treehouse3">
        </div>
        <div className="treehouse2">
        </div>
        </div>
        <div className="footer">
            <a href="https://github.com/philroberts13/TreeBnb" target={"blank"}> Github/</a>
            <a href="https://linkedin.com/in/philip-roberts-2b218416a" target={"blank"}>LinkedIn</a>
        </div>
        </div>
    )
}

export default SplashPage;
