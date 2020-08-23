import { FrontPage } from "./components/FrontPage";
import { HopDetail, Hops } from "./components/Hops";
import { GrainDetail, Grains } from "./components/Grains";
import { Yeast, YeastDetail } from "./components/Yeast";
import { Calculator } from "./components/Calculator";
import { Dashboard } from "./components/Dashboard";
import { Login, Signup } from "./components/Auth";

const sharedRoutes = [
  {
    path: "/",
    component: FrontPage,
    exact: true,
  },
  {
    path: "/data/hops",
    component: Hops,
    exact: true,
  },
  { path: "/data/hops/:id", component: HopDetail },
  { path: "/data/grains", component: Grains, exact: true },
  { path: "/data/grains/:id", component: GrainDetail },
  { path: "/data/yeast", component: Yeast, exact: true },
  { path: "/data/yeast/:id", component: YeastDetail },
  { path: "/calculator", component: Calculator },
];

export const privateRoutes = [
  ...sharedRoutes,
  { path: "/dashboard", component: Dashboard },
];

export const publicRoutes = [
  ...sharedRoutes,
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

const sharedLinks = [{ name: "Calculator", url: "/calculator" }];

export const privateLinks = [
  ...sharedLinks,
  { name: "Dashboard", url: "/dashboard" },
];
export const publicLinks = [
  ...sharedLinks,
  { name: "Login/Signup", url: "/login" },
];
