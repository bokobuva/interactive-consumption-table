import { Route, Routes } from 'react-router';
import Navbar from './components/common/Navbar/Navbar.component';
import ConsumptionTable from './components/ConsumptionTable/ConsumptionTable.component';
import ConsumptionTables from './components/ConsumptionTables/ConsumptionTables.component';
import CreateNewTable from './components/CreateNewTable/CreateNewTable.component';
import { NAVBAR_ITEMS } from './consts/navbarItems';
import './index.css'

const App = () => {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<ConsumptionTables />} />
                <Route exact path='/ct' element={<CreateNewTable />} />
                <Route path='/ct/:consumptionTableId' element={<ConsumptionTable />} />
            </Routes>
            <Navbar items={NAVBAR_ITEMS} />
        </div>
    );
}

export default App;