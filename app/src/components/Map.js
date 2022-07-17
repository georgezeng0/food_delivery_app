import React,{ useRef,useEffect,useState }  from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import Marker from '../resources/marker-dark.png';
import HomeMarker from '../resources/home.png'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const Popup = ({ restaurant, onClick }) => {
    const { r_name,r_id,cuisine } = restaurant
    

    return <div className="popup">
        <h3>{r_name}</h3>
        <p>
            {
                cuisine && cuisine.map((c, i) => { 
                    if (i < (cuisine.length-1)) { return `${c}, ` }
                    else return c
            })
            }
        </p>
        <h5 onClick={()=>onClick(r_id)}>View</h5>
        {/* <Link to={`/restaurants/${r_id}`}><h3>{r_name}</h3></Link> */}
    </div>
}

const Map = () => {
    const { sorted_restaurants: restaurants, userLocation: { coordinates } } = useSelector(state => state.restaurant);

    // Defaults for initial lng/lat and zoom
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-0.1);
    const [lat, setLat] = useState(51.507);
    const [zoom, setZoom] = useState(9);

    const navigate=useNavigate()
    
    const onClick = (r_id) => {
        navigate(`/restaurants/${r_id}`)
    }

    // Initialise map once
    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/georgezeng/cl5pey8tt00e814o1fcp6wf9q', //'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        });
        
            // Add controls
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Add fly on click
        map.current.on('click', (e) => {
            setTimeout(() => {
                map.current.flyTo({
                    center: e.lngLat,
                    speed: 0.5,
                })
            },
                50
            )
        
            
    })
    }, [])
    
     // Add markers
    useEffect(() => {

            // Temp markers
            const markersTemp = [];
            // Add restaurants locations
            restaurants.map(restaurant => {
                const { coordinates, r_id } = restaurant

                //custom marker element
                const markerElement = document.createElement('img');
                markerElement.className = 'marker';
                markerElement.src = Marker;
            
                // popup element
                const popupElement = document.createElement('div');
                popupElement.className = 'popup-container';
                const root = createRoot(popupElement);
                root.render(
                    <Popup restaurant={restaurant} onClick={onClick}></Popup>
                )

                const marker = new mapboxgl.Marker(
                    {
                        color: "#e0aaff",
                        element: markerElement,
                        anchor: 'bottom',

                    }).setLngLat(coordinates)
                    .setPopup(new mapboxgl.Popup({
                        anchor: 'bottom',
                        offset: 10,
                    })
                        .setDOMContent(popupElement)
                    )
                marker.addTo(map.current)
                markersTemp.push(marker)
            })

        return () => {
            markersTemp.forEach(marker=>marker.remove())
        }
    }, [restaurants]);

    useEffect(() => {
        const markerElement = document.createElement('img');
                markerElement.className = 'marker';
                markerElement.src = HomeMarker;
        const marker = new mapboxgl.Marker(
            {
                color: "#e0aaff",
                element: markerElement,
                anchor: 'bottom',

            })
        if (coordinates.length > 0) {
            

            marker.setLngLat(coordinates)
            marker.addTo(map.current)
        }
        return () => { marker.remove() }
    },[coordinates])

  return (
      <Wrapper ref={mapContainer} className="map-container">

    </Wrapper>
  )
}

const Wrapper = styled.div`
.map-container{
height: 100%;
}
.marker{
    max-width: 50px;
    max-height: 50px;
    :hover{
        cursor:pointer;
    }

}
.popup{
   width: 100px;
   text-align: center;
   display: flex;
   flex-direction: column;
   align-items: center;
   h3{
    margin: 2px 0px 5px;
    color: var(--primary-5);
    border-bottom: 2px solid var(--primary-5);
   }
   h5{
    width: 50%;
    margin: 0;
    border-radius: 5px;
    color: blue;
    box-shadow: 0px 0px 2px 2px var(--grey-2);
    :hover{
        cursor: pointer;
    }
   }
   p{
    margin: 0;
    margin-bottom: 10px;
   }
}
`

export default Map