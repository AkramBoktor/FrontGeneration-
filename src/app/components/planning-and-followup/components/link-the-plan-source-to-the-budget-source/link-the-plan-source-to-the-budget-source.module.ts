import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LinkThePlanSourceToTheBudgetSourceListComponent } from './link-the-plan-source-to-the-budget-source-list/link-the-plan-source-to-the-budget-source-list.component';
import { LinkThePlanSourceToTheBudgetSourceEditComponent } from './link-the-plan-source-to-the-budget-source-edit/link-the-plan-source-to-the-budget-source-edit.component';
import { LinkThePlanSourceToTheBudgetSourceNewComponent } from './link-the-plan-source-to-the-budget-source-new/link-the-plan-source-to-the-budget-source-new.component';
import { LinkThePlanSourceToTheBudgetSourceViewComponent } from './link-the-plan-source-to-the-budget-source-view/link-the-plan-source-to-the-budget-source-view.component';
import { LinkThePlanSourceToTheBudgetSourceRoutingModule } from './link-the-plan-source-to-the-budget-source.routing.module';
import { LinkThePlanSourceToTheBudgetSourceService } from './shared/link-the-plan-source-to-the-budget-source.service';
import { LinkThePlanSourceToTheBudgetSourceGuard } from './shared/link-the-plan-source-to-the-budget-source.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LinkThePlanSourceToTheBudgetSourceListComponent,
    LinkThePlanSourceToTheBudgetSourceNewComponent,
    LinkThePlanSourceToTheBudgetSourceEditComponent,
    LinkThePlanSourceToTheBudgetSourceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LinkThePlanSourceToTheBudgetSourceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LinkThePlanSourceToTheBudgetSourceService,
    LinkThePlanSourceToTheBudgetSourceGuard
  ],
  entryComponents: [
    LinkThePlanSourceToTheBudgetSourceNewComponent,
    LinkThePlanSourceToTheBudgetSourceEditComponent,
    LinkThePlanSourceToTheBudgetSourceViewComponent
  ]
})

export class LinkThePlanSourceToTheBudgetSourceModule {
}
