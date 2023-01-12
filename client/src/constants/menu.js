import { MdCorporateFare, MdProductionQuantityLimits } from 'react-icons/md';
import { AiOutlinePieChart, AiOutlineUser } from 'react-icons/ai';

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const items = [
  getItem('Home', 'Home', <AiOutlinePieChart />),
  getItem('Company', 'Company', <MdCorporateFare />),
  getItem('Product', 'Product', <MdProductionQuantityLimits />),
  getItem('User', 'User', <AiOutlineUser />),
];

export { items };
