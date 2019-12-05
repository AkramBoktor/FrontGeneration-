import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentListComponent } from './the-source-of-funding-for-an-annual-plan-project-component-list/the-source-of-funding-for-an-annual-plan-project-component-list.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent } from './the-source-of-funding-for-an-annual-plan-project-component-edit/the-source-of-funding-for-an-annual-plan-project-component-edit.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent } from './the-source-of-funding-for-an-annual-plan-project-component-new/the-source-of-funding-for-an-annual-plan-project-component-new.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent } from './the-source-of-funding-for-an-annual-plan-project-component-view/the-source-of-funding-for-an-annual-plan-project-component-view.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentRoutingModule } from './the-source-of-funding-for-an-annual-plan-project-component.routing.module';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentService } from './shared/the-source-of-funding-for-an-annual-plan-project-component.service';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentGuard } from './shared/the-source-of-funding-for-an-annual-plan-project-component.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TheSourceOfFundingForAnAnnualPlanProjectComponentListComponent,
    TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent,
    TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent,
    TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TheSourceOfFundingForAnAnnualPlanProjectComponentRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TheSourceOfFundingForAnAnnualPlanProjectComponentService,
    TheSourceOfFundingForAnAnnualPlanProjectComponentGuard
  ],
  entryComponents: [
    TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent,
    TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent,
    TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent
  ]
})

export class TheSourceOfFundingForAnAnnualPlanProjectComponentModule {
}
