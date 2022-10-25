import React, { useRef, Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { GlobalContext } from '../../context/GlobalContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import { addTakenProduct, handleAddPlayer, handleAddProduct, handleClickOnTakenProduct } from '../../utils/consumptionTableUtils';
import './ConsumptionTable.css';

const ConsumptionTable = () => {
    const { newConsumptionTableState, newConsumptionTableDispatch, consumptionTablesState, consumptionTablesDispatch, newGUID } = useContext(GlobalContext);
    const {consumptionTableId} = useParams();
    const newPlayerNameInputRef = useRef(null);
    const addProductNameInputRef = useRef(null);
    const isTouchScreen = useMediaQuery('(min-width: 768px)');
    const currentTable = consumptionTablesState.find(table => consumptionTableId === table.id);

    useEffect(()=> {
      if (newConsumptionTableState.id !== '') {
        newConsumptionTableDispatch({ type: 'reset' });
      }
      //eslint-disable-next-line
    }, []);

  
    return (
      <div className="App">
        <input ref={newPlayerNameInputRef} type='text' />
        <button onClick={() => handleAddPlayer(newPlayerNameInputRef, newGUID('player'), consumptionTablesState.players, consumptionTablesDispatch)}>Add Player</button>
        <input ref={addProductNameInputRef} type='text' />
        <button onClick={() => handleAddProduct(addProductNameInputRef, newGUID('product'), consumptionTablesState.products, consumptionTablesDispatch)}>Add Product</button>
        <table>
          <thead>
            <tr>
  
              <th></th>
              {consumptionTablesState.products?.length > 0 && consumptionTablesState.products.map((product) => (
                <th key={product.id}>{product.name.split('').map((letter, index)=> <Fragment key={`${index}-${letter}`}>{letter}<br/></Fragment>)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTable?.players?.length > 0 && currentTable?.players.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                {currentTable?.products.length > 0 && currentTable?.products.map((product) => {
                  const takenProduct = player.productsTaken.find((takenProduct) => takenProduct.productId === product.id);
                  return (
                  player.productsTaken.length > 0 && takenProduct
                  ? <td
                      key={product.id+player.id}
                      onTouchStart={()=> !isTouchScreen && consumptionTablesDispatch({ type: 'timeOnClick', payload: { tableId: currentTable.id, timeOnClick: new Date().getTime() }})}
                      onMouseDown={()=> isTouchScreen && consumptionTablesDispatch({ type: 'timeOnClick', payload: { tableId: currentTable.id, timeOnClick: new Date().getTime() } })}
                      onTouchEnd={()=> !isTouchScreen && [console.log('touch end'), handleClickOnTakenProduct(currentTable.id, currentTable?.players, player.id, product.id, currentTable.timeOnClick.timeOnClick, new Date().getTime(), consumptionTablesDispatch)]}
                      onMouseUp={()=> isTouchScreen && [console.log('mouse up'), handleClickOnTakenProduct(currentTable.id, currentTable?.players, player.id, product.id, currentTable.timeOnClick.timeOnClick, new Date().getTime(), consumptionTablesDispatch)]}
                    >
                      {takenProduct.quantity}
                    </td>
                  : <td key={product.id+player.id} onClick={()=> addTakenProduct(currentTable.id, currentTable?.players, player.id, product.id, consumptionTablesDispatch)}></td>
                )})}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ConsumptionTable;
  