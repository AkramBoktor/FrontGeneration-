import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DifferentFormNotExtractedGuard } from './shared/different-form-not-extracted.guard';
import { DifferentFormNotExtractedNewComponent } from './different-form-not-extracted-new/different-form-not-extracted-new.component';
import { DifferentFormNotExtractedEditComponent } from './different-form-not-extracted-edit/different-form-not-extracted-edit.component';
import { DifferentFormNotExtractedListComponent } from './different-form-not-extracted-list/different-form-not-extracted-list.component';
import { DifferentFormNotExtractedViewComponent } from './different-form-not-extracted-view/different-form-not-extracted-view.component';

const routes: Routes = [
  {
    path: '',
    component: DifferentFormNotExtractedListComponent,
    canActivate: [DifferentFormNotExtractedGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DifferentFormNotExtractedNewComponent,
    canActivate: [DifferentFormNotExtractedGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DifferentFormNotExtractedEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DifferentFormNotExtractedListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DifferentFormNotExtractedViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DifferentFormNotExtractedRoutingModule {
}
