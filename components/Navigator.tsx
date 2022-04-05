import { Center, Menu, MenuButton, MenuList, MenuItem, IconButton, Spacer } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import FilterContext from 'contexts/filterContext'
import { useContext } from 'react'
import { NavigatorItem } from 'components'

interface NavigatorProps {
    resetCurrentPage?: () => void
}

function Navigator({ resetCurrentPage }: NavigatorProps) {
    const filterContext = useContext(FilterContext)
    return (
        <Center className='flex w-full bg-gray-900 py-4'>
            <Link href='/'>
                <a
                    onClick={() => {
                        resetCurrentPage()
                        filterContext.dispatch({ type: 'RESET' })
                    }}
                    className='flex cursor-pointer space-x-2 pl-2 text-xl font-medium 2xs:pl-4 2xs:text-2xl xs:pl-12 xs:text-3xl'
                >
                    <span className='text-gray-100'>Rick & Morty</span>
                    <span className='text-blue-400'>Wiki</span>
                </a>
            </Link>
            <Spacer />
            <div className='hidden space-x-8 pr-12 md:flex'>
                <NavigatorItem path='/' label='Characters' />
                <NavigatorItem path='/episode/1' label='Episode' />
                <NavigatorItem path='/location/1' label='Location' />
            </div>
            <div className='block pr-2 2xs:pr-4 xs:pr-12 md:hidden'>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        _hover={{ bg: 'gray.700' }}
                        _expanded={{ bg: 'gray.700' }}
                        _active={{ bg: 'gray.700' }}
                        aria-label='Options'
                        icon={<HamburgerIcon />}
                        variant='outline'
                        color={'gray.200'}
                    />
                    <MenuList>
                        <MenuItem>
                            <NavigatorItem path='/' label='Characters' />
                        </MenuItem>
                        <MenuItem>
                            <NavigatorItem path='/episode/1' label='Episode' />
                        </MenuItem>
                        <MenuItem>
                            <NavigatorItem path='/location/1' label='Location' />
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Center>
    )
}

export default Navigator
