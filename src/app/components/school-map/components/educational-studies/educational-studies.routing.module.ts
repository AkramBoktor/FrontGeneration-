import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EducationalStudiesGuard } from './shared/educational-studies.guard';
import { EducationalStudiesNewComponent } from './educational-studies-new/educational-studies-new.component';
import { EducationalStudiesEditComponent } from './educational-studies-edit/educational-studies-edit.component';
import { EducationalStudiesListComponent } from './educational-studies-list/educational-studies-list.component';
import { EducationalStudiesViewComponent } from './educational-studies-view/educational-studies-view.component';

const routes: Routes = [
  {
    path: '',
    component: EducationalStudiesListComponent,
    canActivate: [EducationalStudiesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EducationalStudiesNewComponent,
    canActivate: [EducationalStudiesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EducationalStudiesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EducationalStudiesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EducationalStudiesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EducationalStudiesRoutingModule {
}
