import type { NextPage, GetStaticPaths, GetStaticPropsContext, GetStaticProps } from 'next'
import { EpisodeSchema } from 'interfaces/global'
import { Characters, Header, Navigator } from 'components'
import { VStack, Select } from '@chakra-ui/react'
import { useState, useEffect, ChangeEvent } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
    episode: EpisodeSchema
    episodeIds: number[]
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
            const charactersList = await Promise.all(
                episode.characters.map(async (characterURL: string) => {
                    const res = await fetch(characterURL)
                    return res.json()
                })
            )
            setCharacters({ results: charactersList })
        } catch (err) {
            setCharacters({ error: err })
        }
    }

    return (
        <>
            <Head>
                <title>Rick & Morty Wiki | Episodes</title>
            </Head>
            <VStack spacing={'2rem'}>
                <Navigator />
                <Header name={info.name} airDate={info.airDate} />
                <div className='flex w-screen flex-col items-center justify-center gap-6 px-10 pb-10 2xl:flex-row 2xl:items-start'>
                    <VStack>
                        <div className='mb-4 text-2xl'>Pick Episode</div>
                        <Select
                            onChange={(e: ChangeEvent) => {
                                router.push(
                                    `/episode/${
                                        (e.target as HTMLInputElement).value.length
                                            ? parseInt((e.target as HTMLInputElement).value)
                                            : 1
                                    }`
                                )
                            }}
                            shadow={'sm'}
                            minW={'20rem'}
                            w={'full'}
                        >
                            {episodeIds.map((episodeId) => {
                                return (
                                    <option key={episodeId} value={episodeId} selected={id.toString() === episodeId.toString()}>
                                        {`Episode - ${episodeId.toString().padStart(2, '0')}`}
                                    </option>
                                )
                            })}
                        </Select>
                    </VStack>
                    <Characters characters={characters} />
                </div>
            </VStack>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/episode/')
    const data = await res.json()
    const paths = Array.from({ length: data.info.count }, (_, i) => i + 1).map((episodeId) => {
        return {
            params: { id: `${episodeId}` },
        }
    })

    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { params } = context
    const episodes = await fetch('https://rickandmortyapi.com/api/episode/').then((episodesResult) => episodesResult.json())
    const episodeIds = Array.from({ length: episodes.info.count }, (_, i) => i + 1).map((id) => id)
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
