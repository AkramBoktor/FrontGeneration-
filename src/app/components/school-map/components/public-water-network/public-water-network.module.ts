import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PublicWaterNetworkListComponent } from './public-water-network-list/public-water-network-list.component';
import { PublicWaterNetworkEditComponent } from './public-water-network-edit/public-water-network-edit.component';
import { PublicWaterNetworkNewComponent } from './public-water-network-new/public-water-network-new.component';
import { PublicWaterNetworkViewComponent } from './public-water-network-view/public-water-network-view.component';
import { PublicWaterNetworkRoutingModule } from './public-water-network.routing.module';
import { PublicWaterNetworkService } from './shared/public-water-network.service';
import { PublicWaterNetworkGuard } from './shared/public-water-network.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PublicWaterNetworkListComponent,
    PublicWaterNetworkNewComponent,
    PublicWaterNetworkEditComponent,
    PublicWaterNetworkViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PublicWaterNetworkRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PublicWaterNetworkService,
    PublicWaterNetworkGuard
  ],
  entryComponents: [
    PublicWaterNetworkNewComponent,
    PublicWaterNetworkEditComponent,
    PublicWaterNetworkViewComponent
  ]
})

export class PublicWaterNetworkModule {
}
