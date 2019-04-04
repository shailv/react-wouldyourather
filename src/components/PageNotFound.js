import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound(props) {
    return (
        <div>
            <h3>Page Not Found</h3>
            Please click <Link to="/">here</Link> to go back to homepage
        </div>
    )
}

export default PageNotFound;