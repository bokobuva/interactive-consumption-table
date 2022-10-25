import { Link } from "react-router-dom";
import './Button.css'

const Button = ({type, onClick, to, text, variation}) => {
    return (
        <>
            {
                variation === 'link' ?
                <Link to={to} onClick={onClick ? onClick : ()=>{}}>{text}</Link>:
                <button type={type} onClick={onClick}>{text}</button>
            }        
        </>
    );
}
 
export default Button;