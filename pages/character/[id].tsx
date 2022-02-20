import Image from 'next/image'
import useRenderStatus from '../../hooks/useRenderStatus'

function Character({ data }) {
    const [renderStatus] = useRenderStatus()

    const renderDetails = (label: string, value: string) => (
        <div className='flex'>
            <div className='w-20 font-bold text-slate-800'>{label}</div>
            <div className='w-max text-slate-500'>{value}</div>
        </div>
    )

    return (
        <div className='grid h-screen items-center justify-center'>
            <div className='relative h-max w-max min-w-[18rem] py-4'>
                <Image
                    width={500}
                    height={500}
                    layout='responsive'
                    loader={() => data.image}
                    src={data.image}
                    alt='character_image'
                />
                <div className='mt-2'>
                    <div className='flex space-x-6'>
                        <div className='py-2 text-2xl font-bold text-slate-800'>{data.name}</div>
                        <div className='relative top-3'>{renderStatus(data.status)}</div>
                    </div>
                    {renderDetails('Gender:', data.gender)}
                    {renderDetails('Location:', data.location.name)}
                    {renderDetails('Origin:', data.origin.name)}
                    {renderDetails('Species:', data.species)}
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://rickandmortyapi.com/api/character/')
    const data = await res.json()
    const paths = Array.from({ length: data.info.count }, (_, i) => i + 1).map((characterId) => {
        return {
            params: { id: `${characterId}` },
        }
    })

    return { paths, fallback: false }
}

export async function getStaticProps(context) {
    const { params } = context
    const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}

export default Character
