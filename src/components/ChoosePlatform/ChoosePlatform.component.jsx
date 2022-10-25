import { createAppRoute } from "../../utils/createAppRoute";
import Button from "../common/Button/Button.component";
import './ChoosePlatform.css';

const ChoosePlatform = () => {
    return (
        <main className="choose-platform-container">
            <Button variation={'link'} to={createAppRoute('consumptionTables')} text='Consumption Tables'/>
            <Button variation={'link'} to={createAppRoute('orderSheets')} text='Order Sheets'/>
        </main>
    );
}
 
export default ChoosePlatform;