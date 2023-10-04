import { useEffect, useState } from 'react'
import Water from './Water'
import './index.css';
import axios from 'axios';
import { data } from 'autoprefixer';
import Vector from'./assets/Vector.png';
//geolocation utulizamos un efecto


function App() {
  /* Handle que ejecuta la function sucess 
  -coords.latitude
  */
 /* variable | functuin = estado en react */
 
  const [clima, setClima] = useState(null)
  const succes=(props)=>{
    
    const lat =props.coords.latitude;
    const lon =props.coords.longitude;
    const apiKey = 'c01dcb8ba44e04f168636d66563e549b';
    

   axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((data)=>{  setClima(data["data"]) })
    .catch(()=>{console.log("error app") })
  };
  

  /*todo:EL efecto solo se ejecuta despues de cargada la aplicacion */
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(succes);
  })

  return (
    
      <div className=" font-['Lato'] flex  justify-center items-center min-h-screen text-white p-2">
        
        {clima === null ? <> <img src={Vector}/> <p>Cargando</p></> : <Water C={clima}/> }
      </div>
    
  )
}

export default App
