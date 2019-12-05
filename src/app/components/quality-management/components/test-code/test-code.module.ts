import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TestCodeListComponent } from './test-code-list/test-code-list.component';
import { TestCodeEditComponent } from './test-code-edit/test-code-edit.component';
import { TestCodeNewComponent } from './test-code-new/test-code-new.component';
import { TestCodeViewComponent } from './test-code-view/test-code-view.component';
import { TestCodeRoutingModule } from './test-code.routing.module';
import { TestCodeService } from './shared/test-code.service';
import { TestCodeGuard } from './shared/test-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TestCodeListComponent,
    TestCodeNewComponent,
    TestCodeEditComponent,
    TestCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TestCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TestCodeService,
    TestCodeGuard
  ],
  entryComponents: [
    TestCodeNewComponent,
    TestCodeEditComponent,
    TestCodeViewComponent
  ]
})

export class TestCodeModule {
}
