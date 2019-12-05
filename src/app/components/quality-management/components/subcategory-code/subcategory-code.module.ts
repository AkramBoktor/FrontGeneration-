import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubcategoryCodeListComponent } from './subcategory-code-list/subcategory-code-list.component';
import { SubcategoryCodeEditComponent } from './subcategory-code-edit/subcategory-code-edit.component';
import { SubcategoryCodeNewComponent } from './subcategory-code-new/subcategory-code-new.component';
import { SubcategoryCodeViewComponent } from './subcategory-code-view/subcategory-code-view.component';
import { SubcategoryCodeRoutingModule } from './subcategory-code.routing.module';
import { SubcategoryCodeService } from './shared/subcategory-code.service';
import { SubcategoryCodeGuard } from './shared/subcategory-code.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubcategoryCodeListComponent,
    SubcategoryCodeNewComponent,
    SubcategoryCodeEditComponent,
    SubcategoryCodeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubcategoryCodeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubcategoryCodeService,
    SubcategoryCodeGuard
  ],
  entryComponents: [
    SubcategoryCodeNewComponent,
    SubcategoryCodeEditComponent,
    SubcategoryCodeViewComponent
  ]
})

export class SubcategoryCodeModule {
}
