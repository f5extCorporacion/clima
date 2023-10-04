import { useState } from 'react';
import mdi0 from'./assets/mdi0.png';
import mdi1 from'./assets/mdi1.png';
import mdi2 from'./assets/mdi2.png';
import Render from './components/Render';

const Water = ({C}) => {
  /*
  Todo: proiedad recibe  los datos para poder renderizar la api */
   const [isCelcius, setCelcius] = useState(true);//Estado de  temperatura booleam
   const [estadodia , setDias]= useState(false)

   const changeUnithandle = (temp)=>{
    /*calculo de  temperatura  */

    if(isCelcius){
      const celsiusTemp = (temp - 273.15).toFixed(1);
      return celsiusTemp+" °C"
    } else {
       const faren = (((temp -273.15 ) * 9/5) + 32).toFixed(1)
       return faren+" °F";
      }
   }
 const handleUnit=()=>{
   setCelcius(!isCelcius);
 }

/*Enviamos los datos a la funcion */
console.log( changeUnithandle(C.main.temp))

const dia="body{background:#202020}";

const dianoche =()=>{
  setDias(!estadodia)
 
}

/* tiempo 50 video 2 
className='text-center gap-5 grid'
*/
console.log(C)
  return (
    
    <section style={{ background: estadodia? '#202020':'',
      borderRadius:30,padding:10 }} >
      <div className='text-center gap-5 grid'>
          <div className=' grid'>

          <button className='dianoche flex justify-center flex-wrap' onClick={dianoche}>  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
        </svg>Claro  |  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/> 
</svg> Oscuro</button>
        </div>

          {/* titulo clima*/}
            <h3>{C.name} , {C.sys.country}</h3>

            <div className="principal gap-5 grid sm:grid-cols-[1fr_auto] ">
                    {/*seccion superior */}
                    <article className='bg-slate-500/50 rounded-2xl grid grid-cols-2 items-center p-3'>
                          <h4 className='col-span-2 text-lg capitalize'>{C.weather[0].description} </h4>
                          <span className='text-4xl'>{changeUnithandle(C.main.temp)} </span>
                          <picture>
                              <img src={`https://openweathermap.org/img/wn/${C.weather[0].icon}@2x.png`} alt="" />
                          </picture>
                          
                    </article>

                    {/*seccion  Datos de | humedad,| presion,| viento */}
                    <article className=' grid grid-cols-3 justify-items-center bg-slate-500/50
                    rounded-2xl
                    p-3 sm:grid-cols-1'>
                      <Render icon={mdi0} value="m/s" unit={C.wind.speed} />
                      <Render icon={mdi2} value="%" unit={C.main.humidity} /> 
                      <Render icon={mdi1} value="hPa" unit={C.main.pressure} />
                  </article>
          </div>
            <button onClick={handleUnit}> C / F</button>
        </div>
    </section>
  )
}
export default Water  