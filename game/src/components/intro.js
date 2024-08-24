import React from "react";
import { Link } from "react-router-dom";

const Intro=()=>{
    return(
        <>
        <Link to="./manager">
        <button>Manager</button>
        </Link>
        <Link to="./player">
        <button>Participants</button>
        </Link>
        </>
    );
}
export default Intro;