import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GrievancesListComponent } from './grievances-list/grievances-list.component';
import { GrievancesEditComponent } from './grievances-edit/grievances-edit.component';
import { GrievancesNewComponent } from './grievances-new/grievances-new.component';
import { GrievancesViewComponent } from './grievances-view/grievances-view.component';
import { GrievancesRoutingModule } from './grievances.routing.module';
import { GrievancesService } from './shared/grievances.service';
import { GrievancesGuard } from './shared/grievances.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GrievancesListComponent,
    GrievancesNewComponent,
    GrievancesEditComponent,
    GrievancesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GrievancesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GrievancesService,
    GrievancesGuard
  ],
  entryComponents: [
    GrievancesNewComponent,
    GrievancesEditComponent,
    GrievancesViewComponent
  ]
})

export class GrievancesModule {
}
