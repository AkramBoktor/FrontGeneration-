import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OfficesFromThePostOfficeGuard } from './shared/offices-from-the-post-office.guard';
import { OfficesFromThePostOfficeNewComponent } from './offices-from-the-post-office-new/offices-from-the-post-office-new.component';
import { OfficesFromThePostOfficeEditComponent } from './offices-from-the-post-office-edit/offices-from-the-post-office-edit.component';
import { OfficesFromThePostOfficeListComponent } from './offices-from-the-post-office-list/offices-from-the-post-office-list.component';
import { OfficesFromThePostOfficeViewComponent } from './offices-from-the-post-office-view/offices-from-the-post-office-view.component';

const routes: Routes = [
  {
    path: '',
    component: OfficesFromThePostOfficeListComponent,
    canActivate: [OfficesFromThePostOfficeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: OfficesFromThePostOfficeNewComponent,
    canActivate: [OfficesFromThePostOfficeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: OfficesFromThePostOfficeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: OfficesFromThePostOfficeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: OfficesFromThePostOfficeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OfficesFromThePostOfficeRoutingModule {
}
