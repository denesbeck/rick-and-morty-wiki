import type { NextPage } from 'next'
import { EpisodeSchema } from '../../interfaces/global'
import { Characters, Header, Navigator } from '../../components'
import { VStack, Select, Center } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
    episode: EpisodeSchema
    episodeIds: { id: number }[]
}

const Episode: NextPage<Props> = ({ episode, episodeIds }) => {
    const [characters, setCharacters] = useState(null)
    const [info, setInfo] = useState({ name: '', airDate: '' })

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        fetchCharacters()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const fetchCharacters = async () => {
        try {
            setInfo({ name: episode.name, airDate: episode.air_date })
            const characters = await Promise.all(
                episode.characters.map(async (characterURL: string) => {
                    const res = await fetch(characterURL)
                    const data = await res.json()
                    return data
                })
            )
            setCharacters({ results: characters })
        } catch (err) {
            setCharacters({ error: err })
        }
    }

    return (
        <VStack spacing={'2rem'}>
            <Navigator />
            <Header name={info.name} airDate={info.airDate} />
            <div className='grid w-full grid-cols-10'>
                <div className='col-span-full mx-4 mb-12 xl:col-span-3 xl:col-start-1 xl:mx-20'>
                    <Center className='mb-4 text-2xl'>Pick Episode</Center>
                    <Center>
                        <Select
                            onChange={(e) => {
                                e.target.value !== '' ? router.push(`/episode/${parseInt(e.target.value)}`) : `/episode/${1}`
                            }}
                            shadow={'sm'}
                            maxW={'22rem'}
                        >
                            {episodeIds.map((episode) => {
                                return (
                                    <option
                                        key={episode.id}
                                        value={episode.id}
                                        selected={id.toString() === episode.id.toString() ? true : false}
                                    >
                                        {`Episode - ${episode.id.toString().padStart(2, '0')}`}
                                    </option>
                                )
                            })}
                        </Select>
                    </Center>
                </div>
                <div className='col-span-8 col-start-2 pb-20 xs:col-span-6 xs:col-start-3 lg:col-span-6 lg:col-start-3 xl:col-span-4 xl:col-start-4'>
                    <Characters characters={characters} />
                </div>
            </div>
        </VStack>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://rickandmortyapi.com/api/episode/')
    const data = await res.json()
    const paths = Array.from({ length: data.info.count }, (_, i) => i + 1).map((episodeId) => {
        return {
            params: { id: `${episodeId}` },
        }
    })

    return { paths, fallback: false }
}

export async function getStaticProps(context) {
    const { params } = context
    const episodeIds = Array.from({ length: 52 }, (_, i) => i + 1).map((el) => {
        return { id: el }
    })
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${params.id}`)
    const episode = await res.json()

    return {
        props: {
            episode,
            episodeIds,
        },
    }
}

export default Episode
