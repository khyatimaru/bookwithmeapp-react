import {
         FETCH_RENTAL_BY_ID_SUCCESS,
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTALS_INIT,
         FETCH_RENTALS_FAIL,
         FETCH_RENTAL_BY_ID_INIT,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT } from './types';

import axios from 'axios';
import axiosService from 'services/axios-service';

import authService from 'services/auth-service';

/////////////////RENTAL ACTIONS

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => {
    return {
        type: FETCH_RENTAL_BY_ID_INIT
    }
}

const fetchRentalByIdSuccess = (rental) => {

    return {
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}
const fetchRentalsSuccess = (rentals) =>  {
    return {
        type: FETCH_RENTALS_SUCCESS,
        rentals
    }
}

const fetchRentalsInit = () => {
    return {
        type: FETCH_RENTALS_INIT

    }
}

const fetchRentalsFail = (errors) => {
    return {
        type: FETCH_RENTALS_FAIL,
        errors
    }
}

export const fetchRentals = (city) => {

    const url = city ? `/rentals?city=${city}` : '/rentals';
    return dispatch => {
        dispatch(fetchRentalsInit);
        axiosInstance.get(url)
            .then(res =>  res.data)
            .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
            .catch(({response}) => dispatch(fetchRentalsFail(response.data.errors))
        );

    }

}
export const fetchRentalById = (rentalId) => {
    return function (dispatch) {
        dispatch(fetchRentalByIdInit());

        axios.get(`/api/v1/rentals/${rentalId}`)
            .then(res => res.data)
            .then(rental => dispatch(fetchRentalByIdSuccess(rental)))

    }

}

export const createRental = (rentalData) => {
    return axiosInstance.post('/rentals', {...rentalData}).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors))
}


////////////AUTH ACTIONS

export const register = (userData) => {
    return axios.post('/api/v1/users/register', {...userData}).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors))
}

export const checkAuthState = () => {

    return dispatch => {
        if(authService.isAuthenticated()) {
            return dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/v1/users/auth', userData)
            .then(res => res.data)
            .then(token => {
                authService.saveToken(token);
                dispatch(loginSuccess());
            })
            .catch(error => {
                dispatch(loginFailure(error.response.data.errors));
            });
    }
}

export const logout = () => {
    authService.invalidateUser();
    return {
        type: LOGOUT
    }
}

export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
        .then(res => res.data)
        .catch(({response}) => Promise.reject(response.data.errors))
}

const loginSuccess = () => {
    const username = authService.getUsername();
    return {
        type: LOGIN_SUCCESS,
        username
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

