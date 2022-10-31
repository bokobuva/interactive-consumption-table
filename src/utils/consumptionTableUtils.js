import PLAYER from "../consts/playerConst";
import PRODUCT from "../consts/productConst";

export const handleAddPlayer = (ref, playerId, playersData, dispatch) => {
  if (ref.current.value === '' || playersData.length > 15) return;
  const playerName = ref.current.value;
  const newPlayersData = [
    ...playersData,
    {
      ...PLAYER,
      id: playerId,
      name: playerName,
    },
  ]
  dispatch({ type: 'players', newPlayersData });
  ref.current.value = '';
};

export const handleAddProduct = (ref, productId, productsData, dispatch) => {
  if (ref.current.value === '' || productsData.length > 15) return;
  const productName = ref.current.value;
  const newProductsData = [
    ...productsData,
    {
      ...PRODUCT,
      id: productId,
      name: productName,
    }
  ]
  dispatch({ type: 'products', payload: newProductsData });
  ref.current.value = '';
};

export const addTakenProduct = (tableId, playersData, playerId, productId, productName, productPrice, dispatch) => {
  const modifiedPlayers = {
    tableId,
    players: playersData.map((player) => {
      if (player.id === playerId) {

        return {
          ...player,
          productsTaken: player.productsTaken.length > 0 && player.productsTaken.find(productTaken => productTaken.productId === productId) ?
            player.productsTaken.map((takenProduct) => {

              return (
                takenProduct.productId === productId ? { ...takenProduct, quantity: takenProduct.quantity + 1 } : { ...takenProduct }
              )
            }) :
            [...player.productsTaken, { productId, productName, productPrice, quantity: 1 }]
        }
      } else {

        return {
          ...player,
        }
      }
    })
  }
  dispatch({ type: 'players', payload: modifiedPlayers });
};

export const removeTakenProduct = (tableId, playersData, playerId, productId, dispatch) => {
  let emptyTakenProductIndexes = [];
  const modifiedPlayers = {
    tableId,
    players: playersData.map((player) => {
      if (player.id === playerId) {

        return {
          ...player,
          productsTaken: player.productsTaken.map((takenProduct) => {
            return (
              takenProduct.productId === productId ? { ...takenProduct, quantity: takenProduct.quantity - 1 } : { ...takenProduct }
            )
          })
        }
      } else {
        
        return {
          ...player,
        }
      }
    }),
  }
  
  modifiedPlayers.players.forEach((player, playerIndex)=>{
    if (player.id === playerId) {
      player.productsTaken.forEach((product, takenProductIndex)=>{
        if(product.quantity === 0){
          emptyTakenProductIndexes.push({playerIndex: playerIndex, takenProductIndex: takenProductIndex});
        }
      })
    }
  })

  console.log(emptyTakenProductIndexes)

  emptyTakenProductIndexes.forEach((emptyProduct) =>{
    modifiedPlayers.players[emptyProduct.playerIndex]?.productsTaken?.splice(parseInt(emptyProduct.takenProductIndex), 1);
  });

  emptyTakenProductIndexes = [];

  dispatch({ type: 'players', payload: modifiedPlayers });
};

export const handleClickOnTakenProduct = (tableId, playersData, playerId, productId, productName, productPrice, timeOnClick, timeOnReleaseClick, dispatch) => {

  if (timeOnReleaseClick - timeOnClick >= 300) {
    removeTakenProduct(tableId, playersData, playerId, productId, dispatch);
  } else {
    addTakenProduct(tableId, playersData, playerId, productId, productName, productPrice, dispatch);
  }
  dispatch({ type: 'timeOnClick', payload: { tableId, timeOnClick: null } });
};
