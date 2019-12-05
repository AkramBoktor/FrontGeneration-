import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AgendaExternalListComponent } from './agenda-external-list/agenda-external-list.component';
import { AgendaExternalEditComponent } from './agenda-external-edit/agenda-external-edit.component';
import { AgendaExternalNewComponent } from './agenda-external-new/agenda-external-new.component';
import { AgendaExternalViewComponent } from './agenda-external-view/agenda-external-view.component';
import { AgendaExternalRoutingModule } from './agenda-external.routing.module';
import { AgendaExternalService } from './shared/agenda-external.service';
import { AgendaExternalGuard } from './shared/agenda-external.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AgendaExternalListComponent,
    AgendaExternalNewComponent,
    AgendaExternalEditComponent,
    AgendaExternalViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AgendaExternalRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AgendaExternalService,
    AgendaExternalGuard
  ],
  entryComponents: [
    AgendaExternalNewComponent,
    AgendaExternalEditComponent,
    AgendaExternalViewComponent
  ]
})

export class AgendaExternalModule {
}
