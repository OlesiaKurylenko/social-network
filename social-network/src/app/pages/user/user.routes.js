
import { notFoundComponent } from "../../common/not-found.component";
import { usersComponent } from "./users/users.component";
import { friendComponent } from "./friends/friends.component";

export const userRoutes = [ 
    {
        path: 'tabs/users', component: usersComponent,
    }, 
    {
        path: 'tabs/friends', component: friendComponent,
    },
    { path: '**', component: notFoundComponent }
];