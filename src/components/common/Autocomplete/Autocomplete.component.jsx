import { useEffect, useRef, useState } from "react";
import newGUID from "../../../utils/newGUID";
import './Autocomplete.css';

const Autocomplete = ({suggestions, label, type, placeholder, onChange, className}) => {
    
    const [autocompleteId, setAutoCompleteId] = useState();
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [showSuggestions, setShowSuggestion] = useState(false);
    // const [userInput, setUserInput] = useState('');
    const userInputRef = useRef();
    
    const handleAutocompleteChange = (e) => {
        
        const filteredSuggestions = suggestions.filter((suggestion)=> suggestion.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
        userInputRef.current.value = e.target.value;
        setShowSuggestion(true);
        setFilteredSuggestions(filteredSuggestions);
    }

    const handleOptionClick = (e) => {
        userInputRef.current.value = '';
        onChange(e.currentTarget.innerText);
    }
    
    const handleKeyDown = (e) => {
        
        if (e.keyCode === 13) {
            userInputRef.current.value = filteredSuggestions[activeSuggestion];
            setShowSuggestion(false);
            setActiveSuggestion(0);
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) return;
            
            setActiveSuggestion(prevActiveSuggestion=> prevActiveSuggestion - 1);
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) return;
            
            setActiveSuggestion(prevActiveSuggestion=> prevActiveSuggestion + 1);
        }
    };

    useEffect(()=> {setAutoCompleteId(newGUID('autocomplete'))}, []);
    
    return (
        <div className={`${className ? className : ''} autocomplete-container`}>
            <label
                htmlFor={autocompleteId}
                className='autocomplete-label'
            >
                {label}
            </label>
            <input
                id={autocompleteId}
                type={type}
                placeholder={placeholder}
                ref={userInputRef}
                onKeyDown={(e)=> handleKeyDown(e)}
                onChange={(e)=> handleAutocompleteChange(e)}
                className='autocomplete-input'
            />
            {
                showSuggestions && userInputRef.current.value !== '' && filteredSuggestions.length &&
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;
        
                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            className = "suggestion-active";
                        }
                        return (
                            <li className={className} key={suggestion} onClick={(e)=> handleOptionClick(e)}>
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
            }
            <button
                onClick={(e)=> [e.preventDefault(),onChange(userInputRef.current.value), userInputRef.current.value = '']}
                className='autocomplete-button'
            >
                Add
            </button>
        </div>
    );
}
 
export default Autocomplete;