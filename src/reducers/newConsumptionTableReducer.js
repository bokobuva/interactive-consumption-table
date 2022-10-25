import NEW_CONSUMPTION_TABLE from "../consts/newConsumptionTable";

const newConsumptionTableReducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                name: action.payload,
            };
        case 'players':
            return {
                ...state,
                players: action.payload,
            };
        case 'products':
            return {
                ...state,
                products: action.payload,
            };
        case 'id':
            return {
                ...state,
                id: action.payload,
            }
        case 'reset':
            return NEW_CONSUMPTION_TABLE
        default:
            return state
    }
};

export default newConsumptionTableReducer;
