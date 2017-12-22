import React from 'react';
import PropTypes from 'prop-types';

export const Header = (props) => {
    return (
        <nav className='navbar navbar-dark bg-light'>
            <a className='navbar-brand'>{ props.heading }</a>
        </nav>
    );

};

Header.propTypes = {
    heading: PropTypes.string
};
