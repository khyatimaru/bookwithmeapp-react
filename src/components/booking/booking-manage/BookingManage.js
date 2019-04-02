import React from 'react';
import * as actions from 'actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookingCard } from './BookingCard';

class BookingManage extends React.Component {


    componentWillMount() {
        this.props.dispatch(actions.fetchUserBookings());
    }

    renderBookings() {
        const { data: bookings } = this.props.userBookings;

        return bookings && bookings.map((booking, index) => {
            return (
                <BookingCard booking={booking} key={index} />
            )
        });
    }

    render() {
        const { data: bookings, isFetching } = this.props.userBookings;
        return (
            <section id = 'userBookings'>
                <h1 className = 'page-title' > My Bookings</h1>
                <div className='row'>
                    {this.renderBookings()}
                </div>

                { !isFetching && bookings && bookings.length === 0 &&
                    <div className='alert alert-warning'>
                        You have no bookings created go to rentals section and book your place today.
                        <Link style={{'marginLeft': '10px'}} className='btn btn-bookwithme' to='/rentals'> Available rentals</Link>
                    </div>
                }
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        userBookings: state.userBookings,
        errors: state.errors
    }
}

export default connect(mapStateToProps)(BookingManage)