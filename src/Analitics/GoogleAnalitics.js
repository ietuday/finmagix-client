import ReactGA from 'react-ga'

const gaId = "UA-201772883-1"
const debug = "Y"

const InitiallizeGoogleAnalytics = () => {
  ReactGA.initialize(gaId, { debug: debug === 'Y' })
}

const SendEventToGA = eventData => {
  ReactGA.event({
    ...eventData,
    value: 0
  })
}

// checked if pathname is blank after removing default / if is blank then sent login route
const SendPageViewToGA = pathName => {
  const windowLocation = pathName.replace('/', '') || 'login'
  ReactGA.pageview(windowLocation)
}

export { InitiallizeGoogleAnalytics, SendPageViewToGA, SendEventToGA }
