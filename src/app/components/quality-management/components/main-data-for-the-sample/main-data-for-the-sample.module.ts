import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MainDataForTheSampleListComponent } from './main-data-for-the-sample-list/main-data-for-the-sample-list.component';
import { MainDataForTheSampleEditComponent } from './main-data-for-the-sample-edit/main-data-for-the-sample-edit.component';
import { MainDataForTheSampleNewComponent } from './main-data-for-the-sample-new/main-data-for-the-sample-new.component';
import { MainDataForTheSampleViewComponent } from './main-data-for-the-sample-view/main-data-for-the-sample-view.component';
import { MainDataForTheSampleRoutingModule } from './main-data-for-the-sample.routing.module';
import { MainDataForTheSampleService } from './shared/main-data-for-the-sample.service';
import { MainDataForTheSampleGuard } from './shared/main-data-for-the-sample.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MainDataForTheSampleListComponent,
    MainDataForTheSampleNewComponent,
    MainDataForTheSampleEditComponent,
    MainDataForTheSampleViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MainDataForTheSampleRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MainDataForTheSampleService,
    MainDataForTheSampleGuard
  ],
  entryComponents: [
    MainDataForTheSampleNewComponent,
    MainDataForTheSampleEditComponent,
    MainDataForTheSampleViewComponent
  ]
})

export class MainDataForTheSampleModule {
}
