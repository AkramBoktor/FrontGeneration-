import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AgendaInternalListComponent } from './agenda-internal-list/agenda-internal-list.component';
import { AgendaInternalEditComponent } from './agenda-internal-edit/agenda-internal-edit.component';
import { AgendaInternalNewComponent } from './agenda-internal-new/agenda-internal-new.component';
import { AgendaInternalViewComponent } from './agenda-internal-view/agenda-internal-view.component';
import { AgendaInternalRoutingModule } from './agenda-internal.routing.module';
import { AgendaInternalService } from './shared/agenda-internal.service';
import { AgendaInternalGuard } from './shared/agenda-internal.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AgendaInternalListComponent,
    AgendaInternalNewComponent,
    AgendaInternalEditComponent,
    AgendaInternalViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AgendaInternalRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AgendaInternalService,
    AgendaInternalGuard
  ],
  entryComponents: [
    AgendaInternalNewComponent,
    AgendaInternalEditComponent,
    AgendaInternalViewComponent
  ]
})

export class AgendaInternalModule {
}
