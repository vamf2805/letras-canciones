import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import axios from 'axios'
import Cancion from "./components/Cancion";
import Artista from "./components/Artista";



function App() {
  const [busquedaLetra, guardarBusquedaLetra] = useState({})
  const [letra, guardarLetra] = useState('')
  const [artista, guardarArtista] = useState({})


  useEffect(()=>{
    if(Object.keys(busquedaLetra).length ===0) return

    const consultarApiLetra = async () =>{

      const {artista, cancion} = busquedaLetra
      const url =`https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`

      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ])

      guardarLetra(letra.data.lyrics)
      guardarArtista(informacion.data.artists[0])

      //const resultado = await axios.get(url)

      //console.log(resultado.data.lyrics)
      //guardarLetra(resultado.data.lyrics)
    }
    consultarApiLetra()


  },[busquedaLetra, artista])


  return (
    <div>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Cancion letra={letra}/>
          </div>
          <div className="col-md-6">
            <Artista artista={artista}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
