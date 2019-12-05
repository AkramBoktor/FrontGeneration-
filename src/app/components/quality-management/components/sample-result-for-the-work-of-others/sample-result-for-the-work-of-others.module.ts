import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SampleResultForTheWorkOfOthersListComponent } from './sample-result-for-the-work-of-others-list/sample-result-for-the-work-of-others-list.component';
import { SampleResultForTheWorkOfOthersEditComponent } from './sample-result-for-the-work-of-others-edit/sample-result-for-the-work-of-others-edit.component';
import { SampleResultForTheWorkOfOthersNewComponent } from './sample-result-for-the-work-of-others-new/sample-result-for-the-work-of-others-new.component';
import { SampleResultForTheWorkOfOthersViewComponent } from './sample-result-for-the-work-of-others-view/sample-result-for-the-work-of-others-view.component';
import { SampleResultForTheWorkOfOthersRoutingModule } from './sample-result-for-the-work-of-others.routing.module';
import { SampleResultForTheWorkOfOthersService } from './shared/sample-result-for-the-work-of-others.service';
import { SampleResultForTheWorkOfOthersGuard } from './shared/sample-result-for-the-work-of-others.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SampleResultForTheWorkOfOthersListComponent,
    SampleResultForTheWorkOfOthersNewComponent,
    SampleResultForTheWorkOfOthersEditComponent,
    SampleResultForTheWorkOfOthersViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SampleResultForTheWorkOfOthersRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SampleResultForTheWorkOfOthersService,
    SampleResultForTheWorkOfOthersGuard
  ],
  entryComponents: [
    SampleResultForTheWorkOfOthersNewComponent,
    SampleResultForTheWorkOfOthersEditComponent,
    SampleResultForTheWorkOfOthersViewComponent
  ]
})

export class SampleResultForTheWorkOfOthersModule {
}
