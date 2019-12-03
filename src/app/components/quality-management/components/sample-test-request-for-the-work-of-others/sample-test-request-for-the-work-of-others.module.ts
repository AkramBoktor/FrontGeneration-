import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SampleTestRequestForTheWorkOfOthersListComponent } from './sample-test-request-for-the-work-of-others-list/sample-test-request-for-the-work-of-others-list.component';
import { SampleTestRequestForTheWorkOfOthersEditComponent } from './sample-test-request-for-the-work-of-others-edit/sample-test-request-for-the-work-of-others-edit.component';
import { SampleTestRequestForTheWorkOfOthersNewComponent } from './sample-test-request-for-the-work-of-others-new/sample-test-request-for-the-work-of-others-new.component';
import { SampleTestRequestForTheWorkOfOthersViewComponent } from './sample-test-request-for-the-work-of-others-view/sample-test-request-for-the-work-of-others-view.component';
import { SampleTestRequestForTheWorkOfOthersRoutingModule } from './sample-test-request-for-the-work-of-others.routing.module';
import { SampleTestRequestForTheWorkOfOthersService } from './shared/sample-test-request-for-the-work-of-others.service';
import { SampleTestRequestForTheWorkOfOthersGuard } from './shared/sample-test-request-for-the-work-of-others.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SampleTestRequestForTheWorkOfOthersListComponent,
    SampleTestRequestForTheWorkOfOthersNewComponent,
    SampleTestRequestForTheWorkOfOthersEditComponent,
    SampleTestRequestForTheWorkOfOthersViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SampleTestRequestForTheWorkOfOthersRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SampleTestRequestForTheWorkOfOthersService,
    SampleTestRequestForTheWorkOfOthersGuard
  ],
  entryComponents: [
    SampleTestRequestForTheWorkOfOthersNewComponent,
    SampleTestRequestForTheWorkOfOthersEditComponent,
    SampleTestRequestForTheWorkOfOthersViewComponent
  ]
})

export class SampleTestRequestForTheWorkOfOthersModule {
}
