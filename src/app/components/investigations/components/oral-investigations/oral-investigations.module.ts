import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { OralInvestigationsListComponent } from './oral-investigations-list/oral-investigations-list.component';
import { OralInvestigationsEditComponent } from './oral-investigations-edit/oral-investigations-edit.component';
import { OralInvestigationsNewComponent } from './oral-investigations-new/oral-investigations-new.component';
import { OralInvestigationsViewComponent } from './oral-investigations-view/oral-investigations-view.component';
import { OralInvestigationsRoutingModule } from './oral-investigations.routing.module';
import { OralInvestigationsService } from './shared/oral-investigations.service';
import { OralInvestigationsGuard } from './shared/oral-investigations.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    OralInvestigationsListComponent,
    OralInvestigationsNewComponent,
    OralInvestigationsEditComponent,
    OralInvestigationsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    OralInvestigationsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    OralInvestigationsService,
    OralInvestigationsGuard
  ],
  entryComponents: [
    OralInvestigationsNewComponent,
    OralInvestigationsEditComponent,
    OralInvestigationsViewComponent
  ]
})

export class OralInvestigationsModule {
}
