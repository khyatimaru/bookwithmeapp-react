import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from 'components/rental/RentalSearchInput';

class Header extends React.Component {

    constructor () {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
        this.props.history.push('/login');
    }

    renderAuthButtons(isAuth) {

        if(isAuth) {
            // eslint-disable-next-line
            return <a className='clickable nav-item nav-link' onClick={this.handleLogout}>Logout</a>
        }
        else {
            return(
                <React.Fragment>
                    <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
                    <Link className='nav-item nav-link' to='/register'>Register</Link>
                </React.Fragment>
            );
        }
    }

    renderOwnerSection(isAuth) {

        if(isAuth) {
            return(
                <div className="nav-item dropdown clickable">
                {   // eslint-disable-next-line
                    <a
                        className ='nav-link dropdown-toggle clickable'
                        id='navbarDropdownMenuLink'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'>
                            Owner Section
                    </a>
                }


                    <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                        <Link className='dropdown-item' to='/rentals/create'>Create Rental</Link>
                        <Link className='dropdown-item' to='/rentals/manage'>Manage Rentals</Link>
                        <Link className='dropdown-item' to='/bookings/manage'>Manage Bookings</Link>
                    </div>
                </div>
            );
        }
    }
    render() {
        const {isAuth, username} = this.props.auth;
        return (

            <div className='navbar navbar-dark navbar-expand-lg'>
                <div className='container'>
                    <Link to='/rentals' className='navbar-brand'>BookWithMe
                        <img src={process.env.PUBLIC_URL + '/img/react-logo.svg'} alt=''/>
                    </Link>
                    <RentalSearchInput />
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-toggle='collapse'
                        data-target='#navbarNavAltMarkup'
                        aria-controls='navbarNavAltMarkup'
                        aria-expanded='false'
                        aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav ml-auto'>
                            { isAuth &&
                                // eslint-disable-next-line
                                <a className = 'nav-item nav-link' > {username}</a>
                            }
                            {this.renderOwnerSection(isAuth)}
                            {this.renderAuthButtons(isAuth)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Header));