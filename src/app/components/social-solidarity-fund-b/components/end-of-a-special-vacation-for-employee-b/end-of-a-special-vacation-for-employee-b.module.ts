import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EndOfASpecialVacationForEmployeeBListComponent } from './end-of-a-special-vacation-for-employee-b-list/end-of-a-special-vacation-for-employee-b-list.component';
import { EndOfASpecialVacationForEmployeeBEditComponent } from './end-of-a-special-vacation-for-employee-b-edit/end-of-a-special-vacation-for-employee-b-edit.component';
import { EndOfASpecialVacationForEmployeeBNewComponent } from './end-of-a-special-vacation-for-employee-b-new/end-of-a-special-vacation-for-employee-b-new.component';
import { EndOfASpecialVacationForEmployeeBViewComponent } from './end-of-a-special-vacation-for-employee-b-view/end-of-a-special-vacation-for-employee-b-view.component';
import { EndOfASpecialVacationForEmployeeBRoutingModule } from './end-of-a-special-vacation-for-employee-b.routing.module';
import { EndOfASpecialVacationForEmployeeBService } from './shared/end-of-a-special-vacation-for-employee-b.service';
import { EndOfASpecialVacationForEmployeeBGuard } from './shared/end-of-a-special-vacation-for-employee-b.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EndOfASpecialVacationForEmployeeBListComponent,
    EndOfASpecialVacationForEmployeeBNewComponent,
    EndOfASpecialVacationForEmployeeBEditComponent,
    EndOfASpecialVacationForEmployeeBViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EndOfASpecialVacationForEmployeeBRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EndOfASpecialVacationForEmployeeBService,
    EndOfASpecialVacationForEmployeeBGuard
  ],
  entryComponents: [
    EndOfASpecialVacationForEmployeeBNewComponent,
    EndOfASpecialVacationForEmployeeBEditComponent,
    EndOfASpecialVacationForEmployeeBViewComponent
  ]
})

export class EndOfASpecialVacationForEmployeeBModule {
}
