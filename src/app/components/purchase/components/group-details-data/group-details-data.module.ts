import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GroupDetailsDataListComponent } from './group-details-data-list/group-details-data-list.component';
import { GroupDetailsDataEditComponent } from './group-details-data-edit/group-details-data-edit.component';
import { GroupDetailsDataNewComponent } from './group-details-data-new/group-details-data-new.component';
import { GroupDetailsDataViewComponent } from './group-details-data-view/group-details-data-view.component';
import { GroupDetailsDataRoutingModule } from './group-details-data.routing.module';
import { GroupDetailsDataService } from './shared/group-details-data.service';
import { GroupDetailsDataGuard } from './shared/group-details-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GroupDetailsDataListComponent,
    GroupDetailsDataNewComponent,
    GroupDetailsDataEditComponent,
    GroupDetailsDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GroupDetailsDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GroupDetailsDataService,
    GroupDetailsDataGuard
  ],
  entryComponents: [
    GroupDetailsDataNewComponent,
    GroupDetailsDataEditComponent,
    GroupDetailsDataViewComponent
  ]
})

export class GroupDetailsDataModule {
}
