import { Badge } from '@chakra-ui/react'

function useRenderStatus() {
    const renderStatus = (status: 'Alive' | 'Dead' | 'unknown') => {
        let colorScheme: string
        switch (status) {
            case 'Alive':
                colorScheme = 'teal'
                break
            case 'Dead':
                colorScheme = 'pink'
                break
            case 'unknown':
                colorScheme = 'gray'
                break
        }
        return (
            <Badge py={'.1rem'} px={'.5rem'} rounded={'md'} fontSize={'.9rem'} variant='solid' colorScheme={colorScheme}>
                {status}
            </Badge>
        )
    }
    return [renderStatus]
}

export default useRenderStatus
