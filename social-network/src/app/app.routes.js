import { loginComponent } from "./pages/login/login.component";
import { tabsComponent } from "./pages/user/tabs/tabs.component";
import { notFoundComponent } from "./common/not-found.component";
import { usersComponent } from "./pages/user/users/users.component";
import { friendComponent } from "./pages/user/friends/friends.component";

export const appRoutes = [
    {
        path: '', component: loginComponent
    },
    {
        path: 'login', component: loginComponent
    },
    { path: '**', component: notFoundComponent }
];