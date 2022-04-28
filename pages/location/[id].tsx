import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { LocationSchema } from 'interfaces/global'
import { Header, Navigator, Characters } from 'components'
import { VStack, Select } from '@chakra-ui/react'
import { useState, useEffect, ChangeEvent } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
    location: LocationSchema
    locationIds: number[]
}

const Location: NextPage<Props> = ({ location, locationIds }) => {
    const [characters, setCharacters] = useState(null)
    const [info, setInfo] = useState({ name: '', dimension: '', type: '' })

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        fetchCharacters()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const fetchCharacters = async () => {
        try {
            setInfo({ name: location.name, dimension: location.dimension, type: location.type })
            const characterList = await Promise.all(
                location.residents.map(async (characterURL: string) => {
                    const res = await fetch(characterURL)
                    return res.json()
                })
            )
            setCharacters({ results: characterList })
        } catch (err) {
            setCharacters({ error: err })
        }
    }

    return (
        <>
            <Head>
                <title>Rick & Morty Wiki | Locations</title>
            </Head>
            <VStack spacing={'2rem'}>
                <Navigator />
                <Header name={info.name} dimension={info.dimension} type={info.type} />
                <div className='flex w-screen flex-col items-center justify-center gap-6 px-10 pb-10 2xl:flex-row 2xl:items-start'>
                    <VStack>
                        <div className='mb-4 text-2xl'>Pick Location</div>
                        <Select
                            onChange={(e: ChangeEvent) => {
                                router.push(
                                    `/location/${
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
                            {locationIds.map((locationId) => {
                                return (
                                    <option
                                        key={locationId}
                                        value={locationId}
                                        selected={id.toString() === locationId.toString()}
                                    >
                                        {`Location - ${locationId.toString().padStart(2, '0')}`}
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
    const res = await fetch('https://rickandmortyapi.com/api/location/')
    const data = await res.json()
    const paths = Array.from({ length: data.info.count }, (_, i) => i + 1).map((locationId) => {
        return {
            params: { id: `${locationId}` },
        }
    })

    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { params } = context
    const locations = await fetch('https://rickandmortyapi.com/api/location/').then((locationsResult) => locationsResult.json())
    const locationIds = Array.from({ length: locations.info.count }, (_, i) => i + 1).map((id) => id)
    const res = await fetch(`https://rickandmortyapi.com/api/location/${params.id}`)
    const location = await res.json()

    return {
        props: {
            location,
            locationIds,
        },
    }
}

export default Location
