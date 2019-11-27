import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BuildingModelsWorksListComponent } from './building-models-works-list/building-models-works-list.component';
import { BuildingModelsWorksEditComponent } from './building-models-works-edit/building-models-works-edit.component';
import { BuildingModelsWorksNewComponent } from './building-models-works-new/building-models-works-new.component';
import { BuildingModelsWorksViewComponent } from './building-models-works-view/building-models-works-view.component';
import { BuildingModelsWorksRoutingModule } from './building-models-works.routing.module';
import { BuildingModelsWorksService } from './shared/building-models-works.service';
import { BuildingModelsWorksGuard } from './shared/building-models-works.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BuildingModelsWorksListComponent,
    BuildingModelsWorksNewComponent,
    BuildingModelsWorksEditComponent,
    BuildingModelsWorksViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BuildingModelsWorksRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BuildingModelsWorksService,
    BuildingModelsWorksGuard
  ],
  entryComponents: [
    BuildingModelsWorksNewComponent,
    BuildingModelsWorksEditComponent,
    BuildingModelsWorksViewComponent
  ]
})

export class BuildingModelsWorksModule {
}
