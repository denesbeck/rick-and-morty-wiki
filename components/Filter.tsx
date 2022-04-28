import { Accordion, VStack, Button, Center, Stack } from '@chakra-ui/react'
import { FilterItem } from 'components'
import FilterContext from 'contexts/filterContext'
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
        <Center className='w-full max-w-[25rem]'>
            <VStack
                className='shadow-sm'
                border={'1px'}
                borderColor={'gray.200'}
                p={'2rem'}
                rounded={'md'}
                bgColor={'white'}
                w={'full'}
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
