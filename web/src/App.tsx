import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  theme as baseTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import axios from 'axios'

import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

axios.defaults.baseURL = window.location.origin
axios.defaults.timeout = 10 * 1000
// const instance = axios.create({
//   baseURL: window.location.origin,
//   timeout: 10 * 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

const extendedChakraTheme = extendTheme(
  {
    colors: {
      brand: baseTheme.colors.cyan,
    },
  },
  withDefaultColorScheme({ colorScheme: 'teal' })
)

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <ColorModeScript />
        <ChakraProvider theme={extendedChakraTheme}>
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </ChakraProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
