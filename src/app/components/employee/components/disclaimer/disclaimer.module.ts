import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DisclaimerEditComponent } from './disclaimer-edit/disclaimer-edit.component';
import { DisclaimerListComponent } from './disclaimer-list/disclaimer-list.component';
import { DisclaimerNewComponent } from './disclaimer-new/disclaimer-new.component';
import { DisclaimerViewComponent } from './disclaimer-view/disclaimer-view.component';
import { DisclaimerRoutingModule } from './disclaimer.routing.module';
import { DisclaimerGuard } from './shared/disclaimer.guard';
import { DisclaimerService } from './shared/disclaimer.service';

@NgModule({
  declarations: [
    DisclaimerListComponent,
    DisclaimerNewComponent,
    DisclaimerEditComponent,
    DisclaimerViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DisclaimerRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DisclaimerService,
    DisclaimerGuard
  ],
  entryComponents: [
    DisclaimerNewComponent,
    DisclaimerEditComponent,
    DisclaimerViewComponent
  ]
})

export class DisclaimerModule {
}
