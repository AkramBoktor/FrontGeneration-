import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RespondToVisaListComponent } from './respond-to-visa-list/respond-to-visa-list.component';
import { RespondToVisaEditComponent } from './respond-to-visa-edit/respond-to-visa-edit.component';
import { RespondToVisaNewComponent } from './respond-to-visa-new/respond-to-visa-new.component';
import { RespondToVisaViewComponent } from './respond-to-visa-view/respond-to-visa-view.component';
import { RespondToVisaRoutingModule } from './respond-to-visa.routing.module';
import { RespondToVisaService } from './shared/respond-to-visa.service';
import { RespondToVisaGuard } from './shared/respond-to-visa.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RespondToVisaListComponent,
    RespondToVisaNewComponent,
    RespondToVisaEditComponent,
    RespondToVisaViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RespondToVisaRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RespondToVisaService,
    RespondToVisaGuard
  ],
  entryComponents: [
    RespondToVisaNewComponent,
    RespondToVisaEditComponent,
    RespondToVisaViewComponent
  ]
})

export class RespondToVisaModule {
}
