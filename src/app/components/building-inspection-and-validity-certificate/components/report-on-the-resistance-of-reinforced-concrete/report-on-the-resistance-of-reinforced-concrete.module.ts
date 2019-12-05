import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ReportOnTheResistanceOfReinforcedConcreteListComponent } from './report-on-the-resistance-of-reinforced-concrete-list/report-on-the-resistance-of-reinforced-concrete-list.component';
import { ReportOnTheResistanceOfReinforcedConcreteEditComponent } from './report-on-the-resistance-of-reinforced-concrete-edit/report-on-the-resistance-of-reinforced-concrete-edit.component';
import { ReportOnTheResistanceOfReinforcedConcreteNewComponent } from './report-on-the-resistance-of-reinforced-concrete-new/report-on-the-resistance-of-reinforced-concrete-new.component';
import { ReportOnTheResistanceOfReinforcedConcreteViewComponent } from './report-on-the-resistance-of-reinforced-concrete-view/report-on-the-resistance-of-reinforced-concrete-view.component';
import { ReportOnTheResistanceOfReinforcedConcreteRoutingModule } from './report-on-the-resistance-of-reinforced-concrete.routing.module';
import { ReportOnTheResistanceOfReinforcedConcreteService } from './shared/report-on-the-resistance-of-reinforced-concrete.service';
import { ReportOnTheResistanceOfReinforcedConcreteGuard } from './shared/report-on-the-resistance-of-reinforced-concrete.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ReportOnTheResistanceOfReinforcedConcreteListComponent,
    ReportOnTheResistanceOfReinforcedConcreteNewComponent,
    ReportOnTheResistanceOfReinforcedConcreteEditComponent,
    ReportOnTheResistanceOfReinforcedConcreteViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ReportOnTheResistanceOfReinforcedConcreteRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ReportOnTheResistanceOfReinforcedConcreteService,
    ReportOnTheResistanceOfReinforcedConcreteGuard
  ],
  entryComponents: [
    ReportOnTheResistanceOfReinforcedConcreteNewComponent,
    ReportOnTheResistanceOfReinforcedConcreteEditComponent,
    ReportOnTheResistanceOfReinforcedConcreteViewComponent
  ]
})

export class ReportOnTheResistanceOfReinforcedConcreteModule {
}
