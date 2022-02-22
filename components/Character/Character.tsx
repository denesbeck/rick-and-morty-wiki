import Image from 'next/image'
import useRenderStatus from 'hooks/useRenderStatus'
import { CharacterSchema } from 'interfaces/global'
import { useRouter } from 'next/router'

function Character({ character }: { character: CharacterSchema }) {
    const [renderStatus] = useRenderStatus()
    const router = useRouter()

    return (
        <div
            onClick={() => router.push(`/character/${character.id}`)}
            className='relative inline-block w-full transform cursor-pointer overflow-hidden rounded-md border-4 border-gray-200 bg-white hover:border-blue-400'
        >
            <Image
                width={500}
                height={500}
                layout='responsive'
                src={character.image}
                loader={() => character.image}
                alt='character_image'
                className='w-full'
            />
            <div className='p-4'>
                <div className='py-2 text-xl font-semibold text-gray-800'>{character.name}</div>
                <div className='pt-2'>
                    <div className='text-gray-500'>Last Location</div>
                    <div className='text-lg text-gray-800'>{character.location.name}</div>
                </div>
            </div>
            <div className='absolute top-4 right-4'>{renderStatus(character.status)}</div>
        </div>
    )
}

export default Character
