import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core'

import {
  getWeatherIconSrc,
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from '../../utils/api'

import './WeatherCard.css'

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
              <Typography className="weatherCard-body">Delete</Typography>
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
  tempScale: OpenWeatherTempScale
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  const [WeatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [CardState, setCardState] = useState<WeatherCardState>('loading')

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch((err) => setCardState('error'))
  }, [city, tempScale])

  if (CardState == 'loading' || CardState == 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
          {CardState == 'loading'
            ? 'Loading...'
            : 'Error: could not retrieve weather data for the city'}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justify="space-around">
        <Grid item>
          <Typography className="weatherCard-title">
            {WeatherData.name}
          </Typography>
          <Typography className="weatherCard-temp">
            {Math.round(WeatherData.main.temp)}
          </Typography>
          <Typography className="weatherCard-body">
            Feels like {Math.round(WeatherData.main.feels_like)}
          </Typography>
        </Grid>

        <Grid item>
          {WeatherData.weather.length > 0 && (
            <>
              <img src={getWeatherIconSrc(WeatherData.weather[0].icon)} />
              <Typography className="weatherCard-body">
                {WeatherData.weather[0].main}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  )
}

export default WeatherCard
