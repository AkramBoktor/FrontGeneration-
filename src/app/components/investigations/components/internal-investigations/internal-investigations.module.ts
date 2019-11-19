import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { InternalInvestigationsListComponent } from './internal-investigations-list/internal-investigations-list.component';
import { InternalInvestigationsEditComponent } from './internal-investigations-edit/internal-investigations-edit.component';
import { InternalInvestigationsNewComponent } from './internal-investigations-new/internal-investigations-new.component';
import { InternalInvestigationsViewComponent } from './internal-investigations-view/internal-investigations-view.component';
import { InternalInvestigationsRoutingModule } from './internal-investigations.routing.module';
import { InternalInvestigationsService } from './shared/internal-investigations.service';
import { InternalInvestigationsGuard } from './shared/internal-investigations.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    InternalInvestigationsListComponent,
    InternalInvestigationsNewComponent,
    InternalInvestigationsEditComponent,
    InternalInvestigationsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    InternalInvestigationsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    InternalInvestigationsService,
    InternalInvestigationsGuard
  ],
  entryComponents: [
    InternalInvestigationsNewComponent,
    InternalInvestigationsEditComponent,
    InternalInvestigationsViewComponent
  ]
})

export class InternalInvestigationsModule {
}
