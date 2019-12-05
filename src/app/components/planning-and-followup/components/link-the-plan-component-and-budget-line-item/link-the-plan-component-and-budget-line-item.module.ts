import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LinkThePlanComponentAndBudgetLineItemListComponent } from './link-the-plan-component-and-budget-line-item-list/link-the-plan-component-and-budget-line-item-list.component';
import { LinkThePlanComponentAndBudgetLineItemEditComponent } from './link-the-plan-component-and-budget-line-item-edit/link-the-plan-component-and-budget-line-item-edit.component';
import { LinkThePlanComponentAndBudgetLineItemNewComponent } from './link-the-plan-component-and-budget-line-item-new/link-the-plan-component-and-budget-line-item-new.component';
import { LinkThePlanComponentAndBudgetLineItemViewComponent } from './link-the-plan-component-and-budget-line-item-view/link-the-plan-component-and-budget-line-item-view.component';
import { LinkThePlanComponentAndBudgetLineItemRoutingModule } from './link-the-plan-component-and-budget-line-item.routing.module';
import { LinkThePlanComponentAndBudgetLineItemService } from './shared/link-the-plan-component-and-budget-line-item.service';
import { LinkThePlanComponentAndBudgetLineItemGuard } from './shared/link-the-plan-component-and-budget-line-item.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LinkThePlanComponentAndBudgetLineItemListComponent,
    LinkThePlanComponentAndBudgetLineItemNewComponent,
    LinkThePlanComponentAndBudgetLineItemEditComponent,
    LinkThePlanComponentAndBudgetLineItemViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LinkThePlanComponentAndBudgetLineItemRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LinkThePlanComponentAndBudgetLineItemService,
    LinkThePlanComponentAndBudgetLineItemGuard
  ],
  entryComponents: [
    LinkThePlanComponentAndBudgetLineItemNewComponent,
    LinkThePlanComponentAndBudgetLineItemEditComponent,
    LinkThePlanComponentAndBudgetLineItemViewComponent
  ]
})

export class LinkThePlanComponentAndBudgetLineItemModule {
}
