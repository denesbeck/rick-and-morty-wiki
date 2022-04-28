import { Character, ErrorPage } from 'components'
import { Spinner, Center } from '@chakra-ui/react'
import { CharacterSchema } from 'interfaces/global'

// eslint-disable-next-line react/display-name
function Characters({ characters }: { characters: { results: CharacterSchema[]; error: string } }) {
    if (characters?.error) return <ErrorPage title='Something went wrong!' description='No match was found.' />
    if (!characters)
        return (
            <Center className='min-h-full'>
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
            </Center>
        )
    return (
        <div className='flex w-full flex-wrap justify-center gap-6'>
            {characters.results.map((character: any, index: number) => (
                <Character key={index} character={character} />
            ))}
        </div>
    )
}

export default Characters
