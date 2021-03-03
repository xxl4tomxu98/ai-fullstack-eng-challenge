import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

    return (
        <div className='queryBtns'>
            <Link to='/search/:term'>
                <button type='button' className='s-btn s-btn__filled'>Movie Keyword Search</button>
            </Link>
            <Link to='/search/tags/:tagTerm'>
                <button type='button' className='s-btn s-btn__filled'>Search by Tag Content</button>
            </Link>
            <Link to='/search/ratings/:ratingTerm'>
                <button type='button' className='s-btn s-btn__filled'>Search by Rating</button>
            </Link>
            <Link to='/search/users/:userId'>
                <button type='button' className='s-btn s-btn__filled'>Search by User ID</button>
            </Link>
        </div>
    );
}

export default HomePage;
