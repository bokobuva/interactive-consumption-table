import { useContext, useEffect, useRef } from "react";
import PLAYER from "../../consts/playerConst";
import PRODUCT from "../../consts/productConst";
import { GlobalContext } from "../../context/GlobalContext";
import { createAppRoute } from "../../utils/createAppRoute";
import newGUID from "../../utils/newGUID";
import AutocompletePlayer from "../common/AutocompletePlayer/AutocompletePlayer.component";
import AutocompleteProduct from "../common/AutocompleteProduct/AutocompleteProduct.component";
import Button from "../common/Button/Button.component";
import InputField from "../common/InputField/InputField.component";
import './CreateNewTable.css';

const CreateNewTable = () => {
    const { newConsumptionTableState, newConsumptionTableDispatch, consumptionTablesDispatch, setActiveIndex } = useContext(GlobalContext);
    const tableNameInputRef = useRef();

    const handleNameChange = () => {
        newConsumptionTableDispatch({ type: 'name', payload: tableNameInputRef.current.value });
    }

    const addNewPlayer = (playerName) => {
        const newPlayer = { ...PLAYER, name: playerName, id: newGUID('player') };
        newConsumptionTableDispatch({ type: 'players', payload: [...newConsumptionTableState?.players, newPlayer] });
    };

    const addNewProduct = (productName, productPrice) => {
        const newProduct = { ...PRODUCT, name: productName, price: parseFloat(productPrice), id: newGUID('product') };
        newConsumptionTableDispatch({ type: 'products', payload: [...newConsumptionTableState.products, newProduct] });
    }
    const removePlayer = (playerId) => {
        let playerToBeRemovedIndex = -1;
        newConsumptionTableState.players.forEach((player, index) => {
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
        newConsumptionTableState.products.forEach((product, index) => {
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

    const createNewConsumptionTable = () => {
        consumptionTablesDispatch({ type: 'addConsumptionTable', payload: newConsumptionTableState });
    }

    useEffect(() => {
        newConsumptionTableDispatch({ type: 'id', payload: newGUID() });
    }, [newConsumptionTableDispatch]);

    return (
        <main className="new-table-container">
            <section>
                {
                    (newConsumptionTableState.players?.length > 0 || newConsumptionTableState.products?.length > 0) &&
                    <div className="players-and-products-container">
                        <h3>New Table:</h3>
                        {
                            newConsumptionTableState.players?.length > 0 &&
                            <>
                                <h4>Added players:</h4>
                                <ul>
                                    {newConsumptionTableState.players.map(player => <li key={player.id}>{player.name}<span onClick={() => removePlayer(player.id)} className="delete-button"><span></span><span></span></span></li>)}
                                </ul>
                            </>
                        }
                        {
                            newConsumptionTableState.products?.length > 0 &&

                            <>
                                <h4>Added products:</h4>
                                <ul>
                                    {newConsumptionTableState.products.map(product => <li key={product.id}>{product.name}<span onClick={() => removeProduct(product.id)} className="delete-button"><span></span><span></span></span></li>)}
                                </ul>
                            </>
                        }
                    </div>
                }
            </section>
            <form className='new-table-form'>
                <InputField ref={tableNameInputRef} label='Table Name' type='text' onChange={handleNameChange} placeholder='Table Name' />
                <AutocompletePlayer onChange={addNewPlayer} className={'player'} />
                <AutocompleteProduct addProduct={addNewProduct} className={'product'} />
                <Button
                    text={'Create New Table'}
                    disabled={newConsumptionTableState.name === ''}
                    variation='link'
                    onClick={() => [createNewConsumptionTable(), setActiveIndex(2), localStorage.setItem('activeIndex', 2)]}
                    to={createAppRoute('consumptionTable', { CONSUMPTION_TABLE_ID: newConsumptionTableState.id })}
                />
            </form>
        </main>
    );
}

export default CreateNewTable;