import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ExternalBodiesEquippedForSchoolsListComponent } from './external-bodies-equipped-for-schools-list/external-bodies-equipped-for-schools-list.component';
import { ExternalBodiesEquippedForSchoolsEditComponent } from './external-bodies-equipped-for-schools-edit/external-bodies-equipped-for-schools-edit.component';
import { ExternalBodiesEquippedForSchoolsNewComponent } from './external-bodies-equipped-for-schools-new/external-bodies-equipped-for-schools-new.component';
import { ExternalBodiesEquippedForSchoolsViewComponent } from './external-bodies-equipped-for-schools-view/external-bodies-equipped-for-schools-view.component';
import { ExternalBodiesEquippedForSchoolsRoutingModule } from './external-bodies-equipped-for-schools.routing.module';
import { ExternalBodiesEquippedForSchoolsService } from './shared/external-bodies-equipped-for-schools.service';
import { ExternalBodiesEquippedForSchoolsGuard } from './shared/external-bodies-equipped-for-schools.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ExternalBodiesEquippedForSchoolsListComponent,
    ExternalBodiesEquippedForSchoolsNewComponent,
    ExternalBodiesEquippedForSchoolsEditComponent,
    ExternalBodiesEquippedForSchoolsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ExternalBodiesEquippedForSchoolsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ExternalBodiesEquippedForSchoolsService,
    ExternalBodiesEquippedForSchoolsGuard
  ],
  entryComponents: [
    ExternalBodiesEquippedForSchoolsNewComponent,
    ExternalBodiesEquippedForSchoolsEditComponent,
    ExternalBodiesEquippedForSchoolsViewComponent
  ]
})

export class ExternalBodiesEquippedForSchoolsModule {
}
