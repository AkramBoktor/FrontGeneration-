import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IntroducingSocialGrantsToParticipantsOfAssociationGuard } from './shared/introducing-social-grants-to-participants-of-association.guard';
import { IntroducingSocialGrantsToParticipantsOfAssociationNewComponent } from './introducing-social-grants-to-participants-of-association-new/introducing-social-grants-to-participants-of-association-new.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationEditComponent } from './introducing-social-grants-to-participants-of-association-edit/introducing-social-grants-to-participants-of-association-edit.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationListComponent } from './introducing-social-grants-to-participants-of-association-list/introducing-social-grants-to-participants-of-association-list.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationViewComponent } from './introducing-social-grants-to-participants-of-association-view/introducing-social-grants-to-participants-of-association-view.component';

const routes: Routes = [
  {
    path: '',
    component: IntroducingSocialGrantsToParticipantsOfAssociationListComponent,
    canActivate: [IntroducingSocialGrantsToParticipantsOfAssociationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IntroducingSocialGrantsToParticipantsOfAssociationNewComponent,
    canActivate: [IntroducingSocialGrantsToParticipantsOfAssociationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IntroducingSocialGrantsToParticipantsOfAssociationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IntroducingSocialGrantsToParticipantsOfAssociationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IntroducingSocialGrantsToParticipantsOfAssociationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IntroducingSocialGrantsToParticipantsOfAssociationRoutingModule {
}
