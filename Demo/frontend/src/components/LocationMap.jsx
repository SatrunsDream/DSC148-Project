import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider, CircularProgress, Alert } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '10px'
};

const defaultCenter = {
  lat: 32.7157, // San Diego coordinates as default
  lng: -117.1611
};

// Define place types relevant for home buyers
const placeTypes = {
  schools: { type: 'school', label: 'Schools' },
  groceries: { type: 'grocery_store', label: 'Grocery Stores' },
  hospitals: { type: 'hospital', label: 'Hospitals & Medical Centers' },
  parks: { type: 'park', label: 'Parks & Recreation' },
  restaurants: { type: 'restaurant', label: 'Restaurants' },
  transit: { type: 'transit_station', label: 'Public Transit' },
  shopping: { type: 'shopping_mall', label: 'Shopping Centers' }
};

const LocationMap = ({ city, zipcode, shouldFetch }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState(
    Object.keys(placeTypes).reduce((acc, key) => ({ ...acc, [key]: [] }), {})
  );
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [areaInfo, setAreaInfo] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const fetchNearbyPlaces = async (location, type) => {
    try {
      console.log(`Fetching places of type ${type} at location:`, location);
      const response = await axios.get(
        `http://localhost:8000/api/nearby-places?latitude=${location.lat}&longitude=${location.lng}&type=${type}`
      );
      console.log(`Response for ${type}:`, response.data);
      
      if (response.data.status === "OK" && response.data.results) {
        return response.data.results.map(place => ({
          place_id: place.id || Math.random().toString(),
          name: place.displayName?.text || 'Unnamed Place',
          geometry: {
            location: {
              lat: place.location?.latitude,
              lng: place.location?.longitude
            }
          },
          vicinity: place.formattedAddress
        })).slice(0, 3);  // Limit to 3 places per category
      }
      return [];
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      return [];
    }
  };

  useEffect(() => {
    const getCoordinates = async () => {
      if (!city || !zipcode || !shouldFetch) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchQuery = `${city} ${zipcode}`;
        console.log('Geocoding address:', searchQuery);
        
        const response = await axios.get(
          `http://localhost:8000/api/geocode?address=${encodeURIComponent(searchQuery)}`
        );

        console.log('Geocoding response:', response.data);

        if (response.data.status === "OK" && response.data.results && response.data.results.length > 0) {
          setError(null); // Clear any existing errors
          const { lat, lng } = response.data.results[0].geometry.location;
          const newCenter = { lat, lng };
          console.log('New center:', newCenter);
          setCenter(newCenter);

          // Fetch places one at a time to avoid rate limiting
          const newNearbyPlaces = {};
          for (const [key, { type }] of Object.entries(placeTypes)) {
            console.log(`Fetching places for ${key}`);
            const places = await fetchNearbyPlaces(newCenter, type);
            newNearbyPlaces[key] = places;
          }

          console.log('All nearby places:', newNearbyPlaces);
          setNearbyPlaces(newNearbyPlaces);

          const addressComponents = response.data.results[0].address_components;
          const areaData = {
            neighborhood: addressComponents.find(comp => comp.types.includes('neighborhood'))?.long_name || 'N/A',
            city: addressComponents.find(comp => comp.types.includes('locality'))?.long_name || 'N/A',
            county: addressComponents.find(comp => comp.types.includes('administrative_area_level_2'))?.long_name || 'N/A',
            state: addressComponents.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name || 'N/A'
          };
          setAreaInfo(areaData);
          setShowContent(true);
        } else if (!response.data.results || response.data.results.length === 0) {
          setError(`No results found for ${city}, ${zipcode}. Please check if the city and ZIP code are correct.`);
          setShowContent(false);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        setError('Unable to connect to the server. Please try again.');
        setShowContent(false);
      } finally {
        setLoading(false);
      }
    };

    getCoordinates();
  }, [city, zipcode, shouldFetch]);

  const renderPlacesList = (places, label) => (
    <>
      <Typography 
        variant="subtitle1" 
        color="primary" 
        sx={{ 
          mt: 2, 
          fontWeight: 'bold',
          fontFamily: "'Dancing Script', cursive",
          fontSize: '1.5rem',
          color: '#2e7d32'
        }}
      >
        Nearby {label}:
      </Typography>
      {places.length > 0 ? (
        <List dense>
          {places.map((place) => (
            <ListItem 
              key={place.place_id}
              button
              onClick={() => setSelectedPlace(place)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.08)',
                }
              }}
            >
              <ListItemText 
                primary={place.name}
                secondary={
                  <>
                    {place.vicinity}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No {label.toLowerCase()} found within 3km
        </Typography>
      )}
    </>
  );

  if (!city || !zipcode) {
    return (
      <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
        <Alert severity="info">
          Please enter both city and ZIP code to view the area information and nearby amenities.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        color="primary" 
        align="center"
        sx={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '2rem',
          color: '#2e7d32',
          mb: 3,
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        Area Information & Nearby Places
      </Typography>
      
      {showContent && (
        <>
          <Box sx={{ position: 'relative', height: '400px' }}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  styles: [
                    {
                      featureType: 'poi',
                      elementType: 'labels',
                      stylers: [{ visibility: 'off' }]
                    }
                  ]
                }}
              >
                {map && (
                  <>
                    <Marker 
                      position={center}
                      icon={{
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new window.google.maps.Size(40, 40)
                      }}
                    />
                    {Object.values(nearbyPlaces).flat().map((place) => (
                      <Marker
                        key={place.place_id}
                        position={place.geometry.location}
                        icon={{
                          url: place.icon,
                          scaledSize: new window.google.maps.Size(25, 25)
                        }}
                        onClick={() => setSelectedPlace(place)}
                      />
                    ))}
                  </>
                )}

                {selectedPlace && (
                  <InfoWindow
                    position={selectedPlace.geometry.location}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <Box sx={{ p: 1 }}>
                      <Typography variant="subtitle2">{selectedPlace.name}</Typography>
                      {selectedPlace.vicinity && (
                        <Typography variant="body2">Address: {selectedPlace.vicinity}</Typography>
                      )}
                    </Box>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
            {loading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>

          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {areaInfo && !loading && (
            <Box sx={{ mt: 2 }}>
              <Typography 
                variant="h6" 
                color="primary"
                sx={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.8rem',
                  color: '#2e7d32',
                  mb: 2
                }}
              >
                Area Information:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Neighborhood" secondary={areaInfo.neighborhood} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="City" secondary={areaInfo.city} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="County" secondary={areaInfo.county} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="State" secondary={areaInfo.state} />
                </ListItem>
              </List>
              <Divider />
              {Object.entries(placeTypes).map(([key, { label }]) => (
                <React.Fragment key={key}>
                  {renderPlacesList(nearbyPlaces[key], label)}
                  <Divider />
                </React.Fragment>
              ))}
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default LocationMap; 