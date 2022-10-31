import { createContext, useEffect, useLayoutEffect, useReducer, useState } from "react";
import NEW_CONSUMPTION_TABLE from "../consts/newConsumptionTable";
import consumptionTablesReducer from "../reducers/consumptionTablesReducer";
import newConsumptionTableReducer from "../reducers/newConsumptionTableReducer";

export const GlobalContext = createContext({});

const { Provider } = GlobalContext;

export const GlobalContextProvider = (props) => {
    const [consumptionTablesState, consumptionTablesDispatch] = useReducer(consumptionTablesReducer, []);
    const [newConsumptionTableState, newConsumptionTableDispatch] = useReducer(newConsumptionTableReducer, {...NEW_CONSUMPTION_TABLE});
    const [activeIndex, setActiveIndex] = useState(null);
    const [currentTableId, setCurrentTableId] = useState(0);

        
    useEffect(() => {
        consumptionTablesState?.length > 0 && localStorage.setItem('consumptionTables', JSON.stringify(consumptionTablesState));
    }, [consumptionTablesState]);

    useLayoutEffect(()=>{

        if (localStorage.getItem('consumptionTables') !== null && localStorage.getItem('consumptionTables') !== '') {
            const consumptionTablesFromLocalStorage = JSON.parse(localStorage.getItem('consumptionTables'));
            consumptionTablesDispatch({ type: 'setConsumptionTables', payload: consumptionTablesFromLocalStorage });
        }

        const lastVisitedTableIdFromLocalStorage = localStorage.getItem('lastVisitedTable');
        if (lastVisitedTableIdFromLocalStorage !== currentTableId) {

            setCurrentTableId(lastVisitedTableIdFromLocalStorage);
        }
  
        const activeIndexFromLocalStorage = localStorage.getItem('activeIndex');
        

        if (activeIndexFromLocalStorage !== null && activeIndex === null) {
            
            setActiveIndex(activeIndexFromLocalStorage);
        } else {
            activeIndex === null && setActiveIndex(1)
        }

        return ()=> localStorage.setItem('lastId', 0)
        //eslint-disable-next-line
    }, []);

    useEffect(()=> {
    }, [activeIndex])

    const globalState = {
        consumptionTablesState,
        consumptionTablesDispatch,
        newConsumptionTableState,
        newConsumptionTableDispatch,
        currentTableId,
        setCurrentTableId,
        activeIndex,
        setActiveIndex,
    }

    return (
        <Provider value={globalState}>
            {props.children}
        </Provider>
    )
}
