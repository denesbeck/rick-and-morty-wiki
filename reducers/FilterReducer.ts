const initialState = {
    searchString: '',
    status: '',
    species: '',
    gender: '',
}

interface StateSchema {
    searchString: string
    status: string
    species: string
    gender: string
}

interface ActionSchema {
    type: string
    payload?: string
}

const reducer = (state: StateSchema, action: ActionSchema) => {
    switch (action.type) {
        case 'SEARCH_STRING':
            return { ...state, searchString: action.payload }
        case 'STATUS':
            return { ...state, status: action.payload }
        case 'SPECIES':
            return { ...state, species: action.payload }
        case 'GENDER':
            return { ...state, gender: action.payload }
        case 'RESET':
            return initialState
        default:
            return state
    }
}

export { initialState, reducer }
