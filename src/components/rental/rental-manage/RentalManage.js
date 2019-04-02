import React from 'react';
import * as actions from 'actions';
import { Link } from 'react-router-dom';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';


export class RentalManage extends React.Component {

    componentWillMount() {
        this.getUserRentals();
    }
     constructor() {
         super();

         this.state = {
             userRentals: [],
             errors: [],
             isFetching: false,
             deleted: false
         }
         this.getUserRentals = this.getUserRentals.bind(this);
         this.deleteRental = this.deleteRental.bind(this);
         this.renderRentalCards = this.renderRentalCards.bind(this);

     }

    getUserRentals() {
        this.setState({isFetching: true})
        actions.getUserRentals().then(
            (userRentals) => this.setState({userRentals, isFetching: false}),
            (errors) => this.setState({errors, isFetching: false})
        );

    }

    resetRentalData(index) {
        this.state.userRentals.splice(index, 1);
    }

    deleteRental(rentalId, rentalIndex) {

        actions.deleteRental(rentalId).then(
        () => {
           this.deleteRentalFromList(rentalIndex);

        },
        (errors) => {
            toast.error(errors[0].detail);
        })
    }

    deleteRentalFromList(rentalIndex) {
        const userRentals = this.state.userRentals.slice();
        userRentals.splice(rentalIndex, 1);
        this.setState({userRentals});
    }

    renderRentalCards(userRentals) {

        return userRentals && userRentals.map((rental, index) =>
            <RentalManageCard
                rental={rental}
                key={index}
                deleteRentalCb={this.deleteRental}
                rentalIndex={index}
                modal={<RentalManageModal
                        key={index}
                        bookings={rental.bookings}
                        />}
            />
        );

    }

    render() {
        const { userRentals, isFetching } = this.state;

        return (
            <section id = 'userRentals'>
                <ToastContainer />

                <h1 className = 'page-title' > My Rentals </h1>
                <div className='row'>
                    {this.renderRentalCards(userRentals)}
                </div>
                { !isFetching && userRentals && userRentals.length === 0 &&
                    <div className='alert alert-warning'>
                        You do not have any rentals currently created. If you want to advertise your property
                        please follow this link.
                        <Link style={{'marginLeft': '10px'}} className='btn btn-bookwithme' to='/rentals/create'>Register Rental</Link>
                    </div>
                }
            </section>
        );
    }
}

