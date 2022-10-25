import { useEffect, useState } from 'react';
import newGUID from '../../../utils/newGUID';
import './InputField.css';

const InputField = ({type, label, placeholder, onChange}) => {
    const [inputId, setInputId] = useState();
    useEffect(()=> setInputId(newGUID()), []);
    return ( 
        <div>
            <label htmlFor={inputId}>{label}</label>
            <input id={inputId} type={type} placeholder={placeholder} onChange={(e)=> onChange(e.target.value)}/>
        </div>
     );
};
 
export default InputField;