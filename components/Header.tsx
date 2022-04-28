import { useRouter } from 'next/router'
import { Center, VStack } from '@chakra-ui/react'

interface HeaderProps {
    name?: string
    airDate?: string
    dimension?: string
    type?: string
}

function Header({ name, airDate, dimension, type }: HeaderProps) {
    const router = useRouter()
    const title = () => {
        switch (router.pathname) {
            case '/':
                return 'Characters'
            case '/episode/[id]':
                return 'Episode:'
            case '/location/[id]':
                return 'Location:'
        }
    }

    return (
        <Center>
            <VStack>
                <header className='text-center text-3xl lg:text-5xl'>
                    {title()} <span className='text-blue-500'>{name}</span>
                </header>
                {router.pathname === '/episode/[id]' ? <header className='xs:text-xl'>Air Date: {airDate}</header> : null}
                {router.pathname === '/location/[id]' ? <header className='xs:text-xl'>Dimension: {dimension}</header> : null}
                {router.pathname === '/location/[id]' ? <header className='xs:text-xl'>Type: {type}</header> : null}
            </VStack>{' '}
        </Center>
    )
}

export default Header
