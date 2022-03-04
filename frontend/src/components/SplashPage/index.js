import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SplashPage() {
    return (
        <div>

        <div>
        <h1>treebnb</h1>
        </div>

        <img className="treehouse" src="https://images.unsplash.com/photo-1615354310157-c78b1be66eed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="treehouse" />

        </div>
    )
}

export default SplashPage;
