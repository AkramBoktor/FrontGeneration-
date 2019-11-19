
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseComponent } from './case.component';


const routes: Routes = [
  {
    path: '',
    component: CaseComponent,
  },


{
    path: 'followup-sessions', loadChildren: './components/followup-sessions/followup-sessions.module#FollowupSessionsModule',
    data: {
      moduleName: 'FollowupSessions'
    },
},

{
    path: 'lawsuit-sessions-arbitration', loadChildren: './components/lawsuit-sessions-arbitration/lawsuit-sessions-arbitration.module#LawsuitSessionsArbitrationModule',
    data: {
      moduleName: 'LawsuitSessionsArbitration'
    },
},

{
    path: 'documents-folder', loadChildren: './components/documents-folder/documents-folder.module#DocumentsFolderModule',
    data: {
      moduleName: 'DocumentsFolder'
    },
},

{
    path: 'arbitration-topics', loadChildren: './components/arbitration-topics/arbitration-topics.module#ArbitrationTopicsModule',
    data: {
      moduleName: 'ArbitrationTopics'
    },
},

{
    path: 'codes-of-reason-for-termination', loadChildren: './components/codes-of-reason-for-termination/codes-of-reason-for-termination.module#CodesOfReasonForTerminationModule',
    data: {
      moduleName: 'CodesOfReasonForTermination'
    },
},

{
    path: 'ending-the-assignment-of-the-case-to-the-lawyer', loadChildren: './components/ending-the-assignment-of-the-case-to-the-lawyer/ending-the-assignment-of-the-case-to-the-lawyer.module#EndingTheAssignmentOfTheCaseToTheLawyerModule',
    data: {
      moduleName: 'EndingTheAssignmentOfTheCaseToTheLawyer'
    },
},

{
    path: 'operative-sentence', loadChildren: './components/operative-sentence/operative-sentence.module#OperativeSentenceModule',
    data: {
      moduleName: 'OperativeSentence'
    },
},

{
    path: 'third-party-codes', loadChildren: './components/third-party-codes/third-party-codes.module#ThirdPartyCodesModule',
    data: {
      moduleName: 'ThirdPartyCodes'
    },
},

{
    path: 'assigning-the-case-to-a-new-lawyer', loadChildren: './components/assigning-the-case-to-a-new-lawyer/assigning-the-case-to-a-new-lawyer.module#AssigningTheCaseToANewLawyerModule',
    data: {
      moduleName: 'AssigningTheCaseToANewLawyer'
    },
},

{
    path: 'what-happened-in-the-session', loadChildren: './components/what-happened-in-the-session/what-happened-in-the-session.module#WhatHappenedInTheSessionModule',
    data: {
      moduleName: 'WhatHappenedInTheSession'
    },
},

{
    path: 'lawsuit-data', loadChildren: './components/lawsuit-data/lawsuit-data.module#LawsuitDataModule',
    data: {
      moduleName: 'LawsuitData'
    },
},


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CaseRoutingModule {
}

