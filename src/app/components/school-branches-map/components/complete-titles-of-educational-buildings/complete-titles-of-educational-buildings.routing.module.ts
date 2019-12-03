import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CompleteTitlesOfEducationalBuildingsGuard } from './shared/complete-titles-of-educational-buildings.guard';
import { CompleteTitlesOfEducationalBuildingsNewComponent } from './complete-titles-of-educational-buildings-new/complete-titles-of-educational-buildings-new.component';
import { CompleteTitlesOfEducationalBuildingsEditComponent } from './complete-titles-of-educational-buildings-edit/complete-titles-of-educational-buildings-edit.component';
import { CompleteTitlesOfEducationalBuildingsListComponent } from './complete-titles-of-educational-buildings-list/complete-titles-of-educational-buildings-list.component';
import { CompleteTitlesOfEducationalBuildingsViewComponent } from './complete-titles-of-educational-buildings-view/complete-titles-of-educational-buildings-view.component';

const routes: Routes = [
  {
    path: '',
    component: CompleteTitlesOfEducationalBuildingsListComponent,
    canActivate: [CompleteTitlesOfEducationalBuildingsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CompleteTitlesOfEducationalBuildingsNewComponent,
    canActivate: [CompleteTitlesOfEducationalBuildingsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CompleteTitlesOfEducationalBuildingsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CompleteTitlesOfEducationalBuildingsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CompleteTitlesOfEducationalBuildingsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CompleteTitlesOfEducationalBuildingsRoutingModule {
}
