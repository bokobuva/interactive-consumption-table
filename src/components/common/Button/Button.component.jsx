import { Link } from "react-router-dom";
import './Button.css'

const Button = ({type, onClick, to, text, variation, disabled}) => {
    return (
        <>
            {
                variation === 'link' ?
                <Link to={to} onClick={onClick ? onClick : ()=>{}} disabled={disabled}>{text}</Link>:
                <button type={type} onClick={onClick} disabled={disabled}>{text}</button>
            }        
        </>
    );
}
 
export default Button;