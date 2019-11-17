
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeData } from 'app/shared/models/employee-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeDataService } from '../shared/employee-data.service';

@Component({
  selector: 'app-employee-data-view',
  templateUrl: './employee-data-view.component.html',
  styleUrls: ['./employee-data-view.component.scss'],
  providers: []
})

export class EmployeeDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeData: EmployeeData;
  employeeDataForm: FormGroup;

  private employeeStatusesService: LookupService;
private subDepartmentsService: LookupService;
private centralDepartmentsService: LookupService;
private appointmentTypesService: LookupService;
private financialDegreesService: LookupService;
private functionalGroupsService: LookupService;
private jobTypesService: LookupService;
private specializationsService: LookupService;
private socialStatusesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private religionsService: LookupService;
private nationalitiesService: LookupService;
private gendersService: LookupService;
private iDTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
centralAdministrationSelectOptions: MaterialSelectOptions;
appointmentTypeSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
jobGroupSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
specializationSelectOptions: MaterialSelectOptions;
socialStatusSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
religionSelectOptions: MaterialSelectOptions;
nationalitySelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;
genderSelectOptions: MaterialSelectOptions;
birthPlaceSelectOptions: MaterialSelectOptions;
iDTypeSelectOptions: MaterialSelectOptions;

  
approvalNumberIsVisible: boolean;
approvalDateIsVisible: boolean;
contractStartingDateIsVisible: boolean;
contractEndDateIsVisible: boolean;
durationPeriodIsVisible: boolean;
contractAmountIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeDataViewComponent>,
    public employeeDataService: EmployeeDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeData = this.selectedEmployeeDataDialog.data || this.selectedEmployeeData;

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});

	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الاداره المركزيه',
	});

	this.appointmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.appointmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التعين',
	});

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية',
	});

	this.jobGroupSelectOptions = new MaterialSelectOptions({
	 data: this.functionalGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المجموعه الوظيفيه',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});

	this.specializationSelectOptions = new MaterialSelectOptions({
	 data: this.specializationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التخصص الدقيق',
	});

	this.socialStatusSelectOptions = new MaterialSelectOptions({
	 data: this.socialStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحاله الاجتماعيه',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز/القسم',
	});

	this.religionSelectOptions = new MaterialSelectOptions({
	 data: this.religionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الديانه',
	});

	this.nationalitySelectOptions = new MaterialSelectOptions({
	 data: this.nationalitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجنسيه',
	});

	this.issuerSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهه الاصدار',
	});

	this.genderSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجنس',
	});

	this.birthPlaceSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'محل الميلاد',
	});

	this.iDTypeSelectOptions = new MaterialSelectOptions({
	 data: this.iDTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع البطاقة',
	});


    this.employeeDataForm = this.formBuilder.group({
      
  employeeName : [this.selectedEmployeeData.employeeName],
  currentJobDate : [this.selectedEmployeeData.currentJobDate],
  levelDate : [this.selectedEmployeeData.levelDate],
  seniorityHistoryDate : [this.selectedEmployeeData.seniorityHistoryDate],
  receiptDate : [this.selectedEmployeeData.receiptDate],
  decisionDate : [this.selectedEmployeeData.decisionDate],
  decisionNumber : [this.selectedEmployeeData.decisionNumber],
  telephoneNumber : [this.selectedEmployeeData.telephoneNumber],
  employeeAddress : [this.selectedEmployeeData.employeeAddress],
  releaseDate : [this.selectedEmployeeData.releaseDate],
  iDNumber : [this.selectedEmployeeData.iDNumber],
  motherName : [this.selectedEmployeeData.motherName],
  lastFinancialDisclosure : [this.selectedEmployeeData.lastFinancialDisclosure],
  livingHelpedCost : [this.selectedEmployeeData.livingHelpedCost],
  employeeCode : [this.selectedEmployeeData.employeeCode],
  approvalNumber : [this.selectedEmployeeData.approvalNumber],
  approvalDate : [this.selectedEmployeeData.approvalDate],
  birthDate : [this.selectedEmployeeData.birthDate],
  contractStartingDate : [this.selectedEmployeeData.contractStartingDate],
  contractEndDate : [this.selectedEmployeeData.contractEndDate],
  durationPeriod : [this.selectedEmployeeData.durationPeriod],
  contractAmount : [this.selectedEmployeeData.contractAmount],
  employeeStatus : [this.selectedEmployeeData.employeeStatus],
  subAdministration : [this.selectedEmployeeData.subAdministration],
  centralAdministration : [this.selectedEmployeeData.centralAdministration],
  appointmentType : [this.selectedEmployeeData.appointmentType],
  financialDegree : [this.selectedEmployeeData.financialDegree],
  jobGroup : [this.selectedEmployeeData.jobGroup],
  jobTitle : [this.selectedEmployeeData.jobTitle],
  specialization : [this.selectedEmployeeData.specialization],
  socialStatus : [this.selectedEmployeeData.socialStatus],
  governorate : [this.selectedEmployeeData.governorate],
  sectionCenter : [this.selectedEmployeeData.sectionCenter],
  religion : [this.selectedEmployeeData.religion],
  nationality : [this.selectedEmployeeData.nationality],
  issuer : [this.selectedEmployeeData.issuer],
  gender : [this.selectedEmployeeData.gender],
  birthPlace : [this.selectedEmployeeData.birthPlace],
  iDType : [this.selectedEmployeeData.iDType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.employeeDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeDataForm.controls)) {
      this.employeeDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.appointmentTypesService = new LookupService('appointmenttypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.functionalGroupsService = new LookupService('functionalgroups', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.specializationsService = new LookupService('specializations', this.http);
this.socialStatusesService = new LookupService('socialstatuses', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.religionsService = new LookupService('religions', this.http);
this.nationalitiesService = new LookupService('nationalities', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.gendersService = new LookupService('genders', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.iDTypesService = new LookupService('idtypes', this.http);
  }
}

