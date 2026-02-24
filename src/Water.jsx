import { useState } from 'react';
import mdi0 from './assets/mdi0.png';
import mdi1 from './assets/mdi1.png';
import mdi2 from './assets/mdi2.png';
import Render from './components/Render';
import './Water.css'; // Crearemos este archivo CSS

const Water = ({ C }) => {
  const [isCelcius, setCelcius] = useState(true);
  const [estadodia, setDias] = useState(false);

  const changeUnithandle = (temp) => {
    if (isCelcius) {
      const celsiusTemp = (temp - 273.15).toFixed(1);
      return celsiusTemp + "°C";
    } else {
      const faren = (((temp - 273.15) * 9 / 5) + 32).toFixed(1);
      return faren + "°F";
    }
  }

  const handleUnit = () => {
    setCelcius(!isCelcius);
  }

  const dianoche = () => {
    setDias(!estadodia)
  }

  return (
    <div className={`app-container ${estadodia ? 'dark-mode' : 'light-mode'}`}>
      <section className="weather-card">
        {/* Botón de modo día/noche con estilo neumorphy */}
        <button 
          className={`theme-toggle ${estadodia ? 'neumorph-dark' : 'neumorph-light'}`} 
          onClick={dianoche}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
            {estadodia ? (
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            ) : (
              <circle cx="8" cy="8" r="8" />
            )}
          </svg>
          <span>{estadodia ? 'Modo Claro' : 'Modo Oscuro'}</span>
        </button>

        {/* Ciudad y país con estilo glass */}
        <div className="location glass-effect">
          <h2>{C.name}, {C.sys.country}</h2>
        </div>

        <div className="weather-grid">
          {/* Tarjeta principal de temperatura con estilo neumorphy */}
          <article className={`main-weather-card ${estadodia ? 'neumorph-dark' : 'neumorph-light'}`}>
            <h3 className="weather-description">{C.weather[0].description}</h3>
            <div className="temperature-display">
              <span className="temperature-value">{changeUnithandle(C.main.temp)}</span>
              <picture className="weather-icon">
                <img 
                  src={`https://openweathermap.org/img/wn/${C.weather[0].icon}@4x.png`} 
                  alt={C.weather[0].description}
                />
              </picture>
            </div>
          </article>

          {/* Tarjetas de datos con estilo glass */}
          <article className="stats-grid glass-effect">
            <Render 
              icon={mdi0} 
              value="m/s" 
              unit={C.wind.speed} 
              label="Viento"
              className="stat-card"
            />
            <Render 
              icon={mdi2} 
              value="%" 
              unit={C.main.humidity} 
              label="Humedad"
              className="stat-card"
            />
            <Render 
              icon={mdi1} 
              value="hPa" 
              unit={C.main.pressure} 
              label="Presión"
              className="stat-card"
            />
          </article>
        </div>

        {/* Botón de cambio de unidad con estilo neumorphy */}
        <button 
          className={`unit-toggle ${estadodia ? 'neumorph-dark' : 'neumorph-light'}`} 
          onClick={handleUnit}
        >
          <span>°C</span>
          <span className="toggle-divider">|</span>
          <span>°F</span>
          <span className="toggle-indicator" style={{ 
            transform: isCelcius ? 'translateX(0)' : 'translateX(28px)' 
          }}></span>
        </button>
      </section>
    </div>
  )
}

export default Water;
