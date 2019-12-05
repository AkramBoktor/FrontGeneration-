import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssayItemsDueToWeightsFactorListComponent } from './assay-items-due-to-weights-factor-list/assay-items-due-to-weights-factor-list.component';
import { AssayItemsDueToWeightsFactorEditComponent } from './assay-items-due-to-weights-factor-edit/assay-items-due-to-weights-factor-edit.component';
import { AssayItemsDueToWeightsFactorNewComponent } from './assay-items-due-to-weights-factor-new/assay-items-due-to-weights-factor-new.component';
import { AssayItemsDueToWeightsFactorViewComponent } from './assay-items-due-to-weights-factor-view/assay-items-due-to-weights-factor-view.component';
import { AssayItemsDueToWeightsFactorRoutingModule } from './assay-items-due-to-weights-factor.routing.module';
import { AssayItemsDueToWeightsFactorService } from './shared/assay-items-due-to-weights-factor.service';
import { AssayItemsDueToWeightsFactorGuard } from './shared/assay-items-due-to-weights-factor.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssayItemsDueToWeightsFactorListComponent,
    AssayItemsDueToWeightsFactorNewComponent,
    AssayItemsDueToWeightsFactorEditComponent,
    AssayItemsDueToWeightsFactorViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssayItemsDueToWeightsFactorRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssayItemsDueToWeightsFactorService,
    AssayItemsDueToWeightsFactorGuard
  ],
  entryComponents: [
    AssayItemsDueToWeightsFactorNewComponent,
    AssayItemsDueToWeightsFactorEditComponent,
    AssayItemsDueToWeightsFactorViewComponent
  ]
})

export class AssayItemsDueToWeightsFactorModule {
}
