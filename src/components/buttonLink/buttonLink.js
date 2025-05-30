import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.css';

export const buttonLink = ({ nameBtn, to }) => {
    return (
        <Link to={to} className="btn btn_hall">
            {nameBtn}
        </Link>
    );
};
