import React from 'react';
import GoogleMapReact from 'google-map-react';
import { API, MAPDATA } from '../../helper';
import { Image } from 'react-bootstrap';
import './Maps.scss';

const Marker = () => (
  <Image src={require('../../../img/markerMap.svg')}/>
);

const mapConfig = {
  center: [MAPDATA.LAT, MAPDATA.LNG],
  zoom: MAPDATA.ZOOM
};

class Maps extends React.Component {
  render() { 
    const GoogleMapsMarker = (
      <Marker
        lat={MAPDATA.LAT}
        lng={MAPDATA.LNG}
        title={MAPDATA.NAME}/>
    );
    return (
      <div className='googleMap'>
        <GoogleMapReact       
          defaultCenter={mapConfig.center}
          defaultZoom={mapConfig.zoom}
          bootstrapURLKeys={{
            key: API.KEY_GOOGLE,
            language: 'API.LANGUADGE'
          }}>
          {GoogleMapsMarker}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Maps;
