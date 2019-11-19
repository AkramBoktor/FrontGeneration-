import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { JobDataListComponent } from './job-data-list/job-data-list.component';
import { JobDataEditComponent } from './job-data-edit/job-data-edit.component';
import { JobDataNewComponent } from './job-data-new/job-data-new.component';
import { JobDataViewComponent } from './job-data-view/job-data-view.component';
import { JobDataRoutingModule } from './job-data.routing.module';
import { JobDataService } from './shared/job-data.service';
import { JobDataGuard } from './shared/job-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    JobDataListComponent,
    JobDataNewComponent,
    JobDataEditComponent,
    JobDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    JobDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    JobDataService,
    JobDataGuard
  ],
  entryComponents: [
    JobDataNewComponent,
    JobDataEditComponent,
    JobDataViewComponent
  ]
})

export class JobDataModule {
}
