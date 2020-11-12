import React from 'react';
import { GoogleApiWrapper, Map,Marker, InfoWindow } from 'google-maps-react';

// ...

class _GoogleMap extends React.Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>Hi</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}
 
export const GoogleMap = GoogleApiWrapper({
    apiKey: ('AIzaSyCnrcFHEWtsdej9RrPgjrCeYLtfP6CJhgA')
})(_GoogleMap)