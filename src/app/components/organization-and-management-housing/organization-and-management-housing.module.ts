
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationAndManagementHousingRoutingModule } from './organization-and-management-housing.routing.module';
import { OrganizationAndManagementHousingComponent } from './organization-and-management-housing.component';

@NgModule({
  declarations: [OrganizationAndManagementHousingComponent],
  imports: [
    OrganizationAndManagementHousingRoutingModule,
    CommonModule,
  ]
})
export class OrganizationAndManagementHousingModule { }

