import { createContext, useEffect, useReducer } from "react";
import NEW_CONSUMPTION_TABLE from "../consts/newConsumptionTable";
import consumptionTablesReducer from "../reducers/consumptionTablesReducer";
import newConsumptionTableReducer from "../reducers/newConsumptionTableReducer";

export const GlobalContext = createContext({});

const { Provider } = GlobalContext;

export const GlobalContextProvider = (props) => {
    const [consumptionTablesState, consumptionTablesDispatch] = useReducer(consumptionTablesReducer, []);
    const [newConsumptionTableState, newConsumptionTableDispatch] = useReducer(newConsumptionTableReducer, {...NEW_CONSUMPTION_TABLE});

        
    useEffect(() => {
        consumptionTablesState?.length > 0 && localStorage.setItem('consumptionTables', JSON.stringify(consumptionTablesState));
    }, [consumptionTablesState]);

    useEffect(()=>{
        if (localStorage.getItem('consumptionTables') !== null && localStorage.getItem('consumptionTables') !== '') {
            const consumptionTablesFromLocalStorage = JSON.parse(localStorage.getItem('consumptionTables'));
            consumptionTablesDispatch({ type: 'setConsumptionTables', payload: consumptionTablesFromLocalStorage });
        }

    }, []);

    const globalState = {
        consumptionTablesState,
        consumptionTablesDispatch,
        newConsumptionTableState,
        newConsumptionTableDispatch,
    }

    return (
        <Provider value={globalState}>
            {props.children}
        </Provider>
    )
}
