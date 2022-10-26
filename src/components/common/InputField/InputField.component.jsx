import { forwardRef, useEffect, useState } from 'react';
import newGUID from '../../../utils/newGUID';
import './InputField.css';

const InputField = forwardRef(({type, label, placeholder, onChange, onKeyDown, className}, ref) => {
    const [inputId, setInputId] = useState();
    useEffect(()=> setInputId(newGUID('input')), []);
    return ( 
        <div className={className}>
            <label htmlFor={inputId}>{label}</label>
            <input id={inputId} ref={ref} type={type} placeholder={placeholder} onChange={()=> onChange && onChange()} onKeyDown={onKeyDown}/>
        </div>
     );
});
 
export default InputField;