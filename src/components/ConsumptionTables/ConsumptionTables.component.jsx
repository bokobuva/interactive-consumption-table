import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { createAppRoute } from "../../utils/createAppRoute";
import './ConsumptionTables.css';
import { icon } from "../../Static/Icons/x";

const ConsumptionTables = () => {
    const {consumptionTablesState, consumptionTablesDispatch, setActiveIndex } = useContext(GlobalContext);


    const removeConsumptionTable = (tableId) => {
        let tableIndex = null;
        const modifiedTables = [...consumptionTablesState];
        consumptionTablesState.forEach((table, index) => {
            if (tableId === table.id ) {
                tableIndex = index
            }
        });
        modifiedTables.splice(tableIndex, 1);
        consumptionTablesDispatch({ type: 'setConsumptionTables', payload: modifiedTables });
    }

    return (
        <main className="consumption-tables-container">
            <section className='tables-container'>
                {
                    consumptionTablesState?.length > 0 ?
                    <ul className="tables">
                        <li><h4>Saved tables:</h4></li>
                        {consumptionTablesState.map(table=> (
                            <li key={table.id}>
                                <Link key={table.id} to={createAppRoute('consumptionTable', {CONSUMPTION_TABLE_ID: table.id})} onClick={()=> [setActiveIndex(2), localStorage.setItem('activeIndex', 2)]}>{table.name}</Link>
                                <button onClick={()=> removeConsumptionTable(table.id)}>{icon}</button>
                            </li>
                        ))}
                    </ul> :
                    <h4>You don't have any tables, click on the plus icon in the navigation to create one.</h4>
                }
            </section>
            
        </main>
    );
}
 
export default ConsumptionTables;