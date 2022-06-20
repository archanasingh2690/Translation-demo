import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvDetailComponent } from './components/inv-detail/inv-detail.component';
import { InvComponent } from './components/inv.component';
import { ShipDetailComponent } from './components/ship-detail/ship-detail.component';

const routes: Routes = [
    {
        path: 'inv-detail',
        component: InvDetailComponent,
        
    },
    {
        path: 'ship-detail',
        component: ShipDetailComponent
    },
    {
        path: '',
        component: InvComponent,
          
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvRoutingModule {
}