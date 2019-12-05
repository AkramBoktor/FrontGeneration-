import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ServiceCodesListComponent } from './service-codes-list/service-codes-list.component';
import { ServiceCodesEditComponent } from './service-codes-edit/service-codes-edit.component';
import { ServiceCodesNewComponent } from './service-codes-new/service-codes-new.component';
import { ServiceCodesViewComponent } from './service-codes-view/service-codes-view.component';
import { ServiceCodesRoutingModule } from './service-codes.routing.module';
import { ServiceCodesService } from './shared/service-codes.service';
import { ServiceCodesGuard } from './shared/service-codes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ServiceCodesListComponent,
    ServiceCodesNewComponent,
    ServiceCodesEditComponent,
    ServiceCodesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ServiceCodesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ServiceCodesService,
    ServiceCodesGuard
  ],
  entryComponents: [
    ServiceCodesNewComponent,
    ServiceCodesEditComponent,
    ServiceCodesViewComponent
  ]
})

export class ServiceCodesModule {
}
