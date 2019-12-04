import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RemovalRestorationDataOfClosedBuildingsListComponent } from './removal-restoration-data-of-closed-buildings-list/removal-restoration-data-of-closed-buildings-list.component';
import { RemovalRestorationDataOfClosedBuildingsEditComponent } from './removal-restoration-data-of-closed-buildings-edit/removal-restoration-data-of-closed-buildings-edit.component';
import { RemovalRestorationDataOfClosedBuildingsNewComponent } from './removal-restoration-data-of-closed-buildings-new/removal-restoration-data-of-closed-buildings-new.component';
import { RemovalRestorationDataOfClosedBuildingsViewComponent } from './removal-restoration-data-of-closed-buildings-view/removal-restoration-data-of-closed-buildings-view.component';
import { RemovalRestorationDataOfClosedBuildingsRoutingModule } from './removal-restoration-data-of-closed-buildings.routing.module';
import { RemovalRestorationDataOfClosedBuildingsService } from './shared/removal-restoration-data-of-closed-buildings.service';
import { RemovalRestorationDataOfClosedBuildingsGuard } from './shared/removal-restoration-data-of-closed-buildings.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RemovalRestorationDataOfClosedBuildingsListComponent,
    RemovalRestorationDataOfClosedBuildingsNewComponent,
    RemovalRestorationDataOfClosedBuildingsEditComponent,
    RemovalRestorationDataOfClosedBuildingsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RemovalRestorationDataOfClosedBuildingsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RemovalRestorationDataOfClosedBuildingsService,
    RemovalRestorationDataOfClosedBuildingsGuard
  ],
  entryComponents: [
    RemovalRestorationDataOfClosedBuildingsNewComponent,
    RemovalRestorationDataOfClosedBuildingsEditComponent,
    RemovalRestorationDataOfClosedBuildingsViewComponent
  ]
})

export class RemovalRestorationDataOfClosedBuildingsModule {
}
