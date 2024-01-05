import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([
    'Carmel',
    'New York',
    'Error',
  ])

  const [cityInput, setCityInput] = useState<string>('')

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return
    }
    setCities([...cities, cityInput])
    setCityInput('')
  }

  const handlecityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1)
    setCities([...cities])
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
          onDelete={() => handlecityDeleteButtonClick(index)}
        />
      ))}
      <Box height="5px" />
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
