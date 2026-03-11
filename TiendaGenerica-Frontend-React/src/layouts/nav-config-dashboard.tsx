import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },
    {
    title: 'Client',
    path: '/client',
    icon: icon('ic-blog'),
  },
  {
    title: 'Supplier',
    path: '/supplier',
    icon: icon('ic-blog'),
  },
  {
    title: 'Catalog',
    path: '/catalog',
    icon: icon('ic-cart'),
  },

  {
    title: 'Buys',
    path: '/buy',
    icon: icon('ic-cart'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
