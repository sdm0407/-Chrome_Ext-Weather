import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'

import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
  city: string
  onDelete?: () => void
}> = ({ city, onDelete }) => {
  const [WeatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [CardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch((err) => setCardState('error'))
  }, [city])

  if (CardState == 'loading' || CardState == 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {CardState == 'loading'
            ? 'Loading...'
            : 'Error: could not retrieve weather data for the city'}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5">{WeatherData.name}</Typography>
      <Typography variant="body1">
        {Math.round(WeatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(WeatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
