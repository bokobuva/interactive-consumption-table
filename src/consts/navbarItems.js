import { listIcon } from "../Static/Icons/listIcon";
import { plusIcon } from "../Static/Icons/plus";
import { tableIcon } from "../Static/Icons/tableIcon";

export const NAVBAR_ITEMS = [
    {
        id: '',
        text: 'All Tables',
        route: 'consumptionTables',
        icon: listIcon,
    },
    {
        id: '',
        text: 'New Table',
        route: 'createNewTable',
        icon: plusIcon,
    },
    {
        id: '',
        text: 'Current Table',
        route: 'consumptionTable',
        icon: tableIcon,
    },
]