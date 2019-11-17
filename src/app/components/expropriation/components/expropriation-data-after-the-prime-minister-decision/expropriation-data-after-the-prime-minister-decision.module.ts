import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExpropriationDataAfterThePrimeMinisterDecisionListComponent } from './expropriation-data-after-the-prime-minister-decision-list/expropriation-data-after-the-prime-minister-decision-list.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionEditComponent } from './expropriation-data-after-the-prime-minister-decision-edit/expropriation-data-after-the-prime-minister-decision-edit.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionNewComponent } from './expropriation-data-after-the-prime-minister-decision-new/expropriation-data-after-the-prime-minister-decision-new.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionViewComponent } from './expropriation-data-after-the-prime-minister-decision-view/expropriation-data-after-the-prime-minister-decision-view.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionRoutingModule } from './expropriation-data-after-the-prime-minister-decision.routing.module';
import { ExpropriationDataAfterThePrimeMinisterDecisionService } from './shared/expropriation-data-after-the-prime-minister-decision.service';
import { ExpropriationDataAfterThePrimeMinisterDecisionGuard } from './shared/expropriation-data-after-the-prime-minister-decision.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExpropriationDataAfterThePrimeMinisterDecisionListComponent,
    ExpropriationDataAfterThePrimeMinisterDecisionNewComponent,
    ExpropriationDataAfterThePrimeMinisterDecisionEditComponent,
    ExpropriationDataAfterThePrimeMinisterDecisionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExpropriationDataAfterThePrimeMinisterDecisionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExpropriationDataAfterThePrimeMinisterDecisionService,
    ExpropriationDataAfterThePrimeMinisterDecisionGuard
  ],
  entryComponents: [
    ExpropriationDataAfterThePrimeMinisterDecisionNewComponent,
    ExpropriationDataAfterThePrimeMinisterDecisionEditComponent,
    ExpropriationDataAfterThePrimeMinisterDecisionViewComponent
  ]
})

export class ExpropriationDataAfterThePrimeMinisterDecisionModule {
}
