import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vw',
		latitude: 25.133699,
		longitude: 82.564430,
		zoom: 3
	});

	useEffect(() => {
		
	}, []);

	return (
    	<ReactMapGL
			{...viewport}
			mapStyle="mapbox://styles/leovaldez42/ckhs0lhv210ba19rmhpbbd25a"
      		mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
      		onViewportChange={nextViewport => setViewport(nextViewport)}
    	/>
  	);
}

export default App;