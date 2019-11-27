import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataOfEducationalStudyGuard } from './shared/data-of-educational-study.guard';
import { DataOfEducationalStudyNewComponent } from './data-of-educational-study-new/data-of-educational-study-new.component';
import { DataOfEducationalStudyEditComponent } from './data-of-educational-study-edit/data-of-educational-study-edit.component';
import { DataOfEducationalStudyListComponent } from './data-of-educational-study-list/data-of-educational-study-list.component';
import { DataOfEducationalStudyViewComponent } from './data-of-educational-study-view/data-of-educational-study-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataOfEducationalStudyListComponent,
    canActivate: [DataOfEducationalStudyGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataOfEducationalStudyNewComponent,
    canActivate: [DataOfEducationalStudyGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataOfEducationalStudyEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataOfEducationalStudyListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataOfEducationalStudyViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataOfEducationalStudyRoutingModule {
}
