import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/common/Navbar/Navbar.component';
import ConsumptionTable from './components/ConsumptionTable/ConsumptionTable.component';
import ConsumptionTables from './components/ConsumptionTables/ConsumptionTables.component';
import CreateNewTable from './components/CreateNewTable/CreateNewTable.component';
import DeleteTables from './components/DeleteTables/DeleteTables.component';
import { NAVBAR_ITEMS } from './consts/navbarItems';
import { GlobalContext } from './context/GlobalContext';
import './index.css'

const App = () => {
    const {consumptionTablesState} = useContext(GlobalContext);
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<ConsumptionTables />} />
                <Route exact path='/ct' element={<CreateNewTable />} />
                {consumptionTablesState?.length > 0 &&
                    <Route path='/ct/:consumptionTableId' element={<ConsumptionTable />} />
                }
                <Route path='/delete' element={<DeleteTables/>}/>
            </Routes>
            <Navbar items={NAVBAR_ITEMS} />
        </div>
    );
}

export default App;