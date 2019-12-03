import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { WeightsFactorListComponent } from './weights-factor-list/weights-factor-list.component';
import { WeightsFactorEditComponent } from './weights-factor-edit/weights-factor-edit.component';
import { WeightsFactorNewComponent } from './weights-factor-new/weights-factor-new.component';
import { WeightsFactorViewComponent } from './weights-factor-view/weights-factor-view.component';
import { WeightsFactorRoutingModule } from './weights-factor.routing.module';
import { WeightsFactorService } from './shared/weights-factor.service';
import { WeightsFactorGuard } from './shared/weights-factor.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    WeightsFactorListComponent,
    WeightsFactorNewComponent,
    WeightsFactorEditComponent,
    WeightsFactorViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    WeightsFactorRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    WeightsFactorService,
    WeightsFactorGuard
  ],
  entryComponents: [
    WeightsFactorNewComponent,
    WeightsFactorEditComponent,
    WeightsFactorViewComponent
  ]
})

export class WeightsFactorModule {
}
