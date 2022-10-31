import { useEffect, useState } from "react";
import { forwardRef } from "react";
import Button from "../Button/Button.component";
import './PlayerTotalModal.css';

const PlayerTotalModal = forwardRef(({ player }, ref) => {
    const [sum, setSum] = useState(0);
    useEffect(()=>{
        let sum= 0;
        player?.productsTaken?.forEach((product)=>{
            sum = sum+product.productPrice*product.quantity;
        })
        setSum(sum)
    }, [player])
    return ( 
        <dialog ref={ref} className="playerTotalModal">
            <h4>Total for {player?.name}</h4>
            <ul>
                {player?.productsTaken?.map((product, index)=> {
                    return (
                        <li key={product.id+product.productName+product.productPrice}>
                            {`${index+1}. ${product.productName}: ${product.productPrice} x ${product.quantity} = ${product.productPrice*product.quantity}`}
                        </li>
                    )
                })}
            </ul>
            <h5>Total: {sum} MKD</h5>
            <Button onClick={()=> ref.current.close()} variation='button' text='X'/>
        </dialog>
     );
})
 
export default PlayerTotalModal;