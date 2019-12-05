import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FundingSourceListComponent } from './funding-source-list/funding-source-list.component';
import { FundingSourceEditComponent } from './funding-source-edit/funding-source-edit.component';
import { FundingSourceNewComponent } from './funding-source-new/funding-source-new.component';
import { FundingSourceViewComponent } from './funding-source-view/funding-source-view.component';
import { FundingSourceRoutingModule } from './funding-source.routing.module';
import { FundingSourceService } from './shared/funding-source.service';
import { FundingSourceGuard } from './shared/funding-source.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FundingSourceListComponent,
    FundingSourceNewComponent,
    FundingSourceEditComponent,
    FundingSourceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FundingSourceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FundingSourceService,
    FundingSourceGuard
  ],
  entryComponents: [
    FundingSourceNewComponent,
    FundingSourceEditComponent,
    FundingSourceViewComponent
  ]
})

export class FundingSourceModule {
}
