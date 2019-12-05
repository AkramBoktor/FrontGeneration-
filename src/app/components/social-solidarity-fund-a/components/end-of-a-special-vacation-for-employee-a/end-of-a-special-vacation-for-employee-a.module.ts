import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EndOfASpecialVacationForEmployeeAListComponent } from './end-of-a-special-vacation-for-employee-a-list/end-of-a-special-vacation-for-employee-a-list.component';
import { EndOfASpecialVacationForEmployeeAEditComponent } from './end-of-a-special-vacation-for-employee-a-edit/end-of-a-special-vacation-for-employee-a-edit.component';
import { EndOfASpecialVacationForEmployeeANewComponent } from './end-of-a-special-vacation-for-employee-a-new/end-of-a-special-vacation-for-employee-a-new.component';
import { EndOfASpecialVacationForEmployeeAViewComponent } from './end-of-a-special-vacation-for-employee-a-view/end-of-a-special-vacation-for-employee-a-view.component';
import { EndOfASpecialVacationForEmployeeARoutingModule } from './end-of-a-special-vacation-for-employee-a.routing.module';
import { EndOfASpecialVacationForEmployeeAService } from './shared/end-of-a-special-vacation-for-employee-a.service';
import { EndOfASpecialVacationForEmployeeAGuard } from './shared/end-of-a-special-vacation-for-employee-a.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EndOfASpecialVacationForEmployeeAListComponent,
    EndOfASpecialVacationForEmployeeANewComponent,
    EndOfASpecialVacationForEmployeeAEditComponent,
    EndOfASpecialVacationForEmployeeAViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EndOfASpecialVacationForEmployeeARoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EndOfASpecialVacationForEmployeeAService,
    EndOfASpecialVacationForEmployeeAGuard
  ],
  entryComponents: [
    EndOfASpecialVacationForEmployeeANewComponent,
    EndOfASpecialVacationForEmployeeAEditComponent,
    EndOfASpecialVacationForEmployeeAViewComponent
  ]
})

export class EndOfASpecialVacationForEmployeeAModule {
}
