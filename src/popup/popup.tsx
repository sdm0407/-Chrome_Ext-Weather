import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard'
import { setStoredCities, getStoredCities } from '../utils/storage'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])

  const [cityInput, setCityInput] = useState<string>('')

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
  }, [])

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return
    }
    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityInput('')
    })
  }

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
  }

  return (
    <Box mx="8px" my="16px">
      <Paper>
        <Box mx="15px" my="5px">
          <InputBase
            placeholder="Add a city name"
            value={cityInput}
            onChange={(event) => setCityInput(event.target.value)}
          />
          <IconButton onClick={handleCityButtonClick}>
            <AddIcon />
          </IconButton>
        </Box>
      </Paper>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height="5px" />
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
