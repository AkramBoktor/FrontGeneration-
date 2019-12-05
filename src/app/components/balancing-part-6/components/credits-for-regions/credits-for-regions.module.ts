import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CreditsForRegionsListComponent } from './credits-for-regions-list/credits-for-regions-list.component';
import { CreditsForRegionsEditComponent } from './credits-for-regions-edit/credits-for-regions-edit.component';
import { CreditsForRegionsNewComponent } from './credits-for-regions-new/credits-for-regions-new.component';
import { CreditsForRegionsViewComponent } from './credits-for-regions-view/credits-for-regions-view.component';
import { CreditsForRegionsRoutingModule } from './credits-for-regions.routing.module';
import { CreditsForRegionsService } from './shared/credits-for-regions.service';
import { CreditsForRegionsGuard } from './shared/credits-for-regions.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CreditsForRegionsListComponent,
    CreditsForRegionsNewComponent,
    CreditsForRegionsEditComponent,
    CreditsForRegionsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CreditsForRegionsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CreditsForRegionsService,
    CreditsForRegionsGuard
  ],
  entryComponents: [
    CreditsForRegionsNewComponent,
    CreditsForRegionsEditComponent,
    CreditsForRegionsViewComponent
  ]
})

export class CreditsForRegionsModule {
}
