import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BuildingAssaysListComponent } from './building-assays-list/building-assays-list.component';
import { BuildingAssaysEditComponent } from './building-assays-edit/building-assays-edit.component';
import { BuildingAssaysNewComponent } from './building-assays-new/building-assays-new.component';
import { BuildingAssaysViewComponent } from './building-assays-view/building-assays-view.component';
import { BuildingAssaysRoutingModule } from './building-assays.routing.module';
import { BuildingAssaysService } from './shared/building-assays.service';
import { BuildingAssaysGuard } from './shared/building-assays.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BuildingAssaysListComponent,
    BuildingAssaysNewComponent,
    BuildingAssaysEditComponent,
    BuildingAssaysViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BuildingAssaysRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BuildingAssaysService,
    BuildingAssaysGuard
  ],
  entryComponents: [
    BuildingAssaysNewComponent,
    BuildingAssaysEditComponent,
    BuildingAssaysViewComponent
  ]
})

export class BuildingAssaysModule {
}
