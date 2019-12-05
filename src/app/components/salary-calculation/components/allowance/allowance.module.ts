import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AllowanceListComponent } from './allowance-list/allowance-list.component';
import { AllowanceEditComponent } from './allowance-edit/allowance-edit.component';
import { AllowanceNewComponent } from './allowance-new/allowance-new.component';
import { AllowanceViewComponent } from './allowance-view/allowance-view.component';
import { AllowanceRoutingModule } from './allowance.routing.module';
import { AllowanceService } from './shared/allowance.service';
import { AllowanceGuard } from './shared/allowance.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AllowanceListComponent,
    AllowanceNewComponent,
    AllowanceEditComponent,
    AllowanceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AllowanceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AllowanceService,
    AllowanceGuard
  ],
  entryComponents: [
    AllowanceNewComponent,
    AllowanceEditComponent,
    AllowanceViewComponent
  ]
})

export class AllowanceModule {
}
