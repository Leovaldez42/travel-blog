import React, { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import { listLogEntries } from './Api';

const App = () => {
	const [logEntries, setLogEntries] = useState([]);
	const [showPopup, setShowPopup] = useState({});
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vw',
		latitude: 25.133699,
		longitude: 82.564430,
		zoom: 3
	});

	useEffect(() => {
		(async () => {
			const logEntries = await listLogEntries();
			setLogEntries(logEntries);
		})();
	}, []);

	return (
    	<ReactMapGL
			{...viewport}
			mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      		mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
      		onViewportChange={nextViewport => setViewport(nextViewport)}>
			{
				logEntries.map(entry => (
					<>
						<Marker 
							key={entry._id}
							latitude={entry.latitude} 
							longitude={entry.longitude}>
								
						<div 							
							onClick={() => setShowPopup({
							showPopup,
							[entry._id] : true,
							})}
						>
							<img 
								className="marker"
								style={{
									height: `${6 * viewport.zoom}px`,
									width: `${6 * viewport.zoom}px`,
								}}
								src="https://i.imgur.com/y0G5YTX.png" 
								alt="marker" />
						</div>

						</Marker>

						{
							showPopup[entry._id] ? (
								<Popup
									latitude={entry.latitude} 
									longitude={entry.longitude}
									closeButton={true}
									closeOnClick={false}
									onClose={() => this.setState({showPopup: false})}
									anchor="top" >
									<div>
										<h3> { entry.title } </h3>
										<p> { entry.comments } </p>
									</div>
								</Popup>
							) : null
						}
					</>
				))
			}

		</ReactMapGL>
  	);
}

export default App;