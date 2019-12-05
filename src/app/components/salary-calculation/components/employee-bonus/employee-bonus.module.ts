import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeBonusListComponent } from './employee-bonus-list/employee-bonus-list.component';
import { EmployeeBonusEditComponent } from './employee-bonus-edit/employee-bonus-edit.component';
import { EmployeeBonusNewComponent } from './employee-bonus-new/employee-bonus-new.component';
import { EmployeeBonusViewComponent } from './employee-bonus-view/employee-bonus-view.component';
import { EmployeeBonusRoutingModule } from './employee-bonus.routing.module';
import { EmployeeBonusService } from './shared/employee-bonus.service';
import { EmployeeBonusGuard } from './shared/employee-bonus.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeeBonusListComponent,
    EmployeeBonusNewComponent,
    EmployeeBonusEditComponent,
    EmployeeBonusViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeBonusRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeBonusService,
    EmployeeBonusGuard
  ],
  entryComponents: [
    EmployeeBonusNewComponent,
    EmployeeBonusEditComponent,
    EmployeeBonusViewComponent
  ]
})

export class EmployeeBonusModule {
}
