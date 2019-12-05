import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DeviceCancellationListComponent } from './device-cancellation-list/device-cancellation-list.component';
import { DeviceCancellationEditComponent } from './device-cancellation-edit/device-cancellation-edit.component';
import { DeviceCancellationNewComponent } from './device-cancellation-new/device-cancellation-new.component';
import { DeviceCancellationViewComponent } from './device-cancellation-view/device-cancellation-view.component';
import { DeviceCancellationRoutingModule } from './device-cancellation.routing.module';
import { DeviceCancellationService } from './shared/device-cancellation.service';
import { DeviceCancellationGuard } from './shared/device-cancellation.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DeviceCancellationListComponent,
    DeviceCancellationNewComponent,
    DeviceCancellationEditComponent,
    DeviceCancellationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DeviceCancellationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DeviceCancellationService,
    DeviceCancellationGuard
  ],
  entryComponents: [
    DeviceCancellationNewComponent,
    DeviceCancellationEditComponent,
    DeviceCancellationViewComponent
  ]
})

export class DeviceCancellationModule {
}
