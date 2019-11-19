
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationAndManagementTrainingRoutingModule } from './organization-and-management-training.routing.module';
import { OrganizationAndManagementTrainingComponent } from './organization-and-management-training.component';

@NgModule({
  declarations: [OrganizationAndManagementTrainingComponent],
  imports: [
    OrganizationAndManagementTrainingRoutingModule,
    CommonModule,
  ]
})
export class OrganizationAndManagementTrainingModule { }

