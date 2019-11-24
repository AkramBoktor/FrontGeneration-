import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { HostedSchoolListComponent } from './hosted-school-list/hosted-school-list.component';
import { HostedSchoolEditComponent } from './hosted-school-edit/hosted-school-edit.component';
import { HostedSchoolNewComponent } from './hosted-school-new/hosted-school-new.component';
import { HostedSchoolViewComponent } from './hosted-school-view/hosted-school-view.component';
import { HostedSchoolRoutingModule } from './hosted-school.routing.module';
import { HostedSchoolService } from './shared/hosted-school.service';
import { HostedSchoolGuard } from './shared/hosted-school.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    HostedSchoolListComponent,
    HostedSchoolNewComponent,
    HostedSchoolEditComponent,
    HostedSchoolViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    HostedSchoolRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    HostedSchoolService,
    HostedSchoolGuard
  ],
  entryComponents: [
    HostedSchoolNewComponent,
    HostedSchoolEditComponent,
    HostedSchoolViewComponent
  ]
})

export class HostedSchoolModule {
}
