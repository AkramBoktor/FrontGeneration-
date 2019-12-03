import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubActivityTypeListComponent } from './sub-activity-type-list/sub-activity-type-list.component';
import { SubActivityTypeEditComponent } from './sub-activity-type-edit/sub-activity-type-edit.component';
import { SubActivityTypeNewComponent } from './sub-activity-type-new/sub-activity-type-new.component';
import { SubActivityTypeViewComponent } from './sub-activity-type-view/sub-activity-type-view.component';
import { SubActivityTypeRoutingModule } from './sub-activity-type.routing.module';
import { SubActivityTypeService } from './shared/sub-activity-type.service';
import { SubActivityTypeGuard } from './shared/sub-activity-type.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubActivityTypeListComponent,
    SubActivityTypeNewComponent,
    SubActivityTypeEditComponent,
    SubActivityTypeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubActivityTypeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubActivityTypeService,
    SubActivityTypeGuard
  ],
  entryComponents: [
    SubActivityTypeNewComponent,
    SubActivityTypeEditComponent,
    SubActivityTypeViewComponent
  ]
})

export class SubActivityTypeModule {
}
