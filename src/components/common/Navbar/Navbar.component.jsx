import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";
import { createAppRoute } from "../../../utils/createAppRoute";
import newGUID from "../../../utils/newGUID";
import './Navbar.css';

const Navbar = ({items}) => {
    const [navbarItems, setNavbarItems] = useState([]);
    const { currentTableId, activeIndex, setActiveIndex } = useContext(GlobalContext);

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
                        <li key={navItem.id} className='list-item'>
                            {
                                currentTableId === null && navItem.route === 'consumptionTable' ?
                                <p><span className="icon">{navItem.icon}</span><span className="text">{navItem.text}</span></p> :
                                <Link
                                    to={navItem.route === 'consumptionTable' ? createAppRoute(navItem.route, {CONSUMPTION_TABLE_ID: currentTableId}) : createAppRoute(navItem.route)}
                                    onClick={()=> [setActiveIndex(index),localStorage.setItem('activeIndex', index)]}
                                    className={parseInt(activeIndex) === index ? 'active' : ''}
                                >
                                    <span className="icon">{navItem.icon}</span><span className="text">{navItem.text}</span>
                                </Link>
                            }
                        </li>
                    )) : ''
                }
                <div className="indicator" style={{ translate: `calc(70px * ${activeIndex}) 0`}}></div>
            </ul>
        </nav>
     );
}
 
export default Navbar;