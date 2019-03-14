import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <div className='navbar navbar-dark navbar-expand-lg'>
            <div className='container'>
                <Link to='/rentals' className='navbar-brand'>BookWithMe</Link>
                <form className='form-inline my-2 my-lg-0'>
                    <input
                        className='bookwithme-search form-control mr-sm-2'
                        type='search'
                        placeholder='Try "New York"'
                        aria-label='Search'></input>
                    <button className='btn btn-outline-siccess my-2 my-sm-0 btn-bookwithme-search' type='submit'>Search</button>
                </form>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup'
                    aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                    <a className='nav-item nav-link active' href=''>Login <span className='sr-only'>(current)</span></a>
                    <a className='nav-item nav-link' href=''>Register</a>
                </div>
            </div>
        </div>
    );
}