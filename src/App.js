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

  useEffect(() => { console.log(players) }, [players])
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
              <th>{product.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players?.length > 0 && players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              {products.length > 0 && products.map((product) => (
                player.productsTaken.length > 0 ? player.productsTaken.map((takenProduct) => (
                  takenProduct.id === product.id && <td>{takenProduct.quantity}</td>
                )) : <td></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
