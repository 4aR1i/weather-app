import React from 'react';
import axios from 'axios';

import { AiOutlineEnter } from 'react-icons/ai';
import { AppContext } from '../weather-widget/WeatherWidget';

import './index.scss';

const ModalLocation = () => {
  const { setActiveModal, setCities } = React.useContext<any>(AppContext);
  const [locationValue, setLocationValue] = React.useState('');
  const [warning, setWarning] = React.useState<boolean>(false);

  const enterLocation = async () => {
    await axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=4b890c41902780c1957c7c89885be6c3&units=metric`)
      .then(() => {
        localStorage.setItem('cities', locationValue);
        localStorage.setItem('first_time', 'false');
        setCities((prev: string[]) => [...prev, locationValue]);
        setActiveModal(false);
      })
      .catch(() => {
        setWarning(true);
      });
  };

  React.useEffect(() => {
    setWarning(false);
  }, [locationValue]);

  return (
    <div className="modal-location">
      <label htmlFor="#location">Location:</label>
      <div className="modal-location__enter">
        <input type="text" id="location" className={warning ? 'warning' : ''} onChange={(e) => setLocationValue(e.target.value)} value={locationValue} placeholder="Enter your location" />
        <AiOutlineEnter onClick={enterLocation} />
      </div>
      {warning ? <p className="modal-warning">Location not found.</p> : ''}
    </div>
  );
};

export default ModalLocation;
