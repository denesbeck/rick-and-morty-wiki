import type { NextPage } from 'next'
import { Characters, Filter, Search, Layout } from 'components'
import { Center } from '@chakra-ui/react'
import { useEffect, useContext, useState } from 'react'
import FilterContext from 'contexts/filterContext'
import ReactPaginate from 'react-paginate'
import Head from 'next/head'

const Home: NextPage = () => {
    const filterContext = useContext(FilterContext)

    const [characters, setCharacters] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        return () => {
            filterContext.dispatch({ type: 'RESET' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetchCharacters()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    useEffect(() => {
        fetchCharacters()
        setCurrentPage(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterContext.state.searchString, filterContext.state.status, filterContext.state.species, filterContext.state.gender])

    const fetchCharacters = async () => {
        const url =
            `https://rickandmortyapi.com/api/character/?page=${currentPage}` +
            `&name=${filterContext.state.searchString.replaceAll(' ', '+')}` +
            `&status=${filterContext.state.status}` +
            `&species=${filterContext.state.species}` +
            `&gender=${filterContext.state.gender}`

        try {
            const res = await fetch(url)
            const data = await res.json()
            setCharacters(data)
        } catch (err) {
            setCharacters({ error: err })
        }
    }

    return (
        <>
            <Head>
                <title>Rick & Morty Wiki | Characters</title>
            </Head>
            <Layout>
                <Search />
                <div className='grid w-full grid-cols-10'>
                    <div className='col-span-full mx-4 mb-12 xl:col-span-3 xl:mx-2 2xl:mx-20'>
                        <Filter />
                    </div>
                    <div className='col-span-8 col-start-2 xs:col-span-6 xs:col-start-3 lg:col-span-6 lg:col-start-3 xl:col-span-4 xl:col-start-4'>
                        <Characters characters={characters} />
                        <Center>
                            {characters && (
                                <ReactPaginate
                                    className='m-8 mt-6 flex w-full justify-center space-x-4 p-1'
                                    breakLabel='...'
                                    breakClassName='text-2xl text-gray-900 w-10 h-10 hover:bg-slate-100 hover:text-blue-500 select-none rounded-md'
                                    breakLinkClassName='inline-block w-full h-full text-center font-medium pt-0.5'
                                    nextLabel='>'
                                    nextClassName='text-2xl text-gray-900 w-10 h-10 hover:bg-slate-100 hover:text-blue-500 select-none rounded-md'
                                    nextLinkClassName='inline-block w-full h-full text-center font-medium pt-0.5'
                                    previousLabel='<'
                                    previousClassName='text-2xl text-gray-900 w-10 h-10 hover:bg-slate-100 hover:text-blue-500 select-none rounded-md'
                                    previousLinkClassName='inline-block w-full h-full text-center font-medium pt-0.5'
                                    activeClassName='ring-2 ring-blue-300 rounded-md'
                                    activeLinkClassName=''
                                    pageClassName='text-gray-900 w-10 h-10 hover:bg-slate-100 hover:text-blue-500 select-none rounded-md font-medium'
                                    pageLinkClassName='inline-block w-full h-full text-center pt-2'
                                    onPageChange={(e) => {
                                        setCurrentPage(e.selected + 1)
                                    }}
                                    pageRangeDisplayed={2}
                                    marginPagesDisplayed={2}
                                    pageCount={characters?.info?.pages}
                                    renderOnZeroPageCount={null}
                                />
                            )}
                        </Center>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Home
