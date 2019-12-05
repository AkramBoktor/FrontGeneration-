import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeGuard } from './shared/the-position-of-the-offices-received-from-the-post-office.guard';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeNewComponent } from './the-position-of-the-offices-received-from-the-post-office-new/the-position-of-the-offices-received-from-the-post-office-new.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent } from './the-position-of-the-offices-received-from-the-post-office-edit/the-position-of-the-offices-received-from-the-post-office-edit.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeListComponent } from './the-position-of-the-offices-received-from-the-post-office-list/the-position-of-the-offices-received-from-the-post-office-list.component';
import { ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent } from './the-position-of-the-offices-received-from-the-post-office-view/the-position-of-the-offices-received-from-the-post-office-view.component';

const routes: Routes = [
  {
    path: '',
    component: ThePositionOfTheOfficesReceivedFromThePostOfficeListComponent,
    canActivate: [ThePositionOfTheOfficesReceivedFromThePostOfficeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ThePositionOfTheOfficesReceivedFromThePostOfficeNewComponent,
    canActivate: [ThePositionOfTheOfficesReceivedFromThePostOfficeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ThePositionOfTheOfficesReceivedFromThePostOfficeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ThePositionOfTheOfficesReceivedFromThePostOfficeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ThePositionOfTheOfficesReceivedFromThePostOfficeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ThePositionOfTheOfficesReceivedFromThePostOfficeRoutingModule {
}
