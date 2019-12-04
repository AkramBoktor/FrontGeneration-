import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolsClosedToNatureGuard } from './shared/schools-closed-to-nature.guard';
import { SchoolsClosedToNatureNewComponent } from './schools-closed-to-nature-new/schools-closed-to-nature-new.component';
import { SchoolsClosedToNatureEditComponent } from './schools-closed-to-nature-edit/schools-closed-to-nature-edit.component';
import { SchoolsClosedToNatureListComponent } from './schools-closed-to-nature-list/schools-closed-to-nature-list.component';
import { SchoolsClosedToNatureViewComponent } from './schools-closed-to-nature-view/schools-closed-to-nature-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsClosedToNatureListComponent,
    canActivate: [SchoolsClosedToNatureGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SchoolsClosedToNatureNewComponent,
    canActivate: [SchoolsClosedToNatureGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SchoolsClosedToNatureEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SchoolsClosedToNatureListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SchoolsClosedToNatureViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolsClosedToNatureRoutingModule {
}
