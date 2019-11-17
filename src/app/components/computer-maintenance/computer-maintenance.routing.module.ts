
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ComputerMaintenanceComponent } from './computer-maintenance.component';


const routes: Routes = [
  {
    path: '',
    component: ComputerMaintenanceComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ComputerMaintenanceRoutingModule {
}

