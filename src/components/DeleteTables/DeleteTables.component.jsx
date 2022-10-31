import { useContext } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../../context/GlobalContext";
import { createAppRoute } from "../../utils/createAppRoute";
import Button from "../common/Button/Button.component";
import './DeleteTables.css';

const DeleteTables = () => {
    const navigate = useNavigate();
    const {setActiveIndex, consumptionTablesDispatch,setCurrentTableId} = useContext(GlobalContext);
    return ( 
        <main className="delete-tables-container">
            <h4>Are you sure you want to delete all tables?</h4>
            <div className="buttons-container">
                <Button text='Delete' onClick={()=> [localStorage.removeItem('consumptionTables'), setCurrentTableId(0), consumptionTablesDispatch({type: 'reset'}),navigate(createAppRoute('createNewTable')), setActiveIndex(2)]} variation='button'/>
                <Button text='Cancel' onClick={()=> navigate(-1)} variation='button'/>
            </div>
        </main>
     );
}
 
export default DeleteTables;