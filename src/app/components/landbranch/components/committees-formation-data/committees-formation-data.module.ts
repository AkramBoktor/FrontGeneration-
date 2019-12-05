import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CommitteesFormationDataListComponent } from './committees-formation-data-list/committees-formation-data-list.component';
import { CommitteesFormationDataEditComponent } from './committees-formation-data-edit/committees-formation-data-edit.component';
import { CommitteesFormationDataNewComponent } from './committees-formation-data-new/committees-formation-data-new.component';
import { CommitteesFormationDataViewComponent } from './committees-formation-data-view/committees-formation-data-view.component';
import { CommitteesFormationDataRoutingModule } from './committees-formation-data.routing.module';
import { CommitteesFormationDataService } from './shared/committees-formation-data.service';
import { CommitteesFormationDataGuard } from './shared/committees-formation-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CommitteesFormationDataListComponent,
    CommitteesFormationDataNewComponent,
    CommitteesFormationDataEditComponent,
    CommitteesFormationDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CommitteesFormationDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CommitteesFormationDataService,
    CommitteesFormationDataGuard
  ],
  entryComponents: [
    CommitteesFormationDataNewComponent,
    CommitteesFormationDataEditComponent,
    CommitteesFormationDataViewComponent
  ]
})

export class CommitteesFormationDataModule {
}
