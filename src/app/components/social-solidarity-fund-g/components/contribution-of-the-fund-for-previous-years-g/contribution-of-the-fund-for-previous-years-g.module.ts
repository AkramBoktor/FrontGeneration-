import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContributionOfTheFundForPreviousYearsGListComponent } from './contribution-of-the-fund-for-previous-years-g-list/contribution-of-the-fund-for-previous-years-g-list.component';
import { ContributionOfTheFundForPreviousYearsGEditComponent } from './contribution-of-the-fund-for-previous-years-g-edit/contribution-of-the-fund-for-previous-years-g-edit.component';
import { ContributionOfTheFundForPreviousYearsGNewComponent } from './contribution-of-the-fund-for-previous-years-g-new/contribution-of-the-fund-for-previous-years-g-new.component';
import { ContributionOfTheFundForPreviousYearsGViewComponent } from './contribution-of-the-fund-for-previous-years-g-view/contribution-of-the-fund-for-previous-years-g-view.component';
import { ContributionOfTheFundForPreviousYearsGRoutingModule } from './contribution-of-the-fund-for-previous-years-g.routing.module';
import { ContributionOfTheFundForPreviousYearsGService } from './shared/contribution-of-the-fund-for-previous-years-g.service';
import { ContributionOfTheFundForPreviousYearsGGuard } from './shared/contribution-of-the-fund-for-previous-years-g.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContributionOfTheFundForPreviousYearsGListComponent,
    ContributionOfTheFundForPreviousYearsGNewComponent,
    ContributionOfTheFundForPreviousYearsGEditComponent,
    ContributionOfTheFundForPreviousYearsGViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContributionOfTheFundForPreviousYearsGRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContributionOfTheFundForPreviousYearsGService,
    ContributionOfTheFundForPreviousYearsGGuard
  ],
  entryComponents: [
    ContributionOfTheFundForPreviousYearsGNewComponent,
    ContributionOfTheFundForPreviousYearsGEditComponent,
    ContributionOfTheFundForPreviousYearsGViewComponent
  ]
})

export class ContributionOfTheFundForPreviousYearsGModule {
}
