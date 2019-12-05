import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SampleTestDataListComponent } from './sample-test-data-list/sample-test-data-list.component';
import { SampleTestDataEditComponent } from './sample-test-data-edit/sample-test-data-edit.component';
import { SampleTestDataNewComponent } from './sample-test-data-new/sample-test-data-new.component';
import { SampleTestDataViewComponent } from './sample-test-data-view/sample-test-data-view.component';
import { SampleTestDataRoutingModule } from './sample-test-data.routing.module';
import { SampleTestDataService } from './shared/sample-test-data.service';
import { SampleTestDataGuard } from './shared/sample-test-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SampleTestDataListComponent,
    SampleTestDataNewComponent,
    SampleTestDataEditComponent,
    SampleTestDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SampleTestDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SampleTestDataService,
    SampleTestDataGuard
  ],
  entryComponents: [
    SampleTestDataNewComponent,
    SampleTestDataEditComponent,
    SampleTestDataViewComponent
  ]
})

export class SampleTestDataModule {
}
