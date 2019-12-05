import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataToTakeSpecialLeaveForEmployeeGListComponent } from './data-to-take-special-leave-for-employee-g-list/data-to-take-special-leave-for-employee-g-list.component';
import { DataToTakeSpecialLeaveForEmployeeGEditComponent } from './data-to-take-special-leave-for-employee-g-edit/data-to-take-special-leave-for-employee-g-edit.component';
import { DataToTakeSpecialLeaveForEmployeeGNewComponent } from './data-to-take-special-leave-for-employee-g-new/data-to-take-special-leave-for-employee-g-new.component';
import { DataToTakeSpecialLeaveForEmployeeGViewComponent } from './data-to-take-special-leave-for-employee-g-view/data-to-take-special-leave-for-employee-g-view.component';
import { DataToTakeSpecialLeaveForEmployeeGRoutingModule } from './data-to-take-special-leave-for-employee-g.routing.module';
import { DataToTakeSpecialLeaveForEmployeeGService } from './shared/data-to-take-special-leave-for-employee-g.service';
import { DataToTakeSpecialLeaveForEmployeeGGuard } from './shared/data-to-take-special-leave-for-employee-g.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataToTakeSpecialLeaveForEmployeeGListComponent,
    DataToTakeSpecialLeaveForEmployeeGNewComponent,
    DataToTakeSpecialLeaveForEmployeeGEditComponent,
    DataToTakeSpecialLeaveForEmployeeGViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataToTakeSpecialLeaveForEmployeeGRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataToTakeSpecialLeaveForEmployeeGService,
    DataToTakeSpecialLeaveForEmployeeGGuard
  ],
  entryComponents: [
    DataToTakeSpecialLeaveForEmployeeGNewComponent,
    DataToTakeSpecialLeaveForEmployeeGEditComponent,
    DataToTakeSpecialLeaveForEmployeeGViewComponent
  ]
})

export class DataToTakeSpecialLeaveForEmployeeGModule {
}
