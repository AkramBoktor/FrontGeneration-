import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TheMovementOfMaterialIndicesListComponent } from './the-movement-of-material-indices-list/the-movement-of-material-indices-list.component';
import { TheMovementOfMaterialIndicesEditComponent } from './the-movement-of-material-indices-edit/the-movement-of-material-indices-edit.component';
import { TheMovementOfMaterialIndicesNewComponent } from './the-movement-of-material-indices-new/the-movement-of-material-indices-new.component';
import { TheMovementOfMaterialIndicesViewComponent } from './the-movement-of-material-indices-view/the-movement-of-material-indices-view.component';
import { TheMovementOfMaterialIndicesRoutingModule } from './the-movement-of-material-indices.routing.module';
import { TheMovementOfMaterialIndicesService } from './shared/the-movement-of-material-indices.service';
import { TheMovementOfMaterialIndicesGuard } from './shared/the-movement-of-material-indices.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TheMovementOfMaterialIndicesListComponent,
    TheMovementOfMaterialIndicesNewComponent,
    TheMovementOfMaterialIndicesEditComponent,
    TheMovementOfMaterialIndicesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TheMovementOfMaterialIndicesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TheMovementOfMaterialIndicesService,
    TheMovementOfMaterialIndicesGuard
  ],
  entryComponents: [
    TheMovementOfMaterialIndicesNewComponent,
    TheMovementOfMaterialIndicesEditComponent,
    TheMovementOfMaterialIndicesViewComponent
  ]
})

export class TheMovementOfMaterialIndicesModule {
}
