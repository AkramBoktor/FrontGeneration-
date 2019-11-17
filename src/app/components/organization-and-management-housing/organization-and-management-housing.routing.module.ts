
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OrganizationAndManagementHousingComponent } from './organization-and-management-housing.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationAndManagementHousingComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OrganizationAndManagementHousingRoutingModule {
}

