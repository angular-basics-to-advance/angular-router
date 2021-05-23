import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users', component: UsersComponent, children: [

            { path: ':id/:name', component: UserComponent }  //here the colon informs the angular that the path is dynamically updated.
        ]
    },
    {
        path: 'servers', component: ServersComponent, children: [    //child(nested) routing
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent }
        ]
    },
    { path: 'page-not-found', component: PageNotFoundComponent },   //this is the way to handle the erro when the component doesn't exist that we wrote in the url and it can be avoided by redirecting.
    { path: '**', redirectTo: 'page-not-found' }  //"**" :double asterisk ,this is wildcard route which means catch all paths
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {


}