import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {

  const player = {
    id: 0,
    name: '',
    productsTaken: []
  }
  const product = {
    id: 0,
    name: ''
  }

  const [players, setPlayers] = useState([]);
  const [products, setProducts] = useState([]);
  const newPlayerNameInputRef = useRef(null);
  const addProductNameInputRef = useRef(null);

  const handleAddPlayer = () => {
    if (newPlayerNameInputRef.current.value === '' || players.length > 15) return;
    const playerName = newPlayerNameInputRef.current.value;
    setPlayers((prevPlayers) => [...prevPlayers, { ...player, id: Math.floor(Math.random() * 10000), name: playerName, }]);
    newPlayerNameInputRef.current.value = '';
  }

  const handleAddProduct = () => {
    if (addProductNameInputRef.current.value === '' || products.length > 15) return;
    const productName = addProductNameInputRef.current.value;
    setProducts((prevProducts) => [...prevProducts, { ...product, id: Math.floor(Math.random() * 10000), name: productName, }]);
    addProductNameInputRef.current.value = '';
  }

  const addTakenProduct = (playerId, productId) => {
    const modifiedPlayers = players.map((player)=> {
      if (player.id === playerId) {
        console.log(player.productsTaken);
        return {
          ...player,
          productsTaken: player.productsTaken.length > 0 && player.productsTaken.find(productTaken => productTaken.productId === productId) ? 
          player.productsTaken.map((takenProduct)=> {
            console.log(productId, takenProduct.productId);
            return (
            takenProduct.productId === productId ? {...takenProduct, quantity: takenProduct.quantity + 1} : {...takenProduct}
          )}) : 
          [...player.productsTaken, {productId, quantity: 1}]
        }
      } else {
        return {
          ...player
        }
      }
    });
    setPlayers(modifiedPlayers);
  }

  useEffect(() => {
    players?.length > 0 && localStorage.setItem('players', JSON.stringify(players));
  }, [players]);
  
  useEffect(() => {
    products?.length > 0 && localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(()=>{

    if (localStorage.getItem('products') !== null && localStorage.getItem('products') !== '') {
      const productsFromLocalStorage = JSON.parse(localStorage.getItem('products'));
      setProducts(productsFromLocalStorage);
    }

    if (localStorage.getItem('players') !== null && localStorage.getItem('players') !== '') {
      const playersFromLocalStorage = JSON.parse(localStorage.getItem('players'));
      setPlayers(playersFromLocalStorage);
    }
  }, []);

  return (
    <div className="App">
      <input ref={newPlayerNameInputRef} type='text' />
      <button onClick={() => handleAddPlayer()}>Add Player</button>
      <input ref={addProductNameInputRef} type='text' />
      <button onClick={() => handleAddProduct()}>Add Product</button>
      <table>
        <thead>
          <tr>

            <th></th>
            {products?.length > 0 && products.map((product) => (
              <th key={product.id}>{product.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players?.length > 0 && players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              {products.length > 0 && products.map((product) => {
                const takenProduct = player.productsTaken.find((takenProduct) => takenProduct.productId === product.id);
                return (
                player.productsTaken.length > 0 && takenProduct
                ? <td key={product.id+player.id} onClick={()=> addTakenProduct(player.id, product.id)}>{takenProduct.quantity}</td>
                : <td key={product.id+player.id} onClick={()=> addTakenProduct(player.id, product.id)}></td>
              )})}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
