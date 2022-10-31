import React, { Fragment, useCallback, useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import PLAYER from '../../consts/playerConst';
import PRODUCT from '../../consts/productConst';
import { GlobalContext } from '../../context/GlobalContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import { addTakenProduct, handleClickOnTakenProduct } from '../../utils/consumptionTableUtils';
import newGUID from '../../utils/newGUID';
import AutocompletePlayer from '../common/AutocompletePlayer/AutocompletePlayer.component';
import AutocompleteProduct from '../common/AutocompleteProduct/AutocompleteProduct.component';
import Button from '../common/Button/Button.component';
import PlayerTotalModal from '../common/PlayerTotalModal/PlayerTotalModal.component';
import './ConsumptionTable.css';

const ConsumptionTable = () => {
    const { newConsumptionTableState, newConsumptionTableDispatch, consumptionTablesState, consumptionTablesDispatch, setCurrentTableId } = useContext(GlobalContext);
    const {consumptionTableId} = useParams();
    const isTouchScreen = useMediaQuery('(min-width: 850px)');
    const currentTable = consumptionTablesState.find(table => consumptionTableId === table.id);
    const [playerTotal, setPlayerTotal] = useState();
    const addPlayerModalRef = useRef();
    const addProductModalRef = useRef();
    const playerTotalRef = useRef();

    useEffect(()=> {
      if (newConsumptionTableState.id !== '') {
        newConsumptionTableDispatch({ type: 'reset' });
      }

      //eslint-disable-next-line
    }, []);

    useEffect(()=> {
      consumptionTableId && localStorage.setItem('lastVisitedTable', consumptionTableId);
    }, [consumptionTableId])
    
    useEffect(()=>{
      currentTable?.id && setCurrentTableId(currentTable.id)
    }, [currentTable, setCurrentTableId]);

    const handleAddPlayer = useCallback((playerName) => {
      const newPlayer = {...PLAYER, id: newGUID('player'), name: playerName};
      
      const modifiedTable = {...currentTable, players: [...currentTable.players, newPlayer]};
      
      const modifiedTables = consumptionTablesState.map((table)=> table.id === modifiedTable.id ? modifiedTable : table);

      consumptionTablesDispatch({type: 'setConsumptionTables',payload: modifiedTables});
    }, [consumptionTablesDispatch, currentTable, consumptionTablesState])

    const handleAddProduct = useCallback((productName, productPrice) => {
      const newProduct = {...PRODUCT, id: newGUID('product'), name: productName, price: productPrice};

      const modifiedTable = {...currentTable, products: [...currentTable.products, newProduct]};

      const modifiedTables = consumptionTablesState.map((table)=> table.id === modifiedTable.id ? modifiedTable : table);

      consumptionTablesDispatch({type: 'setConsumptionTables',payload: modifiedTables});
    }, [consumptionTablesDispatch, consumptionTablesState, currentTable]);

    useEffect(()=> {
      typeof playerTotal !== typeof undefined && playerTotalRef.current.showModal();
    }, [playerTotal])

  
    return (
      <main>
        <table>
          <thead>
            <tr>
  
              <th></th>
              {currentTable?.products?.length > 0 && currentTable.products.map((product) => (
                <th key={product.id}>{product.name.split('').map((letter, index)=> <Fragment key={`${index}-${letter}`}>{letter}<br/></Fragment>)}</th>
              ))}
              <th><Button text='Add product' variation='button' onClick={()=> addProductModalRef.current.showModal()}/></th>
            </tr>
          </thead>
          <tbody>
            {currentTable?.players?.length > 0 && currentTable?.players.map((player) => (
              <tr key={player.id}>
                <td onClick={()=> setPlayerTotal(player)}>{player.name}</td>
                {currentTable?.products.length > 0 && currentTable?.products.map((product) => {
                  const takenProduct = player.productsTaken.find((takenProduct) => takenProduct.productId === product.id);
                  return (
                  player.productsTaken.length > 0 && takenProduct
                  ? <td
                      key={product.id+player.id}
                      onTouchStart={()=> !isTouchScreen && consumptionTablesDispatch({ type: 'timeOnClick', payload: { tableId: currentTable.id, timeOnClick: new Date().getTime() }})}
                      onMouseDown={()=> isTouchScreen && consumptionTablesDispatch({ type: 'timeOnClick', payload: { tableId: currentTable.id, timeOnClick: new Date().getTime() } })}
                      onTouchEnd={()=> !isTouchScreen && handleClickOnTakenProduct(currentTable.id, currentTable?.players, player.id, product.id, product.name, product.price, currentTable.timeOnClick.timeOnClick, new Date().getTime(), consumptionTablesDispatch)}
                      onMouseUp={()=> isTouchScreen && handleClickOnTakenProduct(currentTable.id, currentTable?.players, player.id, product.id, product.name, product.price, currentTable.timeOnClick.timeOnClick, new Date().getTime(), consumptionTablesDispatch)}
                    >
                      {takenProduct.quantity}
                    </td>
                  : <td key={product.id+player.id} onClick={()=> addTakenProduct(currentTable.id, currentTable?.players, player.id, product.id, product.name, product.price, consumptionTablesDispatch)}></td>
                )})}
              </tr>
            ))}
            <tr><td><Button variation='button' text='Add player' onClick={()=> addPlayerModalRef.current.showModal()}/></td></tr>
          </tbody>
        </table>
        <dialog className='addPlayerModal' ref={addPlayerModalRef}>
          <h4>Add player</h4>
          <AutocompletePlayer onChange={handleAddPlayer}/>
          <Button text='X' onClick={()=> addPlayerModalRef.current.close()} variation='button'/>
        </dialog>
        <dialog className='addProductModal' ref={addProductModalRef}>
          <h4>Add product</h4>
          <AutocompleteProduct addProduct={handleAddProduct}/>
          <Button text='X' onClick={()=> addProductModalRef.current.close()} variation='button'/>
        </dialog>
        <PlayerTotalModal ref={playerTotalRef} player={playerTotal}/>
      </main>
    );
  }
  
  export default ConsumptionTable;
  