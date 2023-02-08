import React from 'react';
import axios from 'axios';

import { AiOutlineEnter, AiOutlineMenu } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { HiOutlineTrash } from 'react-icons/hi';
import { AppContext } from '../weather-widget/WeatherWidget';

import './index.scss';

const Settings: React.FC = () => {
  const { cities, setCities, setActiveSettings } = React.useContext<any>(AppContext);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [currentItem, setCurrentItem] = React.useState<string>(null);
  const [warning, setWarning] = React.useState<boolean>(false);

  React.useEffect(() => {
    setWarning(false);
  }, [inputValue]);

  React.useEffect(() => {
    localStorage.setItem('cities', cities);
  }, [cities]);

  const addLocation = async () => {
    await axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=4b890c41902780c1957c7c89885be6c3&units=metric`)
      .then(() => {
        setCities((prev: string[]) => [...prev, inputValue]);
        setInputValue('');
      })
      .catch(() => {
        setWarning(true);
      });
  };

  const removeLocation = (elem: string) => {
    setCities((prev: string[]) => prev.filter((item: string) => item !== elem));
  };

  const dragStart = (elem: string) => {
    setCurrentItem(elem);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const drop = (e: React.DragEvent<HTMLDivElement>, elem: string) => {
    e.preventDefault();
    setCities((prev: string[]) =>
      prev.map((el) => {
        if (el === elem) {
          return (el = currentItem);
        }
        if (el === currentItem) {
          return (el = elem);
        }
        return el;
      }),
    );
  };

  return (
    <div className="settings">
      <h2 className="settings__title">Settings</h2>
      <div className="settings__items">
        {cities.map((elem: string, i: number) => (
          <div key={i} className="settings__item" draggable={true} onDragStart={(e) => dragStart(elem)} onDragOver={(e) => dragOver(e)} onDrop={(e) => drop(e, elem)}>
            <AiOutlineMenu />
            <span>{elem}</span>
            <HiOutlineTrash onClick={() => removeLocation(elem)} />
          </div>
        ))}
      </div>
      <div className="settings__add-location add-location">
        <h2 className="add-location__title">Add Location:</h2>
        <div className="add-location__block">
          <input type="text" className={warning ? 'warning' : ''} onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="Enter location" />
          <AiOutlineEnter
            onClick={() => {
              addLocation();
            }}
          />
        </div>
        {warning ? <p className="modal-warning">Location not found.</p> : ''}
      </div>
      <div className="settings__close">
        <IoMdClose onClick={() => setActiveSettings((prev: boolean) => !prev)} />
      </div>
    </div>
  );
};

export default Settings;
