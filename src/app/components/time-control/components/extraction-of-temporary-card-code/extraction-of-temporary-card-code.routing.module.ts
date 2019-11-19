import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExtractionOfTemporaryCardCodeGuard } from './shared/extraction-of-temporary-card-code.guard';
import { ExtractionOfTemporaryCardCodeNewComponent } from './extraction-of-temporary-card-code-new/extraction-of-temporary-card-code-new.component';
import { ExtractionOfTemporaryCardCodeEditComponent } from './extraction-of-temporary-card-code-edit/extraction-of-temporary-card-code-edit.component';
import { ExtractionOfTemporaryCardCodeListComponent } from './extraction-of-temporary-card-code-list/extraction-of-temporary-card-code-list.component';
import { ExtractionOfTemporaryCardCodeViewComponent } from './extraction-of-temporary-card-code-view/extraction-of-temporary-card-code-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExtractionOfTemporaryCardCodeListComponent,
    canActivate: [ExtractionOfTemporaryCardCodeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExtractionOfTemporaryCardCodeNewComponent,
    canActivate: [ExtractionOfTemporaryCardCodeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExtractionOfTemporaryCardCodeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExtractionOfTemporaryCardCodeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExtractionOfTemporaryCardCodeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExtractionOfTemporaryCardCodeRoutingModule {
}
