import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecruitmentEditComponent } from './recruitment-edit/recruitment-edit.component';
import { RecruitmentListComponent } from './recruitment-list/recruitment-list.component';
import { RecruitmentNewComponent } from './recruitment-new/recruitment-new.component';
import { RecruitmentViewComponent } from './recruitment-view/recruitment-view.component';
import { RecruitmentRoutingModule } from './recruitment.routing.module';
import { RecruitmentGuard } from './shared/recruitment.guard';
import { RecruitmentService } from './shared/recruitment.service';

@NgModule({
  declarations: [
    RecruitmentListComponent,
    RecruitmentNewComponent,
    RecruitmentEditComponent,
    RecruitmentViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecruitmentRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecruitmentService,
    RecruitmentGuard
  ],
  entryComponents: [
    RecruitmentNewComponent,
    RecruitmentEditComponent,
    RecruitmentViewComponent
  ]
})

export class RecruitmentModule {
}
