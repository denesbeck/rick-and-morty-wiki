import { Navigator, Header } from 'components'
import { VStack } from '@chakra-ui/react'

function Layout({ children }) {
    return (
        <VStack spacing={'2rem'}>
            <Navigator />
            <Header />
            {children}
        </VStack>
    )
}

export default Layout
