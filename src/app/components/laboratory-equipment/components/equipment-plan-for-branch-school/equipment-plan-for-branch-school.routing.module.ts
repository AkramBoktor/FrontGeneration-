import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EquipmentPlanForBranchSchoolGuard } from './shared/equipment-plan-for-branch-school.guard';
import { EquipmentPlanForBranchSchoolNewComponent } from './equipment-plan-for-branch-school-new/equipment-plan-for-branch-school-new.component';
import { EquipmentPlanForBranchSchoolEditComponent } from './equipment-plan-for-branch-school-edit/equipment-plan-for-branch-school-edit.component';
import { EquipmentPlanForBranchSchoolListComponent } from './equipment-plan-for-branch-school-list/equipment-plan-for-branch-school-list.component';
import { EquipmentPlanForBranchSchoolViewComponent } from './equipment-plan-for-branch-school-view/equipment-plan-for-branch-school-view.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentPlanForBranchSchoolListComponent,
    canActivate: [EquipmentPlanForBranchSchoolGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EquipmentPlanForBranchSchoolNewComponent,
    canActivate: [EquipmentPlanForBranchSchoolGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EquipmentPlanForBranchSchoolEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EquipmentPlanForBranchSchoolListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EquipmentPlanForBranchSchoolViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EquipmentPlanForBranchSchoolRoutingModule {
}
