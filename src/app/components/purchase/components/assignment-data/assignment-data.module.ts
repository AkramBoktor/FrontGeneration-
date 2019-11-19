import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssignmentDataListComponent } from './assignment-data-list/assignment-data-list.component';
import { AssignmentDataEditComponent } from './assignment-data-edit/assignment-data-edit.component';
import { AssignmentDataNewComponent } from './assignment-data-new/assignment-data-new.component';
import { AssignmentDataViewComponent } from './assignment-data-view/assignment-data-view.component';
import { AssignmentDataRoutingModule } from './assignment-data.routing.module';
import { AssignmentDataService } from './shared/assignment-data.service';
import { AssignmentDataGuard } from './shared/assignment-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssignmentDataListComponent,
    AssignmentDataNewComponent,
    AssignmentDataEditComponent,
    AssignmentDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssignmentDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssignmentDataService,
    AssignmentDataGuard
  ],
  entryComponents: [
    AssignmentDataNewComponent,
    AssignmentDataEditComponent,
    AssignmentDataViewComponent
  ]
})

export class AssignmentDataModule {
}
