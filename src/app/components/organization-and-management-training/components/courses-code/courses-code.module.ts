import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CoursesCodeListComponent } from './courses-code-list/courses-code-list.component';
import { CoursesCodeEditComponent } from './courses-code-edit/courses-code-edit.component';
import { CoursesCodeNewComponent } from './courses-code-new/courses-code-new.component';
import { CoursesCodeViewComponent } from './courses-code-view/courses-code-view.component';
import { CoursesCodeRoutingModule } from './courses-code.routing.module';
import { CoursesCodeService } from './shared/courses-code.service';
import { CoursesCodeGuard } from './shared/courses-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CoursesCodeListComponent,
    CoursesCodeNewComponent,
    CoursesCodeEditComponent,
    CoursesCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CoursesCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CoursesCodeService,
    CoursesCodeGuard
  ],
  entryComponents: [
    CoursesCodeNewComponent,
    CoursesCodeEditComponent,
    CoursesCodeViewComponent
  ]
})

export class CoursesCodeModule {
}
