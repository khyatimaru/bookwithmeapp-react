import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import { authReducer } from './auth-reducer';
import { userBookingsReducer } from './booking-reducer';
import { reducer as formReducer } from 'redux-form';

export const init = () => {

    const reducer = combineReducers({
        rentals: rentalReducer,
        rental: selectedRentalReducer,
        userBookings: userBookingsReducer,
        form: formReducer,
        auth: authReducer
    });

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

    return store;
}

