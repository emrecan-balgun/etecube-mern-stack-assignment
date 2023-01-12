import { MdCorporateFare, MdProductionQuantityLimits } from 'react-icons/md';
import { AiOutlinePieChart, AiOutlineUser } from 'react-icons/ai';

import { Link } from 'react-router-dom';

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const items = [
  getItem('Home', '1', <AiOutlinePieChart />),
  getItem('Company', '2', <MdCorporateFare />),
  getItem('Product', '3', <MdProductionQuantityLimits />),
  getItem('Users', '4', <AiOutlineUser />),
];

export { items };
