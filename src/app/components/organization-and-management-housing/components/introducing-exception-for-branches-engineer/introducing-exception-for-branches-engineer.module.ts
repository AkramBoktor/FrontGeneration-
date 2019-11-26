import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IntroducingExceptionForBranchesEngineerListComponent } from './introducing-exception-for-branches-engineer-list/introducing-exception-for-branches-engineer-list.component';
import { IntroducingExceptionForBranchesEngineerEditComponent } from './introducing-exception-for-branches-engineer-edit/introducing-exception-for-branches-engineer-edit.component';
import { IntroducingExceptionForBranchesEngineerNewComponent } from './introducing-exception-for-branches-engineer-new/introducing-exception-for-branches-engineer-new.component';
import { IntroducingExceptionForBranchesEngineerViewComponent } from './introducing-exception-for-branches-engineer-view/introducing-exception-for-branches-engineer-view.component';
import { IntroducingExceptionForBranchesEngineerRoutingModule } from './introducing-exception-for-branches-engineer.routing.module';
import { IntroducingExceptionForBranchesEngineerService } from './shared/introducing-exception-for-branches-engineer.service';
import { IntroducingExceptionForBranchesEngineerGuard } from './shared/introducing-exception-for-branches-engineer.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IntroducingExceptionForBranchesEngineerListComponent,
    IntroducingExceptionForBranchesEngineerNewComponent,
    IntroducingExceptionForBranchesEngineerEditComponent,
    IntroducingExceptionForBranchesEngineerViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IntroducingExceptionForBranchesEngineerRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IntroducingExceptionForBranchesEngineerService,
    IntroducingExceptionForBranchesEngineerGuard
  ],
  entryComponents: [
    IntroducingExceptionForBranchesEngineerNewComponent,
    IntroducingExceptionForBranchesEngineerEditComponent,
    IntroducingExceptionForBranchesEngineerViewComponent
  ]
})

export class IntroducingExceptionForBranchesEngineerModule {
}
