
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';


const routes: Routes = [
  {
    path: '',
    component: PurchaseComponent,
  },
 
{
    path: 'publishing-data', loadChildren: './components/publishing-data/publishing-data.module#PublishingDataModule',
    data: {
      moduleName: 'PublishingData'
    },
},

{
    path: 'envelopes-opennig-commety-data', loadChildren: './components/envelopes-opennig-commety-data/envelopes-opennig-commety-data.module#EnvelopesOpennigCommetyDataModule',
    data: {
      moduleName: 'EnvelopesOpennigCommetyData'
    },
},

{
    path: 'envelopes-opennig-commety-members-data', loadChildren: './components/envelopes-opennig-commety-members-data/envelopes-opennig-commety-members-data.module#EnvelopesOpennigCommetyMembersDataModule',
    data: {
      moduleName: 'EnvelopesOpennigCommetyMembersData'
    },
},

{
    path: 'examination-committee-date-data', loadChildren: './components/examination-committee-date-data/examination-committee-date-data.module#ExaminationCommitteeDateDataModule',
    data: {
      moduleName: 'ExaminationCommitteeDateData'
    },
},

{
    path: 'examination-committee-member-data', loadChildren: './components/examination-committee-member-data/examination-committee-member-data.module#ExaminationCommitteeMemberDataModule',
    data: {
      moduleName: 'ExaminationCommitteeMemberData'
    },
},

{
    path: 'group-details-data', loadChildren: './components/group-details-data/group-details-data.module#GroupDetailsDataModule',
    data: {
      moduleName: 'GroupDetailsData'
    },
},

{
    path: 'invoice-50', loadChildren: './components/invoice-50/invoice-50.module#Invoice50Module',
    data: {
      moduleName: 'Invoice50'
    },
},

{
    path: 'supplementary-record', loadChildren: './components/supplementary-record/supplementary-record.module#SupplementaryRecordModule',
    data: {
      moduleName: 'SupplementaryRecord'
    },
},

{
    path: 'tender-data', loadChildren: './components/tender-data/tender-data.module#TenderDataModule',
    data: {
      moduleName: 'TenderData'
    },
},

{
    path: 'assignment-data', loadChildren: './components/assignment-data/assignment-data.module#AssignmentDataModule',
    data: {
      moduleName: 'AssignmentData'
    },
},

{
    path: 'bid-parts-data', loadChildren: './components/bid-parts-data/bid-parts-data.module#BidPartsDataModule',
    data: {
      moduleName: 'BidPartsData'
    },
},

{
    path: 'canceled-tender', loadChildren: './components/canceled-tender/canceled-tender.module#CanceledTenderModule',
    data: {
      moduleName: 'CanceledTender'
    },
},

{
    path: 'conditions-notebook-data', loadChildren: './components/conditions-notebook-data/conditions-notebook-data.module#ConditionsNotebookDataModule',
    data: {
      moduleName: 'ConditionsNotebookData'
    },
},

{
    path: 'contractor-data', loadChildren: './components/contractor-data/contractor-data.module#ContractorDataModule',
    data: {
      moduleName: 'ContractorData'
    },
},

{
    path: 'contractor-ranking-data', loadChildren: './components/contractor-ranking-data/contractor-ranking-data.module#ContractorRankingDataModule',
    data: {
      moduleName: 'ContractorRankingData'
    },
},

{
    path: 'job-data', loadChildren: './components/job-data/job-data.module#JobDataModule',
    data: {
      moduleName: 'JobData'
    },
},


{
    path: 'contractor-data', loadChildren: './components/contractor-data/contractor-data.module#ContractorDataModule',
    data: {
      moduleName: 'ContractorData'
    },
},

{
    path: 'publishing-data', loadChildren: './components/publishing-data/publishing-data.module#PublishingDataModule',
    data: {
      moduleName: 'PublishingData'
    },
},

{
    path: 'job-data', loadChildren: './components/job-data/job-data.module#JobDataModule',
    data: {
      moduleName: 'JobData'
    },
},

{
    path: 'tender-data', loadChildren: './components/tender-data/tender-data.module#TenderDataModule',
    data: {
      moduleName: 'TenderData'
    },
},

{
    path: 'examination-committee-date-data', loadChildren: './components/examination-committee-date-data/examination-committee-date-data.module#ExaminationCommitteeDateDataModule',
    data: {
      moduleName: 'ExaminationCommitteeDateData'
    },
},

{
    path: 'envelopes-opennig-commety-data', loadChildren: './components/envelopes-opennig-commety-data/envelopes-opennig-commety-data.module#EnvelopesOpennigCommetyDataModule',
    data: {
      moduleName: 'EnvelopesOpennigCommetyData'
    },
},

{
    path: 'invoice-50', loadChildren: './components/invoice-50/invoice-50.module#Invoice50Module',
    data: {
      moduleName: 'Invoice50'
    },
},

{
    path: 'assignment-data', loadChildren: './components/assignment-data/assignment-data.module#AssignmentDataModule',
    data: {
      moduleName: 'AssignmentData'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PurchaseRoutingModule {
}

