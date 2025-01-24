import { lazy } from 'react';
import NewArrivals from '../pages/NewArrivals';
import MenCategory from '../pages/men/MenCategory';
import WomenCategory from '../pages/women/WomenCategory';
import Collections from '../pages/Collections';
import Sale from '../pages/Sale';
import Hero from '../components/Layouts/Hero';
import Cart from '../pages/Cart';
import Profile from '../pages/user/Profile';
import Index from '../pages/Index';
import ProductDetail from '../components/ProductDetail';
import Wishlist from '../pages/Wishlist';
import CollectionPage from '../pages/collections/CollectionPage';
import AllProducts from '../components/AllProducts';

const routes = [
    // Main Routes
    {
        path: '/',
        element: <Index />,
        layout: 'blank',
    },
    {
        path: '/new-arrivals',
        element: <NewArrivals />,
        layout: 'blank',
    },
    // Men's Categories
    {
        path: '/men',
        element: <MenCategory />,
        layout: 'blank',
    },
    {
        path: '/men/:category',
        element: <MenCategory />,
        layout: 'blank',
    },
    // Women's Categories
    {
        path: '/women',
        element: <WomenCategory />,
        layout: 'blank',
    },
    {
        path: '/women/:category',
        element: <WomenCategory />,
        layout: 'blank',
    },
    // Collections and Sale
    {
        path: '/collections',
        element: <Collections />,
        layout: 'blank',
    },
    {
        path: '/sale',
        element: <Sale />,
        layout: 'blank',
    },
    // User Routes
    {
        path: '/cart',
        element: <Cart />,
        layout: 'blank',
    },
    {
        path: '/account',
        element: <Profile />,
        layout: 'blank',
    },
    {
        path: '/product/:id',
        element: <ProductDetail />,
        layout: 'blank',
    },
    {
        path: '/wishlist',
        element: <Wishlist />,
        layout: 'blank',
    },
    {
        path: '/collections/:id',
        element: <CollectionPage />,
        layout: 'blank',
    },
    {
        path: '/products',
        element: <AllProducts />,
    },
];

export { routes };
