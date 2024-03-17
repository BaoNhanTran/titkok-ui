import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import { Home, Following, Profile, Upload, Search, Live, NotFound } from '~/pages';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.notFound, component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
