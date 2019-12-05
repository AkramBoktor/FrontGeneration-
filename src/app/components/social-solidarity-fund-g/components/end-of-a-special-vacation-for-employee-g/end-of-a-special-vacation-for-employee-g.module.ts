import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EndOfASpecialVacationForEmployeeGListComponent } from './end-of-a-special-vacation-for-employee-g-list/end-of-a-special-vacation-for-employee-g-list.component';
import { EndOfASpecialVacationForEmployeeGEditComponent } from './end-of-a-special-vacation-for-employee-g-edit/end-of-a-special-vacation-for-employee-g-edit.component';
import { EndOfASpecialVacationForEmployeeGNewComponent } from './end-of-a-special-vacation-for-employee-g-new/end-of-a-special-vacation-for-employee-g-new.component';
import { EndOfASpecialVacationForEmployeeGViewComponent } from './end-of-a-special-vacation-for-employee-g-view/end-of-a-special-vacation-for-employee-g-view.component';
import { EndOfASpecialVacationForEmployeeGRoutingModule } from './end-of-a-special-vacation-for-employee-g.routing.module';
import { EndOfASpecialVacationForEmployeeGService } from './shared/end-of-a-special-vacation-for-employee-g.service';
import { EndOfASpecialVacationForEmployeeGGuard } from './shared/end-of-a-special-vacation-for-employee-g.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EndOfASpecialVacationForEmployeeGListComponent,
    EndOfASpecialVacationForEmployeeGNewComponent,
    EndOfASpecialVacationForEmployeeGEditComponent,
    EndOfASpecialVacationForEmployeeGViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EndOfASpecialVacationForEmployeeGRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EndOfASpecialVacationForEmployeeGService,
    EndOfASpecialVacationForEmployeeGGuard
  ],
  entryComponents: [
    EndOfASpecialVacationForEmployeeGNewComponent,
    EndOfASpecialVacationForEmployeeGEditComponent,
    EndOfASpecialVacationForEmployeeGViewComponent
  ]
})

export class EndOfASpecialVacationForEmployeeGModule {
}
