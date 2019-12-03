import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SampleTestRequestListComponent } from './sample-test-request-list/sample-test-request-list.component';
import { SampleTestRequestEditComponent } from './sample-test-request-edit/sample-test-request-edit.component';
import { SampleTestRequestNewComponent } from './sample-test-request-new/sample-test-request-new.component';
import { SampleTestRequestViewComponent } from './sample-test-request-view/sample-test-request-view.component';
import { SampleTestRequestRoutingModule } from './sample-test-request.routing.module';
import { SampleTestRequestService } from './shared/sample-test-request.service';
import { SampleTestRequestGuard } from './shared/sample-test-request.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SampleTestRequestListComponent,
    SampleTestRequestNewComponent,
    SampleTestRequestEditComponent,
    SampleTestRequestViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SampleTestRequestRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SampleTestRequestService,
    SampleTestRequestGuard
  ],
  entryComponents: [
    SampleTestRequestNewComponent,
    SampleTestRequestEditComponent,
    SampleTestRequestViewComponent
  ]
})

export class SampleTestRequestModule {
}
