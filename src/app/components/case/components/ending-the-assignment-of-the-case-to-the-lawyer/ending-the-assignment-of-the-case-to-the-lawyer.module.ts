import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EndingTheAssignmentOfTheCaseToTheLawyerEditComponent } from './ending-the-assignment-of-the-case-to-the-lawyer-edit/ending-the-assignment-of-the-case-to-the-lawyer-edit.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerListComponent } from './ending-the-assignment-of-the-case-to-the-lawyer-list/ending-the-assignment-of-the-case-to-the-lawyer-list.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerNewComponent } from './ending-the-assignment-of-the-case-to-the-lawyer-new/ending-the-assignment-of-the-case-to-the-lawyer-new.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerViewComponent } from './ending-the-assignment-of-the-case-to-the-lawyer-view/ending-the-assignment-of-the-case-to-the-lawyer-view.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerRoutingModule } from './ending-the-assignment-of-the-case-to-the-lawyer.routing.module';
import { EndingTheAssignmentOfTheCaseToTheLawyerGuard } from './shared/ending-the-assignment-of-the-case-to-the-lawyer.guard';
import { EndingTheAssignmentOfTheCaseToTheLawyerService } from './shared/ending-the-assignment-of-the-case-to-the-lawyer.service';

@NgModule({
  declarations: [
    EndingTheAssignmentOfTheCaseToTheLawyerListComponent,
    EndingTheAssignmentOfTheCaseToTheLawyerNewComponent,
    EndingTheAssignmentOfTheCaseToTheLawyerEditComponent,
    EndingTheAssignmentOfTheCaseToTheLawyerViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EndingTheAssignmentOfTheCaseToTheLawyerRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EndingTheAssignmentOfTheCaseToTheLawyerService,
    EndingTheAssignmentOfTheCaseToTheLawyerGuard
  ],
  entryComponents: [
    EndingTheAssignmentOfTheCaseToTheLawyerNewComponent,
    EndingTheAssignmentOfTheCaseToTheLawyerEditComponent,
    EndingTheAssignmentOfTheCaseToTheLawyerViewComponent
  ]
})

export class EndingTheAssignmentOfTheCaseToTheLawyerModule {
}
