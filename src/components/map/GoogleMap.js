import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    InfoWindow
} from 'react-google-maps';
import { Cacher } from 'services/cacher';

function MapComponent(props) {

    const {coordinates, isError, isLocationLoaded} = props; //is same as const coordinates = props.coordinates;
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={coordinates}
            center={coordinates}
            options={{disableDefaultUI: isError ? true : false }}
        >
                {isLocationLoaded && !isError && <Circle center={coordinates} radius={500} />}
                {isLocationLoaded && isError &&
                <InfoWindow position={coordinates}
                    options = {{maxWidth: 300}}>
                    <div>
                         Uuuuups, there is a problem to find location on the map, we are trying to resolve
                         problems as fast as possible. Contact host for additional information if you are
                         still interested in booking this plce. We are sorry for inconvenience.
                    </div>
                </InfoWindow>}
        </GoogleMap>
    );
}


function withGeoCode(WrappedComponent) {
    return class extends React.Component {
        constructor() {
            super();
            this.cacher = new Cacher();
            this.state= {
                coordinates: {
                    lat: 0,
                    lng: 0
                },
                isError: false,
                isLocationLoaded: false
            }
        }

        componentWillMount() {
            this.getGeoCodedLocation();
        }

        geoCodeLocation(location) {
            return new Promise((resolve, reject) => {
                const goecoder = new window.google.maps.Geocoder();
                goecoder.geocode({address: location}, (result, status) => {
                    if(status === 'OK') {
                        const geometry = result[0].geometry.location;
                        const coordinates = {
                            lat: geometry.lat(),
                            lng: geometry.lng()
                        }
                        this.cacher.cacheValue(location, coordinates);

                        resolve(coordinates)
                    }
                    else {
                        reject('ERROR!!!!');
                    }
                });
            });
        }

        updateCoordinates(coordinates) {
            this.setState({ coordinates,
            isLocationLoaded: true
            })
        }

        getGeoCodedLocation() {
            
            const location = this.props.location;
            //if location is cached then return cached values
            if(this.cacher.isValueCached(location)) {
                this.updateCoordinates(this.cacher.getCachedValue(location));

            } else { //else geocode location
                this.geoCodeLocation(location).then(
                (coordinates) => {
                    this.updateCoordinates(coordinates);

                },
                (error) => {
                    this.setState({isError: true, isLocationLoaded: true});
                    console.log('ERROR');
                });
            }
        }
        render() {
            return (
                <WrappedComponent {...this.state}/>
            );
        }
    }
}
export const MapWithGeoCode = withScriptjs(withGoogleMap(withGeoCode(MapComponent)));

