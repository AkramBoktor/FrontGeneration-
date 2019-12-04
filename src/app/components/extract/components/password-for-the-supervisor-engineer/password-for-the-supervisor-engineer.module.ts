import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PasswordForTheSupervisorEngineerListComponent } from './password-for-the-supervisor-engineer-list/password-for-the-supervisor-engineer-list.component';
import { PasswordForTheSupervisorEngineerEditComponent } from './password-for-the-supervisor-engineer-edit/password-for-the-supervisor-engineer-edit.component';
import { PasswordForTheSupervisorEngineerNewComponent } from './password-for-the-supervisor-engineer-new/password-for-the-supervisor-engineer-new.component';
import { PasswordForTheSupervisorEngineerViewComponent } from './password-for-the-supervisor-engineer-view/password-for-the-supervisor-engineer-view.component';
import { PasswordForTheSupervisorEngineerRoutingModule } from './password-for-the-supervisor-engineer.routing.module';
import { PasswordForTheSupervisorEngineerService } from './shared/password-for-the-supervisor-engineer.service';
import { PasswordForTheSupervisorEngineerGuard } from './shared/password-for-the-supervisor-engineer.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PasswordForTheSupervisorEngineerListComponent,
    PasswordForTheSupervisorEngineerNewComponent,
    PasswordForTheSupervisorEngineerEditComponent,
    PasswordForTheSupervisorEngineerViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PasswordForTheSupervisorEngineerRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PasswordForTheSupervisorEngineerService,
    PasswordForTheSupervisorEngineerGuard
  ],
  entryComponents: [
    PasswordForTheSupervisorEngineerNewComponent,
    PasswordForTheSupervisorEngineerEditComponent,
    PasswordForTheSupervisorEngineerViewComponent
  ]
})

export class PasswordForTheSupervisorEngineerModule {
}
