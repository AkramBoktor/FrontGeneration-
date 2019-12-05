
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { QualityManagementComponent } from './quality-management.component';


const routes: Routes = [
  {
    path: '',
    component: QualityManagementComponent,
  },
  
	{
		path: 'contractor-data-quality-management', loadChildren: './components/contractor-data-quality-management/contractor-data-quality-management.module#ContractorDataQualityManagementModule',
		data: {
		  moduleName: 'ContractorDataQualityManagement'
		},
	},

	{
		path: 'machine-linked-to-the-laboratory', loadChildren: './components/machine-linked-to-the-laboratory/machine-linked-to-the-laboratory.module#MachineLinkedToTheLaboratoryModule',
		data: {
		  moduleName: 'MachineLinkedToTheLaboratory'
		},
	},

	{
		path: 'machine-related-test', loadChildren: './components/machine-related-test/machine-related-test.module#MachineRelatedTestModule',
		data: {
		  moduleName: 'MachineRelatedTest'
		},
	},

	{
		path: 'main-data-for-the-sample', loadChildren: './components/main-data-for-the-sample/main-data-for-the-sample.module#MainDataForTheSampleModule',
		data: {
		  moduleName: 'MainDataForTheSample'
		},
	},

	{
		path: 'note-seen-by-the-chemistry-laboratory', loadChildren: './components/note-seen-by-the-chemistry-laboratory/note-seen-by-the-chemistry-laboratory.module#NoteSeenByTheChemistryLaboratoryModule',
		data: {
		  moduleName: 'NoteSeenByTheChemistryLaboratory'
		},
	},

	{
		path: 'producing-material-for-approved-companies', loadChildren: './components/producing-material-for-approved-companies/producing-material-for-approved-companies.module#ProducingMaterialForApprovedCompaniesModule',
		data: {
		  moduleName: 'ProducingMaterialForApprovedCompanies'
		},
	},

	{
		path: 'project-data', loadChildren: './components/project-data/project-data.module#ProjectDataModule',
		data: {
		  moduleName: 'ProjectData'
		},
	},

	{
		path: 'renewal-of-contract-period-for-approved-companغ', loadChildren: './components/renewal-of-contract-period-for-approved-companغ/renewal-of-contract-period-for-approved-companغ.module#RenewalOfContractPeriodForApprovedCompanغModule',
		data: {
		  moduleName: 'RenewalOfContractPeriodForApprovedCompanغ'
		},
	},

	{
		path: 'sample-result-for-the-work-of-others', loadChildren: './components/sample-result-for-the-work-of-others/sample-result-for-the-work-of-others.module#SampleResultForTheWorkOfOthersModule',
		data: {
		  moduleName: 'SampleResultForTheWorkOfOthers'
		},
	},

	{
		path: 'sample-result', loadChildren: './components/sample-result/sample-result.module#SampleResultModule',
		data: {
		  moduleName: 'SampleResult'
		},
	},

	{
		path: 'sample-test-data', loadChildren: './components/sample-test-data/sample-test-data.module#SampleTestDataModule',
		data: {
		  moduleName: 'SampleTestData'
		},
	},

	{
		path: 'data-limits-accept-and-reject-for-sample', loadChildren: './components/data-limits-accept-and-reject-for-sample/data-limits-accept-and-reject-for-sample.module#DataLimitsAcceptAndRejectForSampleModule',
		data: {
		  moduleName: 'DataLimitsAcceptAndRejectForSample'
		},
	},

	{
		path: 'sample-test-request-for-the-work-of-others', loadChildren: './components/sample-test-request-for-the-work-of-others/sample-test-request-for-the-work-of-others.module#SampleTestRequestForTheWorkOfOthersModule',
		data: {
		  moduleName: 'SampleTestRequestForTheWorkOfOthers'
		},
	},

	{
		path: 'sample-test-request', loadChildren: './components/sample-test-request/sample-test-request.module#SampleTestRequestModule',
		data: {
		  moduleName: 'SampleTestRequest'
		},
	},

	{
		path: 'school-are-excluded-from-quality-control', loadChildren: './components/school-are-excluded-from-quality-control/school-are-excluded-from-quality-control.module#SchoolAreExcludedFromQualityControlModule',
		data: {
		  moduleName: 'SchoolAreExcludedFromQualityControl'
		},
	},

	{
		path: 'structural-component-code', loadChildren: './components/structural-component-code/structural-component-code.module#StructuralComponentCodeModule',
		data: {
		  moduleName: 'StructuralComponentCode'
		},
	},

	{
		path: 'subcategory-code', loadChildren: './components/subcategory-code/subcategory-code.module#SubcategoryCodeModule',
		data: {
		  moduleName: 'SubcategoryCode'
		},
	},

	{
		path: 'test-code', loadChildren: './components/test-code/test-code.module#TestCodeModule',
		data: {
		  moduleName: 'TestCode'
		},
	},

	{
		path: 'the-corresponding-school-number', loadChildren: './components/the-corresponding-school-number/the-corresponding-school-number.module#TheCorrespondingSchoolNumberModule',
		data: {
		  moduleName: 'TheCorrespondingSchoolNumber'
		},
	},

	{
		path: 'the-number-of-application-received-in-the-samples-hall', loadChildren: './components/the-number-of-application-received-in-the-samples-hall/the-number-of-application-received-in-the-samples-hall.module#TheNumberOfApplicationReceivedInTheSamplesHallModule',
		data: {
		  moduleName: 'TheNumberOfApplicationReceivedInTheSamplesHall'
		},
	},

	{
		path: 'basic-material-code', loadChildren: './components/basic-material-code/basic-material-code.module#BasicMaterialCodeModule',
		data: {
		  moduleName: 'BasicMaterialCode'
		},
	},

	{
		path: 'calibration-unit-data', loadChildren: './components/calibration-unit-data/calibration-unit-data.module#CalibrationUnitDataModule',
		data: {
		  moduleName: 'CalibrationUnitData'
		},
	},

	{
		path: 'data-of-company-contracted-with-the-authority', loadChildren: './components/data-of-company-contracted-with-the-authority/data-of-company-contracted-with-the-authority.module#DataOfCompanyContractedWithTheAuthorityModule',
		data: {
		  moduleName: 'DataOfCompanyContractedWithTheAuthority'
		},
	},

	{
		path: 'casting-data-for-sample-for-the-work-of-others', loadChildren: './components/casting-data-for-sample-for-the-work-of-others/casting-data-for-sample-for-the-work-of-others.module#CastingDataForSampleForTheWorkOfOthersModule',
		data: {
		  moduleName: 'CastingDataForSampleForTheWorkOfOthers'
		},
	},

	{
		path: 'casting-data-for-sample', loadChildren: './components/casting-data-for-sample/casting-data-for-sample.module#CastingDataForSampleModule',
		data: {
		  moduleName: 'CastingDataForSample'
		},
	},

	{
		path: 'code-of-approved-companies-representative', loadChildren: './components/code-of-approved-companies-representative/code-of-approved-companies-representative.module#CodeOfApprovedCompaniesRepresentativeModule',
		data: {
		  moduleName: 'CodeOfApprovedCompaniesRepresentative'
		},
	},

	{
		path: 'code-of-various-activity-of-approved-companies', loadChildren: './components/code-of-various-activity-of-approved-companies/code-of-various-activity-of-approved-companies.module#CodeOfVariousActivityOfApprovedCompaniesModule',
		data: {
		  moduleName: 'CodeOfVariousActivityOfApprovedCompanies'
		},
	},

	{
		path: 'concrete-mixture-data-for-the-work-of-others', loadChildren: './components/concrete-mixture-data-for-the-work-of-others/concrete-mixture-data-for-the-work-of-others.module#ConcreteMixtureDataForTheWorkOfOthersModule',
		data: {
		  moduleName: 'ConcreteMixtureDataForTheWorkOfOthers'
		},
	},

	{
		path: 'concrete-mixture-data', loadChildren: './components/concrete-mixture-data/concrete-mixture-data.module#ConcreteMixtureDataModule',
		data: {
		  moduleName: 'ConcreteMixtureData'
		},
	},

	{
		path: 'data-of-company-not-contracted-with-the-authority', loadChildren: './components/data-of-company-not-contracted-with-the-authority/data-of-company-not-contracted-with-the-authority.module#DataOfCompanyNotContractedWithTheAuthorityModule',
		data: {
		  moduleName: 'DataOfCompanyNotContractedWithTheAuthority'
		},
	},

	{
		path: 'data-unit-of-measurement', loadChildren: './components/data-unit-of-measurement/data-unit-of-measurement.module#DataUnitOfMeasurementModule',
		data: {
		  moduleName: 'DataUnitOfMeasurement'
		},
	},

	{
		path: 'factory-name-for-order', loadChildren: './components/factory-name-for-order/factory-name-for-order.module#FactoryNameForOrderModule',
		data: {
		  moduleName: 'FactoryNameForOrder'
		},
	},

	{
		path: 'introducing-tax-code-for-the-governorate', loadChildren: './components/introducing-tax-code-for-the-governorate/introducing-tax-code-for-the-governorate.module#IntroducingTaxCodeForTheGovernorateModule',
		data: {
		  moduleName: 'IntroducingTaxCodeForTheGovernorate'
		},
	},

	{
		path: 'lab-data', loadChildren: './components/lab-data/lab-data.module#LabDataModule',
		data: {
		  moduleName: 'LabData'
		},
	},

	{
		path: 'laboratory-related-test', loadChildren: './components/laboratory-related-test/laboratory-related-test.module#LaboratoryRelatedTestModule',
		data: {
		  moduleName: 'LaboratoryRelatedTest'
		},
	},

	{
		path: 'conformations-and-the-result-of-the-corresponding-concrete-mixture', loadChildren: './components/conformations-and-the-result-of-the-corresponding-concrete-mixture/conformations-and-the-result-of-the-corresponding-concrete-mixture.module#ConformationsAndTheResultOfTheCorrespondingConcreteMixtureModule',
		data: {
		  moduleName: 'ConformationsAndTheResultOfTheCorrespondingConcreteMixture'
		},
	}

	

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class QualityManagementRoutingModule {
}

