import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [
    {
        path: 'home',
        component: AppComponent
    },
    {

        path: 'inv',
        loadChildren: () => import('./modules/inv/inv.module').then(m => m.InvModule)
    },
    // {
    //     path: '',
    //     component: AppComponent
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}