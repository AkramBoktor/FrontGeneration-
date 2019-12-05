import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContributionOfTheFundForPreviousYearsAListComponent } from './contribution-of-the-fund-for-previous-years-a-list/contribution-of-the-fund-for-previous-years-a-list.component';
import { ContributionOfTheFundForPreviousYearsAEditComponent } from './contribution-of-the-fund-for-previous-years-a-edit/contribution-of-the-fund-for-previous-years-a-edit.component';
import { ContributionOfTheFundForPreviousYearsANewComponent } from './contribution-of-the-fund-for-previous-years-a-new/contribution-of-the-fund-for-previous-years-a-new.component';
import { ContributionOfTheFundForPreviousYearsAViewComponent } from './contribution-of-the-fund-for-previous-years-a-view/contribution-of-the-fund-for-previous-years-a-view.component';
import { ContributionOfTheFundForPreviousYearsARoutingModule } from './contribution-of-the-fund-for-previous-years-a.routing.module';
import { ContributionOfTheFundForPreviousYearsAService } from './shared/contribution-of-the-fund-for-previous-years-a.service';
import { ContributionOfTheFundForPreviousYearsAGuard } from './shared/contribution-of-the-fund-for-previous-years-a.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContributionOfTheFundForPreviousYearsAListComponent,
    ContributionOfTheFundForPreviousYearsANewComponent,
    ContributionOfTheFundForPreviousYearsAEditComponent,
    ContributionOfTheFundForPreviousYearsAViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContributionOfTheFundForPreviousYearsARoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContributionOfTheFundForPreviousYearsAService,
    ContributionOfTheFundForPreviousYearsAGuard
  ],
  entryComponents: [
    ContributionOfTheFundForPreviousYearsANewComponent,
    ContributionOfTheFundForPreviousYearsAEditComponent,
    ContributionOfTheFundForPreviousYearsAViewComponent
  ]
})

export class ContributionOfTheFundForPreviousYearsAModule {
}
