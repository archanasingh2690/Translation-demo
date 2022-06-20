import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipDetailComponent } from './components/ship-detail/ship-detail.component';
import { InvComponent } from './components/inv.component';
import { InvDetailComponent } from './components/inv-detail/inv-detail.component';
import { InvRoutingModule } from './inv.routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InvComponent,
    InvDetailComponent,
    ShipDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InvRoutingModule
  ]
})
export class InvModule { }
