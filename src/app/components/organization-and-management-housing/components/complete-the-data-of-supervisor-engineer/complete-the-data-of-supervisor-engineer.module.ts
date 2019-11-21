import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CompleteTheDataOfSupervisorEngineerListComponent } from './complete-the-data-of-supervisor-engineer-list/complete-the-data-of-supervisor-engineer-list.component';
import { CompleteTheDataOfSupervisorEngineerEditComponent } from './complete-the-data-of-supervisor-engineer-edit/complete-the-data-of-supervisor-engineer-edit.component';
import { CompleteTheDataOfSupervisorEngineerNewComponent } from './complete-the-data-of-supervisor-engineer-new/complete-the-data-of-supervisor-engineer-new.component';
import { CompleteTheDataOfSupervisorEngineerViewComponent } from './complete-the-data-of-supervisor-engineer-view/complete-the-data-of-supervisor-engineer-view.component';
import { CompleteTheDataOfSupervisorEngineerRoutingModule } from './complete-the-data-of-supervisor-engineer.routing.module';
import { CompleteTheDataOfSupervisorEngineerService } from './shared/complete-the-data-of-supervisor-engineer.service';
import { CompleteTheDataOfSupervisorEngineerGuard } from './shared/complete-the-data-of-supervisor-engineer.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CompleteTheDataOfSupervisorEngineerListComponent,
    CompleteTheDataOfSupervisorEngineerNewComponent,
    CompleteTheDataOfSupervisorEngineerEditComponent,
    CompleteTheDataOfSupervisorEngineerViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CompleteTheDataOfSupervisorEngineerRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CompleteTheDataOfSupervisorEngineerService,
    CompleteTheDataOfSupervisorEngineerGuard
  ],
  entryComponents: [
    CompleteTheDataOfSupervisorEngineerNewComponent,
    CompleteTheDataOfSupervisorEngineerEditComponent,
    CompleteTheDataOfSupervisorEngineerViewComponent
  ]
})

export class CompleteTheDataOfSupervisorEngineerModule {
}
