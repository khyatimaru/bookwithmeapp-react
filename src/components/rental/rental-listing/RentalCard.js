import React from 'react';
import { Link } from 'react-router-dom';

export function RentalCard(props) {

    const rental = props.rental;
    return (
        <div className={ props.colNum }>
            <Link to={`/rentals/${rental.id}`} className='card-detail-link'>
                <div className='card bookwithme-card'>
                    <img className='card-img-top' src='http://via.placeholder.com/350x250' alt={rental.title}></img>
                    <div className='card-block'>
                        <h6 className={`card-subtitle ${rental.category}`}>{rental.shared ? 'shared' : 'whole'} {rental.category} &#183; {rental.city}</h6>
                        <h4 className='card-title'>{rental.title}</h4>
                        <p className='card-text'>$ {rental.dailyRate} per Night &#183; Free Cancellation</p>
                    </div>
                </div>
            </Link>
        </div>

    );
}