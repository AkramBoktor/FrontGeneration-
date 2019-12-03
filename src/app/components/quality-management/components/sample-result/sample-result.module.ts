import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SampleResultListComponent } from './sample-result-list/sample-result-list.component';
import { SampleResultEditComponent } from './sample-result-edit/sample-result-edit.component';
import { SampleResultNewComponent } from './sample-result-new/sample-result-new.component';
import { SampleResultViewComponent } from './sample-result-view/sample-result-view.component';
import { SampleResultRoutingModule } from './sample-result.routing.module';
import { SampleResultService } from './shared/sample-result.service';
import { SampleResultGuard } from './shared/sample-result.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SampleResultListComponent,
    SampleResultNewComponent,
    SampleResultEditComponent,
    SampleResultViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SampleResultRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SampleResultService,
    SampleResultGuard
  ],
  entryComponents: [
    SampleResultNewComponent,
    SampleResultEditComponent,
    SampleResultViewComponent
  ]
})

export class SampleResultModule {
}
