import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IntroducingSocialGrantsToParticipantsOfAssociationListComponent } from './introducing-social-grants-to-participants-of-association-list/introducing-social-grants-to-participants-of-association-list.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationEditComponent } from './introducing-social-grants-to-participants-of-association-edit/introducing-social-grants-to-participants-of-association-edit.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationNewComponent } from './introducing-social-grants-to-participants-of-association-new/introducing-social-grants-to-participants-of-association-new.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationViewComponent } from './introducing-social-grants-to-participants-of-association-view/introducing-social-grants-to-participants-of-association-view.component';
import { IntroducingSocialGrantsToParticipantsOfAssociationRoutingModule } from './introducing-social-grants-to-participants-of-association.routing.module';
import { IntroducingSocialGrantsToParticipantsOfAssociationService } from './shared/introducing-social-grants-to-participants-of-association.service';
import { IntroducingSocialGrantsToParticipantsOfAssociationGuard } from './shared/introducing-social-grants-to-participants-of-association.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IntroducingSocialGrantsToParticipantsOfAssociationListComponent,
    IntroducingSocialGrantsToParticipantsOfAssociationNewComponent,
    IntroducingSocialGrantsToParticipantsOfAssociationEditComponent,
    IntroducingSocialGrantsToParticipantsOfAssociationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IntroducingSocialGrantsToParticipantsOfAssociationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IntroducingSocialGrantsToParticipantsOfAssociationService,
    IntroducingSocialGrantsToParticipantsOfAssociationGuard
  ],
  entryComponents: [
    IntroducingSocialGrantsToParticipantsOfAssociationNewComponent,
    IntroducingSocialGrantsToParticipantsOfAssociationEditComponent,
    IntroducingSocialGrantsToParticipantsOfAssociationViewComponent
  ]
})

export class IntroducingSocialGrantsToParticipantsOfAssociationModule {
}
