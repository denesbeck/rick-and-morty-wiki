import { HStack, Box, Button, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import FilterContext from 'contexts/filterContext'
import { MouseEvent, useContext } from 'react'

interface FilterItemProps {
    title: string
    data: string[]
    handler: (e: MouseEvent) => void
}

function FilterItem({ title, data, handler }: FilterItemProps) {
    const filterContext = useContext(FilterContext)
    return (
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                        {title}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pt={'1rem'}>
                <HStack wrap={'wrap'} rowGap={'0.5rem'} columnGap={'0.2rem'}>
                    {data.map((value: string, index: number) => {
                        return (
                            <Button
                                className='transition duration-300 ease-in-out'
                                key={index}
                                value={value}
                                variant={filterContext.state[title.toLowerCase()] === value ? 'solid' : 'outline'}
                                colorScheme={'blue'}
                                size={'sm'}
                                onClick={(e) => handler(e)}
                            >
                                {value}
                            </Button>
                        )
                    })}
                </HStack>
            </AccordionPanel>
        </AccordionItem>
    )
}

export default FilterItem
