import { useRef, useState } from "react";
import { PLAYERS_SUGGESTIONS } from "../../../consts/suggestions";
import InputField from "../InputField/InputField.component";
import './AutocompletePlayer.css';

const AutocompletePlayer = ({ onChange, className}) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [showSuggestions, setShowSuggestion] = useState(false);
    const userInputRef = useRef();
    
    const handleAutocompleteChange = () => {
        
        const filteredSuggestions = PLAYERS_SUGGESTIONS.filter((suggestion)=> suggestion.name.toLowerCase().indexOf(userInputRef.current.value.toLowerCase()) > -1 && suggestion.name);
        const mappedFilteredSuggestions = filteredSuggestions.map((suggestion)=> suggestion.name);
        setShowSuggestion(true);
        setFilteredSuggestions(mappedFilteredSuggestions);
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
    
    return (
        <div className={`${className ? className : ''} autocomplete-container`}>
            <InputField
                type='text'
                placeholder='Add player'
                label='Add player'
                ref={userInputRef}
                onKeyDown={handleKeyDown}
                onChange={handleAutocompleteChange}
                className='autocomplete-input'
            />
            {
                showSuggestions && userInputRef.current.value !== '' && filteredSuggestions.length ?
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
                </ul> : ''
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
 
export default AutocompletePlayer;