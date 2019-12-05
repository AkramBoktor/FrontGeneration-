import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssayWeightsFactorItemsListComponent } from './assay-weights-factor-items-list/assay-weights-factor-items-list.component';
import { AssayWeightsFactorItemsEditComponent } from './assay-weights-factor-items-edit/assay-weights-factor-items-edit.component';
import { AssayWeightsFactorItemsNewComponent } from './assay-weights-factor-items-new/assay-weights-factor-items-new.component';
import { AssayWeightsFactorItemsViewComponent } from './assay-weights-factor-items-view/assay-weights-factor-items-view.component';
import { AssayWeightsFactorItemsRoutingModule } from './assay-weights-factor-items.routing.module';
import { AssayWeightsFactorItemsService } from './shared/assay-weights-factor-items.service';
import { AssayWeightsFactorItemsGuard } from './shared/assay-weights-factor-items.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssayWeightsFactorItemsListComponent,
    AssayWeightsFactorItemsNewComponent,
    AssayWeightsFactorItemsEditComponent,
    AssayWeightsFactorItemsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssayWeightsFactorItemsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssayWeightsFactorItemsService,
    AssayWeightsFactorItemsGuard
  ],
  entryComponents: [
    AssayWeightsFactorItemsNewComponent,
    AssayWeightsFactorItemsEditComponent,
    AssayWeightsFactorItemsViewComponent
  ]
})

export class AssayWeightsFactorItemsModule {
}
