import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IncubationProgramListComponent } from './incubation-program-list/incubation-program-list.component';
import { IncubationProgramEditComponent } from './incubation-program-edit/incubation-program-edit.component';
import { IncubationProgramNewComponent } from './incubation-program-new/incubation-program-new.component';
import { IncubationProgramViewComponent } from './incubation-program-view/incubation-program-view.component';
import { IncubationProgramRoutingModule } from './incubation-program.routing.module';
import { IncubationProgramService } from './shared/incubation-program.service';
import { IncubationProgramGuard } from './shared/incubation-program.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IncubationProgramListComponent,
    IncubationProgramNewComponent,
    IncubationProgramEditComponent,
    IncubationProgramViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IncubationProgramRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IncubationProgramService,
    IncubationProgramGuard
  ],
  entryComponents: [
    IncubationProgramNewComponent,
    IncubationProgramEditComponent,
    IncubationProgramViewComponent
  ]
})

export class IncubationProgramModule {
}
