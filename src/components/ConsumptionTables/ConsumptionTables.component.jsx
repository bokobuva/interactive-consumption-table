import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PLAYER from "../../consts/playerConst";
import PRODUCT from "../../consts/productConst";
import { GlobalContext } from "../../context/GlobalContext";
import { createAppRoute } from "../../utils/createAppRoute";
import newGUID from "../../utils/newGUID";
import Autocomplete from "../common/Autocomplete/Autocomplete.component";
import InputField from "../common/InputField/InputField.component";
import Button from '../common/Button/Button.component';
import './ConsumptionTables.css';

const ConsumptionTables = () => {
    const {consumptionTablesState, consumptionTablesDispatch, newConsumptionTableState, newConsumptionTableDispatch} = useContext(GlobalContext);

    const handleNameChange = (tableName) => {
        newConsumptionTableDispatch({type: 'name', payload: tableName});
    }

    const addNewPlayer = (playerName) => {
        const newPlayer = {...PLAYER, name: playerName, id: newGUID('player')};
        newConsumptionTableDispatch({ type: 'players', payload: [...newConsumptionTableState?.players, newPlayer] });
    };

    const removePlayer = (playerId) => {
        let playerToBeRemovedIndex = -1;
        newConsumptionTableState.players.forEach((player, index)=> {
            if (player.id === playerId) {
                playerToBeRemovedIndex = index;
            }
        });
        if (playerToBeRemovedIndex > -1) {
            const modifiedPlayers = [...newConsumptionTableState.players];
            modifiedPlayers.splice(playerToBeRemovedIndex, 1)
            newConsumptionTableDispatch({ type: 'players', payload: modifiedPlayers });
        }
    }

    const removeProduct = (productId) => {
        let productToBeRemovedIndex = -1;
        newConsumptionTableState.products.forEach((product, index)=> {
            if (product.id === productId) {
                productToBeRemovedIndex = index;
            }
        });
        if (productToBeRemovedIndex > -1) {
            const modifiedProducts = [...newConsumptionTableState.products];
            modifiedProducts.splice(productToBeRemovedIndex, 1)
            newConsumptionTableDispatch({ type: 'products', payload: modifiedProducts });
        }
    }
    
    const addNewProduct = (productName) => {
        const newProduct = {...PRODUCT, name: productName, id: newGUID('product')};
        newConsumptionTableDispatch({ type: 'products', payload: [...newConsumptionTableState.products, newProduct] });
    }
    
    const createNewConsumptionTable = () => {
        consumptionTablesDispatch({ type: 'addConsumptionTable', payload: newConsumptionTableState});
    }

    useEffect(()=>{
        newConsumptionTableDispatch({type: 'id', payload: newGUID()});
    }, [newConsumptionTableDispatch]);

    return (
        <main className="consumption-tables-container">
            <section className='tables-and-new-table-container'>
                {
                    consumptionTablesState?.length > 0 &&
                    <ul className="tables">
                        {consumptionTablesState.map(table=> (
                            <li key={table.id}>
                                <Link key={table.id} to={createAppRoute('consumptionTable', {CONSUMPTION_TABLE_ID: table.id})}>{table.name}</Link>
                            </li>
                        ))}
                    </ul>
                }
                {
                    (newConsumptionTableState.players?.length > 0 || newConsumptionTableState.products?.length > 0) &&
                    <div className="players-and-products-container">
                        {
                            newConsumptionTableState.players?.length > 0 &&
                            <>
                                <h5>Added players</h5>
                                <ul>
                                    {newConsumptionTableState.players.map(player=> <li key={player.id}>{player.name}<span onClick={()=> removePlayer(player.id)} className="delete-button"><span></span><span></span></span></li>)}
                                </ul>
                            </>
                        }
                        {
                            newConsumptionTableState.products?.length > 0 &&
                            
                            <>
                                <h5>Added products</h5>
                                <ul>
                                    {newConsumptionTableState.products.map(product=> <li key={product.id}>{product.name}<span onClick={()=> removeProduct(product.id)} className="delete-button"><span></span><span></span></span></li>)}
                                </ul>
                            </>
                        }
                    </div>
                }
            </section>
            <form className='new-table-form'>
                <InputField label='Table Name' type='text' onChange={handleNameChange}/>
                <Autocomplete suggestions={['birde', 'brane', 'kjanzo']} onChange={addNewPlayer} label='Add Player' className={'player'}/>
                <Autocomplete suggestions={['coca cola', 'voda', 'cips']} onChange={addNewProduct} label='Add Product'/>
                <Button text={'Create New Table'} variation='link' onClick={()=> createNewConsumptionTable()} to={createAppRoute('consumptionTable', {CONSUMPTION_TABLE_ID: newConsumptionTableState.id})}/>
            </form>
        </main>
    );
}
 
export default ConsumptionTables;