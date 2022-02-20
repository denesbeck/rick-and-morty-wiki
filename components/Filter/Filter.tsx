import { Accordion, VStack, Button, Center, Stack } from '@chakra-ui/react'
import { FilterItem } from '..'
import FilterContext from '../../contexts/FilterContext'
import { useContext } from 'react'

function Filter() {
    const statuses = ['Alive', 'Dead', 'Unknown']
    const species = [
        'Human',
        'Alien',
        'Humanoid',
        'Poopybutthole',
        'Mythological',
        'Unknown',
        'Animal',
        'Disease',
        'Robot',
        'Cronenberg',
        'Planet',
    ]
    const genders = ['Female', 'Male', 'Genderless', 'Unknown']

    const filterContext = useContext(FilterContext)

    return (
        <Center>
            <VStack
                className='w-11/12 shadow-sm xs:w-4/6 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-4/5'
                border={'1px'}
                borderColor={'gray.200'}
                p={'2rem'}
                rounded={'md'}
                bgColor={'white'}
            >
                <Center className='mb-6 xl:mb-12'>
                    <Stack>
                        <Center>
                            <div className='text-2xl'>Filters</div>
                        </Center>
                        <Button
                            colorScheme='gray'
                            variant={'outline'}
                            size={'sm'}
                            onClick={() => filterContext.dispatch({ type: 'RESET' })}
                        >
                            Clear Filters
                        </Button>
                    </Stack>
                </Center>
                <Accordion allowToggle w={'full'}>
                    <FilterItem
                        title={'Status'}
                        data={statuses}
                        handler={(e: any) => filterContext.dispatch({ type: 'STATUS', payload: e.target.value })}
                    />
                    <FilterItem
                        title={'Species'}
                        data={species}
                        handler={(e: any) => filterContext.dispatch({ type: 'SPECIES', payload: e.target.value })}
                    />
                    <FilterItem
                        title={'Gender'}
                        data={genders}
                        handler={(e: any) => filterContext.dispatch({ type: 'GENDER', payload: e.target.value })}
                    />
                </Accordion>
            </VStack>
        </Center>
    )
}

export default Filter
