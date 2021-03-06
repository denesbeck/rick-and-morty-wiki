import { Input, Center, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import FilterContext from 'contexts/filterContext'
import { useContext } from 'react'

function Search() {
    const filterContext = useContext(FilterContext)
    return (
        <Center className='mx-8 flex w-[80%] max-w-xl shadow-sm'>
            <InputGroup>
                <Input
                    value={filterContext.state.searchString}
                    variant='outline'
                    placeholder='Enter character name...'
                    onChange={(e) => filterContext.dispatch({ type: 'SEARCH_STRING', payload: e.target.value })}
                    roundedRight={'none'}
                    bgColor={'white'}
                />
                <InputRightAddon>
                    <SearchIcon />
                </InputRightAddon>
            </InputGroup>
        </Center>
    )
}

export default Search
