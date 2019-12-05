import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolsEquippedByOtherGuard } from './shared/schools-equipped-by-other.guard';
import { SchoolsEquippedByOtherNewComponent } from './schools-equipped-by-other-new/schools-equipped-by-other-new.component';
import { SchoolsEquippedByOtherEditComponent } from './schools-equipped-by-other-edit/schools-equipped-by-other-edit.component';
import { SchoolsEquippedByOtherListComponent } from './schools-equipped-by-other-list/schools-equipped-by-other-list.component';
import { SchoolsEquippedByOtherViewComponent } from './schools-equipped-by-other-view/schools-equipped-by-other-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsEquippedByOtherListComponent,
    canActivate: [SchoolsEquippedByOtherGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SchoolsEquippedByOtherNewComponent,
    canActivate: [SchoolsEquippedByOtherGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SchoolsEquippedByOtherEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SchoolsEquippedByOtherListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SchoolsEquippedByOtherViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolsEquippedByOtherRoutingModule {
}
