import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { WorkTypeListComponent } from './work-type-list/work-type-list.component';
import { WorkTypeEditComponent } from './work-type-edit/work-type-edit.component';
import { WorkTypeNewComponent } from './work-type-new/work-type-new.component';
import { WorkTypeViewComponent } from './work-type-view/work-type-view.component';
import { WorkTypeRoutingModule } from './work-type.routing.module';
import { WorkTypeService } from './shared/work-type.service';
import { WorkTypeGuard } from './shared/work-type.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    WorkTypeListComponent,
    WorkTypeNewComponent,
    WorkTypeEditComponent,
    WorkTypeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    WorkTypeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    WorkTypeService,
    WorkTypeGuard
  ],
  entryComponents: [
    WorkTypeNewComponent,
    WorkTypeEditComponent,
    WorkTypeViewComponent
  ]
})

export class WorkTypeModule {
}
