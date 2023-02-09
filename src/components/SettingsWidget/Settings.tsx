import React from 'react';

import { requestWeather } from '../../actions/weatherAPI';
import { AiOutlineEnter, AiOutlineMenu } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { HiOutlineTrash } from 'react-icons/hi';
import { AppContext, WeatherContext } from '../../App';

import './index.scss';

const Settings: React.FC = () => {
  const { cities, setCities, setActiveSettings } = React.useContext<AppContext>(WeatherContext);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [currentItem, setCurrentItem] = React.useState<string>(null);
  const [warning, setWarning] = React.useState<boolean>(false);
  const [duplicate, setDuplicate] = React.useState<boolean>(false);

  React.useEffect(() => {
    setWarning(false);
    setDuplicate(false);
  }, [inputValue]);

  React.useEffect(() => {
    localStorage.setItem('cities', cities.join(','));
  }, [cities]);

  // const addLocation = async () => {
  //   await requestWeather(inputValue)
  //     .then(() => {
  //       setCities((prev: string[]) => [...prev, inputValue]);
  //       setInputValue('');
  //     })
  //     .catch(() => {
  //       setWarning(true);
  //     });
  // };

  const addLocation = async () => {
    await requestWeather(inputValue)
      .then(() => {
        const findDuplicate = cities.find((city) => city === inputValue);
        if (findDuplicate) {
          return setDuplicate(true);
        }
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
          <input type="text" className={warning || duplicate ? 'warning' : ''} onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="Enter location" />
          <AiOutlineEnter
            onClick={() => {
              addLocation();
            }}
          />
        </div>
        {warning ? <p className="modal-warning">Location not found.</p> : ''}
        {duplicate ? <p className="modal-warning">Location already added.</p> : ''}
      </div>
      <div className="settings__close">
        <IoMdClose onClick={() => setActiveSettings((prev: boolean) => !prev)} />
      </div>
    </div>
  );
};

export default Settings;
