import { useRef, useState } from "react";
import { PRODUCTS_SUGGESTIONS } from "../../../consts/suggestions";
import InputField from "../InputField/InputField.component";
import './AutocompleteProduct.css';

const AutocompleteProduct = ({ addProduct, className}) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [showSuggestions, setShowSuggestion] = useState(false);
    const productNameRef = useRef();
    const productPriceRef = useRef();
    
    const handleProductNameChange = () => {
        const filteredSuggestions = PRODUCTS_SUGGESTIONS.filter((suggestion)=> { console.log(suggestion); return suggestion.name.toLowerCase().indexOf(productNameRef.current.value.toLowerCase()) > -1});
        const mappedFilteredSuggestions = filteredSuggestions.map((suggestion)=> suggestion.name);
        setShowSuggestion(true);
        setFilteredSuggestions(mappedFilteredSuggestions);
    }

    const handleOptionClick = (e) => {
        productNameRef.current.value = e.currentTarget.innerText;
    }
    
    const handleKeyDown = (e) => {
        
        if (e.keyCode === 13) {
            productNameRef.current.value = filteredSuggestions[activeSuggestion];
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
        <div className={`${className ? className : ''} autocomplete-product-container`}>
            <InputField
                placeholder={'Product Name'}
                label={'Product Name'}
                ref={productNameRef}
                onKeyDown={handleKeyDown}
                onChange={handleProductNameChange}
                className='autocomplete-input'
                type='text'
            />
            {
                showSuggestions && productNameRef.current.value !== '' && filteredSuggestions.length ?
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

            <InputField
                placeholder='Product price'
                label='Product price'
                ref={productPriceRef}
                className='autocomplete-input'
                type='text'
            />
            <button
                onClick={(e)=> [
                    e.preventDefault(),
                    addProduct(productNameRef.current.value, productPriceRef.current.value),
                    productNameRef.current.value = '',
                    productPriceRef.current.value = ''
                ]}
                className='autocomplete-button'
            >
                Add
            </button>
        </div>
    );
}
 
export default AutocompleteProduct;