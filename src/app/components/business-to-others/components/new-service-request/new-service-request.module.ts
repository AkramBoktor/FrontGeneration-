import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { NewServiceRequestListComponent } from './new-service-request-list/new-service-request-list.component';
import { NewServiceRequestEditComponent } from './new-service-request-edit/new-service-request-edit.component';
import { NewServiceRequestNewComponent } from './new-service-request-new/new-service-request-new.component';
import { NewServiceRequestViewComponent } from './new-service-request-view/new-service-request-view.component';
import { NewServiceRequestRoutingModule } from './new-service-request.routing.module';
import { NewServiceRequestService } from './shared/new-service-request.service';
import { NewServiceRequestGuard } from './shared/new-service-request.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    NewServiceRequestListComponent,
    NewServiceRequestNewComponent,
    NewServiceRequestEditComponent,
    NewServiceRequestViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    NewServiceRequestRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    NewServiceRequestService,
    NewServiceRequestGuard
  ],
  entryComponents: [
    NewServiceRequestNewComponent,
    NewServiceRequestEditComponent,
    NewServiceRequestViewComponent
  ]
})

export class NewServiceRequestModule {
}
