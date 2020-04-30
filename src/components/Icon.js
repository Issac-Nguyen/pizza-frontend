import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
    const {name, ...other} = props;
    return (
        <i data-testid="icon" className={`las ${name}`} {...other}></i>
    )
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
}

export default Icon;