import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CareerProgramsListComponent } from './career-programs-list/career-programs-list.component';
import { CareerProgramsEditComponent } from './career-programs-edit/career-programs-edit.component';
import { CareerProgramsNewComponent } from './career-programs-new/career-programs-new.component';
import { CareerProgramsViewComponent } from './career-programs-view/career-programs-view.component';
import { CareerProgramsRoutingModule } from './career-programs.routing.module';
import { CareerProgramsService } from './shared/career-programs.service';
import { CareerProgramsGuard } from './shared/career-programs.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CareerProgramsListComponent,
    CareerProgramsNewComponent,
    CareerProgramsEditComponent,
    CareerProgramsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CareerProgramsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CareerProgramsService,
    CareerProgramsGuard
  ],
  entryComponents: [
    CareerProgramsNewComponent,
    CareerProgramsEditComponent,
    CareerProgramsViewComponent
  ]
})

export class CareerProgramsModule {
}
