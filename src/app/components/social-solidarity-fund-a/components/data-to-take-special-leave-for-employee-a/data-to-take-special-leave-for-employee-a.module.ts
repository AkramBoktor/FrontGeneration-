import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataToTakeSpecialLeaveForEmployeeAListComponent } from './data-to-take-special-leave-for-employee-a-list/data-to-take-special-leave-for-employee-a-list.component';
import { DataToTakeSpecialLeaveForEmployeeAEditComponent } from './data-to-take-special-leave-for-employee-a-edit/data-to-take-special-leave-for-employee-a-edit.component';
import { DataToTakeSpecialLeaveForEmployeeANewComponent } from './data-to-take-special-leave-for-employee-a-new/data-to-take-special-leave-for-employee-a-new.component';
import { DataToTakeSpecialLeaveForEmployeeAViewComponent } from './data-to-take-special-leave-for-employee-a-view/data-to-take-special-leave-for-employee-a-view.component';
import { DataToTakeSpecialLeaveForEmployeeARoutingModule } from './data-to-take-special-leave-for-employee-a.routing.module';
import { DataToTakeSpecialLeaveForEmployeeAService } from './shared/data-to-take-special-leave-for-employee-a.service';
import { DataToTakeSpecialLeaveForEmployeeAGuard } from './shared/data-to-take-special-leave-for-employee-a.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataToTakeSpecialLeaveForEmployeeAListComponent,
    DataToTakeSpecialLeaveForEmployeeANewComponent,
    DataToTakeSpecialLeaveForEmployeeAEditComponent,
    DataToTakeSpecialLeaveForEmployeeAViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataToTakeSpecialLeaveForEmployeeARoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataToTakeSpecialLeaveForEmployeeAService,
    DataToTakeSpecialLeaveForEmployeeAGuard
  ],
  entryComponents: [
    DataToTakeSpecialLeaveForEmployeeANewComponent,
    DataToTakeSpecialLeaveForEmployeeAEditComponent,
    DataToTakeSpecialLeaveForEmployeeAViewComponent
  ]
})

export class DataToTakeSpecialLeaveForEmployeeAModule {
}
