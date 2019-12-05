import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataToTakeSpecialLeaveForEmployeeBListComponent } from './data-to-take-special-leave-for-employee-b-list/data-to-take-special-leave-for-employee-b-list.component';
import { DataToTakeSpecialLeaveForEmployeeBEditComponent } from './data-to-take-special-leave-for-employee-b-edit/data-to-take-special-leave-for-employee-b-edit.component';
import { DataToTakeSpecialLeaveForEmployeeBNewComponent } from './data-to-take-special-leave-for-employee-b-new/data-to-take-special-leave-for-employee-b-new.component';
import { DataToTakeSpecialLeaveForEmployeeBViewComponent } from './data-to-take-special-leave-for-employee-b-view/data-to-take-special-leave-for-employee-b-view.component';
import { DataToTakeSpecialLeaveForEmployeeBRoutingModule } from './data-to-take-special-leave-for-employee-b.routing.module';
import { DataToTakeSpecialLeaveForEmployeeBService } from './shared/data-to-take-special-leave-for-employee-b.service';
import { DataToTakeSpecialLeaveForEmployeeBGuard } from './shared/data-to-take-special-leave-for-employee-b.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataToTakeSpecialLeaveForEmployeeBListComponent,
    DataToTakeSpecialLeaveForEmployeeBNewComponent,
    DataToTakeSpecialLeaveForEmployeeBEditComponent,
    DataToTakeSpecialLeaveForEmployeeBViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataToTakeSpecialLeaveForEmployeeBRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataToTakeSpecialLeaveForEmployeeBService,
    DataToTakeSpecialLeaveForEmployeeBGuard
  ],
  entryComponents: [
    DataToTakeSpecialLeaveForEmployeeBNewComponent,
    DataToTakeSpecialLeaveForEmployeeBEditComponent,
    DataToTakeSpecialLeaveForEmployeeBViewComponent
  ]
})

export class DataToTakeSpecialLeaveForEmployeeBModule {
}
