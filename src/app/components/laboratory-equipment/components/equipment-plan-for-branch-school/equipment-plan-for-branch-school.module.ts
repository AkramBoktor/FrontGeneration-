import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EquipmentPlanForBranchSchoolListComponent } from './equipment-plan-for-branch-school-list/equipment-plan-for-branch-school-list.component';
import { EquipmentPlanForBranchSchoolEditComponent } from './equipment-plan-for-branch-school-edit/equipment-plan-for-branch-school-edit.component';
import { EquipmentPlanForBranchSchoolNewComponent } from './equipment-plan-for-branch-school-new/equipment-plan-for-branch-school-new.component';
import { EquipmentPlanForBranchSchoolViewComponent } from './equipment-plan-for-branch-school-view/equipment-plan-for-branch-school-view.component';
import { EquipmentPlanForBranchSchoolRoutingModule } from './equipment-plan-for-branch-school.routing.module';
import { EquipmentPlanForBranchSchoolService } from './shared/equipment-plan-for-branch-school.service';
import { EquipmentPlanForBranchSchoolGuard } from './shared/equipment-plan-for-branch-school.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EquipmentPlanForBranchSchoolListComponent,
    EquipmentPlanForBranchSchoolNewComponent,
    EquipmentPlanForBranchSchoolEditComponent,
    EquipmentPlanForBranchSchoolViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EquipmentPlanForBranchSchoolRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EquipmentPlanForBranchSchoolService,
    EquipmentPlanForBranchSchoolGuard
  ],
  entryComponents: [
    EquipmentPlanForBranchSchoolNewComponent,
    EquipmentPlanForBranchSchoolEditComponent,
    EquipmentPlanForBranchSchoolViewComponent
  ]
})

export class EquipmentPlanForBranchSchoolModule {
}
