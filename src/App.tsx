import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Input } from '@mui/material';
import axios from 'axios';
import SpinnerComponent from './components/Spinner';

//apikey: df902cda551715e4e6122f24bf321640

function App() {
    const [count, setCount] = useState<number>(0)

    const city = "Buenos Aires"

    const getWheater = async () => { 
      try {
        const {data, status} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        console.log(data, status)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => { 
      getWheater()
    }, [])

  return (
    <>
        <div>
        <h1>Hola, Material-UI en React con TypeScript</h1>
        <Button variant="contained" color="primary">
          Botón de Material UI
        </Button>
        <Input />
        <SpinnerComponent/>
    </div>
    </>
  )
}

export default App
