import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SchoolAreExcludedFromQualityControlListComponent } from './school-are-excluded-from-quality-control-list/school-are-excluded-from-quality-control-list.component';
import { SchoolAreExcludedFromQualityControlEditComponent } from './school-are-excluded-from-quality-control-edit/school-are-excluded-from-quality-control-edit.component';
import { SchoolAreExcludedFromQualityControlNewComponent } from './school-are-excluded-from-quality-control-new/school-are-excluded-from-quality-control-new.component';
import { SchoolAreExcludedFromQualityControlViewComponent } from './school-are-excluded-from-quality-control-view/school-are-excluded-from-quality-control-view.component';
import { SchoolAreExcludedFromQualityControlRoutingModule } from './school-are-excluded-from-quality-control.routing.module';
import { SchoolAreExcludedFromQualityControlService } from './shared/school-are-excluded-from-quality-control.service';
import { SchoolAreExcludedFromQualityControlGuard } from './shared/school-are-excluded-from-quality-control.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SchoolAreExcludedFromQualityControlListComponent,
    SchoolAreExcludedFromQualityControlNewComponent,
    SchoolAreExcludedFromQualityControlEditComponent,
    SchoolAreExcludedFromQualityControlViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SchoolAreExcludedFromQualityControlRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SchoolAreExcludedFromQualityControlService,
    SchoolAreExcludedFromQualityControlGuard
  ],
  entryComponents: [
    SchoolAreExcludedFromQualityControlNewComponent,
    SchoolAreExcludedFromQualityControlEditComponent,
    SchoolAreExcludedFromQualityControlViewComponent
  ]
})

export class SchoolAreExcludedFromQualityControlModule {
}
