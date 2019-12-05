import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DecisionOfTheDirectorOfTheCommissionListComponent } from './decision-of-the-director-of-the-commission-list/decision-of-the-director-of-the-commission-list.component';
import { DecisionOfTheDirectorOfTheCommissionEditComponent } from './decision-of-the-director-of-the-commission-edit/decision-of-the-director-of-the-commission-edit.component';
import { DecisionOfTheDirectorOfTheCommissionNewComponent } from './decision-of-the-director-of-the-commission-new/decision-of-the-director-of-the-commission-new.component';
import { DecisionOfTheDirectorOfTheCommissionViewComponent } from './decision-of-the-director-of-the-commission-view/decision-of-the-director-of-the-commission-view.component';
import { DecisionOfTheDirectorOfTheCommissionRoutingModule } from './decision-of-the-director-of-the-commission.routing.module';
import { DecisionOfTheDirectorOfTheCommissionService } from './shared/decision-of-the-director-of-the-commission.service';
import { DecisionOfTheDirectorOfTheCommissionGuard } from './shared/decision-of-the-director-of-the-commission.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DecisionOfTheDirectorOfTheCommissionListComponent,
    DecisionOfTheDirectorOfTheCommissionNewComponent,
    DecisionOfTheDirectorOfTheCommissionEditComponent,
    DecisionOfTheDirectorOfTheCommissionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DecisionOfTheDirectorOfTheCommissionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DecisionOfTheDirectorOfTheCommissionService,
    DecisionOfTheDirectorOfTheCommissionGuard
  ],
  entryComponents: [
    DecisionOfTheDirectorOfTheCommissionNewComponent,
    DecisionOfTheDirectorOfTheCommissionEditComponent,
    DecisionOfTheDirectorOfTheCommissionViewComponent
  ]
})

export class DecisionOfTheDirectorOfTheCommissionModule {
}
