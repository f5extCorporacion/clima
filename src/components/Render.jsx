/*
Recibimos pros de icon , valur, init , para renderizar en componente */
const Render = ({icon , value ,unit}) => {
  return (
    <div>
        {/*colocamos logica para mostrar las variables que recibimos  */}
        <div className='flex gap-2 items-center '>
            <img src={icon} alt="" /> 
            <span> {unit} {value}  </span>
        </div>
                  
    </div>
  )
}
export default Render