import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssigningTheCaseToANewLawyerEditComponent } from './assigning-the-case-to-a-new-lawyer-edit/assigning-the-case-to-a-new-lawyer-edit.component';
import { AssigningTheCaseToANewLawyerListComponent } from './assigning-the-case-to-a-new-lawyer-list/assigning-the-case-to-a-new-lawyer-list.component';
import { AssigningTheCaseToANewLawyerNewComponent } from './assigning-the-case-to-a-new-lawyer-new/assigning-the-case-to-a-new-lawyer-new.component';
import { AssigningTheCaseToANewLawyerViewComponent } from './assigning-the-case-to-a-new-lawyer-view/assigning-the-case-to-a-new-lawyer-view.component';
import { AssigningTheCaseToANewLawyerRoutingModule } from './assigning-the-case-to-a-new-lawyer.routing.module';
import { AssigningTheCaseToANewLawyerGuard } from './shared/assigning-the-case-to-a-new-lawyer.guard';
import { AssigningTheCaseToANewLawyerService } from './shared/assigning-the-case-to-a-new-lawyer.service';

@NgModule({
  declarations: [
    AssigningTheCaseToANewLawyerListComponent,
    AssigningTheCaseToANewLawyerNewComponent,
    AssigningTheCaseToANewLawyerEditComponent,
    AssigningTheCaseToANewLawyerViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssigningTheCaseToANewLawyerRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssigningTheCaseToANewLawyerService,
    AssigningTheCaseToANewLawyerGuard
  ],
  entryComponents: [
    AssigningTheCaseToANewLawyerNewComponent,
    AssigningTheCaseToANewLawyerEditComponent,
    AssigningTheCaseToANewLawyerViewComponent
  ]
})

export class AssigningTheCaseToANewLawyerModule {
}
