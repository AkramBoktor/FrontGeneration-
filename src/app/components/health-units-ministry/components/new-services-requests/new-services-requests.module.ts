import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { NewServicesRequestsListComponent } from './new-services-requests-list/new-services-requests-list.component';
import { NewServicesRequestsEditComponent } from './new-services-requests-edit/new-services-requests-edit.component';
import { NewServicesRequestsNewComponent } from './new-services-requests-new/new-services-requests-new.component';
import { NewServicesRequestsViewComponent } from './new-services-requests-view/new-services-requests-view.component';
import { NewServicesRequestsRoutingModule } from './new-services-requests.routing.module';
import { NewServicesRequestsService } from './shared/new-services-requests.service';
import { NewServicesRequestsGuard } from './shared/new-services-requests.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    NewServicesRequestsListComponent,
    NewServicesRequestsNewComponent,
    NewServicesRequestsEditComponent,
    NewServicesRequestsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    NewServicesRequestsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    NewServicesRequestsService,
    NewServicesRequestsGuard
  ],
  entryComponents: [
    NewServicesRequestsNewComponent,
    NewServicesRequestsEditComponent,
    NewServicesRequestsViewComponent
  ]
})

export class NewServicesRequestsModule {
}
