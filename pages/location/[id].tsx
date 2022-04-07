import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { LocationSchema } from 'interfaces/global'
import { Header, Navigator, Characters } from 'components'
import { VStack, Select, Center } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
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
                <div className='grid w-full grid-cols-10'>
                    <div className='col-span-full mx-4 mb-12 xl:col-span-3 xl:col-start-1 xl:mx-20'>
                        <Center className='mb-4 text-2xl'>Pick Location</Center>
                        <Center>
                            <Select
                                onChange={(e) => {
                                    router.push(`/location/${e.target.value.length ? parseInt(e.target.value) : 1}`)
                                }}
                                shadow={'sm'}
                                maxW={'22rem'}
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
                        </Center>
                    </div>
                    <div className='col-span-8 col-start-2 pb-20 xs:col-span-6 xs:col-start-3 lg:col-span-6 lg:col-start-3 xl:col-span-4 xl:col-start-4'>
                        <Characters characters={characters} />
                    </div>
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
