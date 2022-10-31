const consumptionTablesReducer = (state, action) => {
    switch (action.type) {
        case 'addConsumptionTable':
            return [
                ...state,
                action.payload,
            ]
        case 'setConsumptionTables':
            return action.payload
        case 'players':
            return [
                ...state.map((table)=> {
                    return table.id === action.payload.tableId ? {...table, players: action.payload.players || [] }: {...table}
                })
            ]
        case 'products':
            return [
                ...state.map((table)=> table.id === action.payload.tableId ? {...table, products: action.payload }: {...table})
            ]
        case 'timeOnClick':
            return [
                ...state.map((table)=> table.id === action.payload.tableId ? {...table, timeOnClick: action.payload } : { ...table })
            ]
        default:
            return [
                ...state,
            ]
    }
};

export default consumptionTablesReducer;
