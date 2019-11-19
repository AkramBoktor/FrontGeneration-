
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BalancingPart6Component } from './balancing-part-6.component';


const routes: Routes = [
  {
    path: '',
    component: BalancingPart6Component,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BalancingPart6RoutingModule {
}

