import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { GlobalContext } from "../../../context/GlobalContext";
// import { createAppRoute } from "../../../utils/createAppRoute";
import newGUID from "../../../utils/newGUID";
import './Navbar.css';

const Navbar = ({items}) => {
    const [navbarItems, setNavbarItems] = useState([]);
    const [activeItem, setActiveItem] = useState(0);
    // const {currentTable} = useContext(GlobalContext);

    //createAppRoute(navItem.link, {CONSUMPTION_TABLE_ID: currentTable.id})

    useEffect(()=> {
        if (items?.length > 0) {
            const mappedItems = items.map((item)=> ({...item, id: newGUID('nav-item')}));
            setNavbarItems(mappedItems);
        }
    }, [items]);

    return ( 
        <nav className="navigation">
            <ul className="navigation-list">
                {
                    navbarItems?.length > 0 ?
                    navbarItems.map((navItem, index)=> (
                        <li key={navItem.id} className={`list-item ${activeItem === index ? 'active' : ''}`}>
                            <Link to={'#'} onClick={()=> setActiveItem(index)}><span className="icon">{navItem.icon}</span><span className="text">{navItem.text}</span></Link>
                        </li>
                    )) : ''
                }
                <div className="indicator"></div>
            </ul>
        </nav>
     );
}
 
export default Navbar;