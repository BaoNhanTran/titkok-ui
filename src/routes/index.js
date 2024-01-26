import routesConfig from '~/config/routes';

// Layouts
import { HeaderOnly } from '~/components/Layout';

// Pages
import { Home, Following, Upload, Profile, Search, NotFound } from '~/pages';

// Public Routes
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
    { path: routesConfig.notFound, component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
