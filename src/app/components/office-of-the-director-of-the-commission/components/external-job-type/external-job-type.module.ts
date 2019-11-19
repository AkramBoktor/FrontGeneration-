import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExternalJobTypeListComponent } from './external-job-type-list/external-job-type-list.component';
import { ExternalJobTypeEditComponent } from './external-job-type-edit/external-job-type-edit.component';
import { ExternalJobTypeNewComponent } from './external-job-type-new/external-job-type-new.component';
import { ExternalJobTypeViewComponent } from './external-job-type-view/external-job-type-view.component';
import { ExternalJobTypeRoutingModule } from './external-job-type.routing.module';
import { ExternalJobTypeService } from './shared/external-job-type.service';
import { ExternalJobTypeGuard } from './shared/external-job-type.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExternalJobTypeListComponent,
    ExternalJobTypeNewComponent,
    ExternalJobTypeEditComponent,
    ExternalJobTypeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExternalJobTypeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExternalJobTypeService,
    ExternalJobTypeGuard
  ],
  entryComponents: [
    ExternalJobTypeNewComponent,
    ExternalJobTypeEditComponent,
    ExternalJobTypeViewComponent
  ]
})

export class ExternalJobTypeModule {
}
