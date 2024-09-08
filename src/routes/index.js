// layouts
import { HeaderOnly } from '~/layouts';

// Config
import config from '~/config';

// Pages
import { Home, Following, Profile, Upload, Search, Live, NotFound } from '~/pages';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.search, component: Search },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.live, component: Live, layout: null },
    { path: config.routes.notFound, component: NotFound, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
