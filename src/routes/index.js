// Layouts
import { HeaderOnly } from '~/components/Layout';

// Pages
import { Home, Following, Upload, Profile, Search, NotFound } from '~/pages';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile/:nickname', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    { path: '*', component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
