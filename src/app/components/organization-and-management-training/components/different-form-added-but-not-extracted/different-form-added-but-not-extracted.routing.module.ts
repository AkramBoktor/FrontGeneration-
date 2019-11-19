import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DifferentFormAddedButNotExtractedGuard } from './shared/different-form-added-but-not-extracted.guard';
import { DifferentFormAddedButNotExtractedNewComponent } from './different-form-added-but-not-extracted-new/different-form-added-but-not-extracted-new.component';
import { DifferentFormAddedButNotExtractedEditComponent } from './different-form-added-but-not-extracted-edit/different-form-added-but-not-extracted-edit.component';
import { DifferentFormAddedButNotExtractedListComponent } from './different-form-added-but-not-extracted-list/different-form-added-but-not-extracted-list.component';
import { DifferentFormAddedButNotExtractedViewComponent } from './different-form-added-but-not-extracted-view/different-form-added-but-not-extracted-view.component';

const routes: Routes = [
  {
    path: '',
    component: DifferentFormAddedButNotExtractedListComponent,
    canActivate: [DifferentFormAddedButNotExtractedGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DifferentFormAddedButNotExtractedNewComponent,
    canActivate: [DifferentFormAddedButNotExtractedGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DifferentFormAddedButNotExtractedEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DifferentFormAddedButNotExtractedListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DifferentFormAddedButNotExtractedViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DifferentFormAddedButNotExtractedRoutingModule {
}
