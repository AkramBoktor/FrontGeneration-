import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BasicDataForTheYouthCenterListComponent } from './basic-data-for-the-youth-center-list/basic-data-for-the-youth-center-list.component';
import { BasicDataForTheYouthCenterEditComponent } from './basic-data-for-the-youth-center-edit/basic-data-for-the-youth-center-edit.component';
import { BasicDataForTheYouthCenterNewComponent } from './basic-data-for-the-youth-center-new/basic-data-for-the-youth-center-new.component';
import { BasicDataForTheYouthCenterViewComponent } from './basic-data-for-the-youth-center-view/basic-data-for-the-youth-center-view.component';
import { BasicDataForTheYouthCenterRoutingModule } from './basic-data-for-the-youth-center.routing.module';
import { BasicDataForTheYouthCenterService } from './shared/basic-data-for-the-youth-center.service';
import { BasicDataForTheYouthCenterGuard } from './shared/basic-data-for-the-youth-center.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BasicDataForTheYouthCenterListComponent,
    BasicDataForTheYouthCenterNewComponent,
    BasicDataForTheYouthCenterEditComponent,
    BasicDataForTheYouthCenterViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BasicDataForTheYouthCenterRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BasicDataForTheYouthCenterService,
    BasicDataForTheYouthCenterGuard
  ],
  entryComponents: [
    BasicDataForTheYouthCenterNewComponent,
    BasicDataForTheYouthCenterEditComponent,
    BasicDataForTheYouthCenterViewComponent
  ]
})

export class BasicDataForTheYouthCenterModule {
}
