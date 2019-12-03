import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContributionOfTheFundForPreviousYearsBListComponent } from './contribution-of-the-fund-for-previous-years-b-list/contribution-of-the-fund-for-previous-years-b-list.component';
import { ContributionOfTheFundForPreviousYearsBEditComponent } from './contribution-of-the-fund-for-previous-years-b-edit/contribution-of-the-fund-for-previous-years-b-edit.component';
import { ContributionOfTheFundForPreviousYearsBNewComponent } from './contribution-of-the-fund-for-previous-years-b-new/contribution-of-the-fund-for-previous-years-b-new.component';
import { ContributionOfTheFundForPreviousYearsBViewComponent } from './contribution-of-the-fund-for-previous-years-b-view/contribution-of-the-fund-for-previous-years-b-view.component';
import { ContributionOfTheFundForPreviousYearsBRoutingModule } from './contribution-of-the-fund-for-previous-years-b.routing.module';
import { ContributionOfTheFundForPreviousYearsBService } from './shared/contribution-of-the-fund-for-previous-years-b.service';
import { ContributionOfTheFundForPreviousYearsBGuard } from './shared/contribution-of-the-fund-for-previous-years-b.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContributionOfTheFundForPreviousYearsBListComponent,
    ContributionOfTheFundForPreviousYearsBNewComponent,
    ContributionOfTheFundForPreviousYearsBEditComponent,
    ContributionOfTheFundForPreviousYearsBViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContributionOfTheFundForPreviousYearsBRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContributionOfTheFundForPreviousYearsBService,
    ContributionOfTheFundForPreviousYearsBGuard
  ],
  entryComponents: [
    ContributionOfTheFundForPreviousYearsBNewComponent,
    ContributionOfTheFundForPreviousYearsBEditComponent,
    ContributionOfTheFundForPreviousYearsBViewComponent
  ]
})

export class ContributionOfTheFundForPreviousYearsBModule {
}
