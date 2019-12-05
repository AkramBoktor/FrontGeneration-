import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FundsFromAFundingSourceListComponent } from './funds-from-a-funding-source-list/funds-from-a-funding-source-list.component';
import { FundsFromAFundingSourceEditComponent } from './funds-from-a-funding-source-edit/funds-from-a-funding-source-edit.component';
import { FundsFromAFundingSourceNewComponent } from './funds-from-a-funding-source-new/funds-from-a-funding-source-new.component';
import { FundsFromAFundingSourceViewComponent } from './funds-from-a-funding-source-view/funds-from-a-funding-source-view.component';
import { FundsFromAFundingSourceRoutingModule } from './funds-from-a-funding-source.routing.module';
import { FundsFromAFundingSourceService } from './shared/funds-from-a-funding-source.service';
import { FundsFromAFundingSourceGuard } from './shared/funds-from-a-funding-source.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FundsFromAFundingSourceListComponent,
    FundsFromAFundingSourceNewComponent,
    FundsFromAFundingSourceEditComponent,
    FundsFromAFundingSourceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FundsFromAFundingSourceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FundsFromAFundingSourceService,
    FundsFromAFundingSourceGuard
  ],
  entryComponents: [
    FundsFromAFundingSourceNewComponent,
    FundsFromAFundingSourceEditComponent,
    FundsFromAFundingSourceViewComponent
  ]
})

export class FundsFromAFundingSourceModule {
}
