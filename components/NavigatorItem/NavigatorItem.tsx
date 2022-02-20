import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavigatorItemProps {
    path: string
    label: string
}

function NavigatorItem({ path, label }: NavigatorItemProps) {
    const router = useRouter()

    return (
        <>
            <div className='hidden md:block'>
                <Link href={path}>
                    <a
                        className={`text-xl font-bold ${
                            router.pathname.slice(0, -4) === path.slice(0, -1)
                                ? 'text-blue-400 hover:text-blue-300'
                                : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        {label}
                    </a>
                </Link>
            </div>
            <div className='block w-full md:hidden'>
                <Link href={path}>
                    <a className='block w-full'>{label}</a>
                </Link>
            </div>
        </>
    )
}

export default NavigatorItem
