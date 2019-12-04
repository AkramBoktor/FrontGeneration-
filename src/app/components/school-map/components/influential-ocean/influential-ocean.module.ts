import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { InfluentialOceanListComponent } from './influential-ocean-list/influential-ocean-list.component';
import { InfluentialOceanEditComponent } from './influential-ocean-edit/influential-ocean-edit.component';
import { InfluentialOceanNewComponent } from './influential-ocean-new/influential-ocean-new.component';
import { InfluentialOceanViewComponent } from './influential-ocean-view/influential-ocean-view.component';
import { InfluentialOceanRoutingModule } from './influential-ocean.routing.module';
import { InfluentialOceanService } from './shared/influential-ocean.service';
import { InfluentialOceanGuard } from './shared/influential-ocean.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    InfluentialOceanListComponent,
    InfluentialOceanNewComponent,
    InfluentialOceanEditComponent,
    InfluentialOceanViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    InfluentialOceanRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    InfluentialOceanService,
    InfluentialOceanGuard
  ],
  entryComponents: [
    InfluentialOceanNewComponent,
    InfluentialOceanEditComponent,
    InfluentialOceanViewComponent
  ]
})

export class InfluentialOceanModule {
}
