import React from 'react';
import { Link } from 'react-router-dom';
import { rentalType } from 'helpers';

export function RentalCard(props) {

    const rental = props.rental;
    return (
        <div className={ props.colNum }>
            <Link to={`/rentals/${rental._id}`} className='card-detail-link'>
                <div className='card bookwithme-card'>
                    <img className='card-img-top' src={rental.image} alt={rental.title}></img>
                    <div className='card-block'>
                        <h6 className={`card-subtitle ${rental.category}`}>{rentalType(rental.shared)} {rental.category} &#183; {rental.city}</h6>
                        <h4 className='card-title'>{rental.title}</h4>
                        <p className='card-text'>$ {rental.dailyRate} per Night &#183; Free Cancellation</p>
                    </div>
                </div>
            </Link>
        </div>

    );
}