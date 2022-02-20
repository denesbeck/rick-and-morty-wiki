import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useReducer } from 'react'
import FilterContext from '../contexts/FilterContext'
import { reducer, initialState } from '../reducers/FilterReducer'

function MyApp({ Component, pageProps }: AppProps) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <ChakraProvider>
            <FilterContext.Provider value={{ state: state, dispatch: dispatch }}>
                <Component {...pageProps} />
            </FilterContext.Provider>
        </ChakraProvider>
    )
}

export default MyApp
