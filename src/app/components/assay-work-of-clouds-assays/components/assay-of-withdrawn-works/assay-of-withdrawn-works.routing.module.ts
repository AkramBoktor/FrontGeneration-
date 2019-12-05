import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayOfWithdrawnWorksGuard } from './shared/assay-of-withdrawn-works.guard';
import { AssayOfWithdrawnWorksNewComponent } from './assay-of-withdrawn-works-new/assay-of-withdrawn-works-new.component';
import { AssayOfWithdrawnWorksEditComponent } from './assay-of-withdrawn-works-edit/assay-of-withdrawn-works-edit.component';
import { AssayOfWithdrawnWorksListComponent } from './assay-of-withdrawn-works-list/assay-of-withdrawn-works-list.component';
import { AssayOfWithdrawnWorksViewComponent } from './assay-of-withdrawn-works-view/assay-of-withdrawn-works-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssayOfWithdrawnWorksListComponent,
    canActivate: [AssayOfWithdrawnWorksGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssayOfWithdrawnWorksNewComponent,
    canActivate: [AssayOfWithdrawnWorksGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssayOfWithdrawnWorksEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssayOfWithdrawnWorksListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssayOfWithdrawnWorksViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayOfWithdrawnWorksRoutingModule {
}
