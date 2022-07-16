import React from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const Map = ({restaurants,isLoading}) => {

    // Defaults for initial lng/lat and zoom
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-0.1);
    const [lat, setLat] = useState(51.507);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (isLoading && map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        });
        
            // Add controls
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        // Add restaurants locations
        restaurants.map(restaurant => {
            
            new mapboxgl.Marker(
                {
                    color: "#e0aaff",
                }
            )
                .setLngLat(restaurant.coordinates)
                .addTo(map.current)
        })

    }, [isLoading]);
    
    

  return (
      <Wrapper ref={mapContainer} className="map-container"></Wrapper>
  )
}

const Wrapper = styled.div`
.map-container{
height: 100%;
}

`

export default Map