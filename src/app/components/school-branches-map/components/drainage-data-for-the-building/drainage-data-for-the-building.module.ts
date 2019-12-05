import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DrainageDataForTheBuildingListComponent } from './drainage-data-for-the-building-list/drainage-data-for-the-building-list.component';
import { DrainageDataForTheBuildingEditComponent } from './drainage-data-for-the-building-edit/drainage-data-for-the-building-edit.component';
import { DrainageDataForTheBuildingNewComponent } from './drainage-data-for-the-building-new/drainage-data-for-the-building-new.component';
import { DrainageDataForTheBuildingViewComponent } from './drainage-data-for-the-building-view/drainage-data-for-the-building-view.component';
import { DrainageDataForTheBuildingRoutingModule } from './drainage-data-for-the-building.routing.module';
import { DrainageDataForTheBuildingService } from './shared/drainage-data-for-the-building.service';
import { DrainageDataForTheBuildingGuard } from './shared/drainage-data-for-the-building.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DrainageDataForTheBuildingListComponent,
    DrainageDataForTheBuildingNewComponent,
    DrainageDataForTheBuildingEditComponent,
    DrainageDataForTheBuildingViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DrainageDataForTheBuildingRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DrainageDataForTheBuildingService,
    DrainageDataForTheBuildingGuard
  ],
  entryComponents: [
    DrainageDataForTheBuildingNewComponent,
    DrainageDataForTheBuildingEditComponent,
    DrainageDataForTheBuildingViewComponent
  ]
})

export class DrainageDataForTheBuildingModule {
}
