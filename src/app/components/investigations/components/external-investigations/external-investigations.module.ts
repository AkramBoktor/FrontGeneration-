import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExternalInvestigationsListComponent } from './external-investigations-list/external-investigations-list.component';
import { ExternalInvestigationsEditComponent } from './external-investigations-edit/external-investigations-edit.component';
import { ExternalInvestigationsNewComponent } from './external-investigations-new/external-investigations-new.component';
import { ExternalInvestigationsViewComponent } from './external-investigations-view/external-investigations-view.component';
import { ExternalInvestigationsRoutingModule } from './external-investigations.routing.module';
import { ExternalInvestigationsService } from './shared/external-investigations.service';
import { ExternalInvestigationsGuard } from './shared/external-investigations.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExternalInvestigationsListComponent,
    ExternalInvestigationsNewComponent,
    ExternalInvestigationsEditComponent,
    ExternalInvestigationsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExternalInvestigationsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExternalInvestigationsService,
    ExternalInvestigationsGuard
  ],
  entryComponents: [
    ExternalInvestigationsNewComponent,
    ExternalInvestigationsEditComponent,
    ExternalInvestigationsViewComponent
  ]
})

export class ExternalInvestigationsModule {
}
