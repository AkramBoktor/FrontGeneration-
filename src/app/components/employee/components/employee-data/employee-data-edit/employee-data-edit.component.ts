
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeData } from 'app/shared/models/employee-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeeDataService } from '../shared/employee-data.service';




@Component({
  selector: 'app-employee-data-edit',
  templateUrl: './employee-data-edit.component.html',
  styleUrls: ['./employee-data-edit.component.scss'],
  providers: []
})

export class EmployeeDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeData: EmployeeData;
  employeeDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private nationalitiesService: LookupService;
private sectionsOrCentersService: LookupService;
private gendersService: LookupService;
private religionsService: LookupService;
private iDTypesService: LookupService;
private governoratesService: LookupService;
private employeeStatusesService: LookupService;
private subDepartmentsService: LookupService;
private centralDepartmentsService: LookupService;
private appointmentTypesService: LookupService;
private financialDegreesService: LookupService;
private functionalGroupsService: LookupService;
private jobTypesService: LookupService;
private specializationsService: LookupService;
private socialStatusesService: LookupService;

  
nationalitySelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;
genderSelectOptions: MaterialSelectOptions;
birthPlaceSelectOptions: MaterialSelectOptions;
religionSelectOptions: MaterialSelectOptions;
iDTypeSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
centralAdministrationSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
appointmentTypeSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
jobGroupSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
specializationSelectOptions: MaterialSelectOptions;
socialStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('nationality', { static: true }) NationalitySelectComponent: MaterialSelectComponent;
	@ViewChild('issuer', { static: true }) IssuerSelectComponent: MaterialSelectComponent;
	@ViewChild('gender', { static: true }) GenderSelectComponent: MaterialSelectComponent;
	@ViewChild('birthPlace', { static: true }) BirthPlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('religion', { static: true }) ReligionSelectComponent: MaterialSelectComponent;
	@ViewChild('iDType', { static: true }) IDTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('appointmentType', { static: true }) AppointmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobGroup', { static: true }) JobGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;
	@ViewChild('specialization', { static: true }) SpecializationSelectComponent: MaterialSelectComponent;
	@ViewChild('socialStatus', { static: true }) SocialStatusSelectComponent: MaterialSelectComponent;

  
approvalNumberIsVisible: boolean;
contractAmountIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeDataEditComponent>,
    public employeeDataService: EmployeeDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeData = new EmployeeData();
    this.selectedEmployeeData = this.selectedEmployeeDataDialog.data || this.selectedEmployeeData;

    
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

	this.religionSelectOptions = new MaterialSelectOptions({
	 data: this.religionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الديانه',
	});

	this.iDTypeSelectOptions = new MaterialSelectOptions({
	 data: this.iDTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع البطاقة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

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

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز/القسم',
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


    this.employeeDataForm = this.formBuilder.group({
      
  id : [this.selectedEmployeeData.id],
  employeeName : [this.selectedEmployeeData.employeeName, [ Validators.required ]],
  releaseDate : [this.selectedEmployeeData.releaseDate, [ Validators.required ]],
  iDNumber : [this.selectedEmployeeData.iDNumber, [ Validators.required ]],
  motherName : [this.selectedEmployeeData.motherName, [ Validators.required ]],
  lastFinancialDisclosure : [this.selectedEmployeeData.lastFinancialDisclosure, [ ]],
  employeeCode : [this.selectedEmployeeData.employeeCode, [ Validators.required ]],
  approvalNumber : [this.selectedEmployeeData.approvalNumber, [ Validators.required ]],
  approvalDate : [this.selectedEmployeeData.approvalDate, [ Validators.required ]],
  birthDate : [this.selectedEmployeeData.birthDate, [ Validators.required ]],
  contractStartingDate : [this.selectedEmployeeData.contractStartingDate, [ Validators.required ]],
  contractEndDate : [this.selectedEmployeeData.contractEndDate, [ Validators.required ]],
  livingHelpedCost : [this.selectedEmployeeData.livingHelpedCost, [ Validators.required ]],
  durationPeriod : [this.selectedEmployeeData.durationPeriod, [ ]],
  employeeAddress : [this.selectedEmployeeData.employeeAddress, [ Validators.required ]],
  currentJobDate : [this.selectedEmployeeData.currentJobDate, [ Validators.required ]],
  levelDate : [this.selectedEmployeeData.levelDate, [ Validators.required ]],
  seniorityHistoryDate : [this.selectedEmployeeData.seniorityHistoryDate, [ Validators.required ]],
  receiptDate : [this.selectedEmployeeData.receiptDate, [ Validators.required ]],
  decisionDate : [this.selectedEmployeeData.decisionDate, [ Validators.required ]],
  telephoneNumber : [this.selectedEmployeeData.telephoneNumber, [ Validators.required ]],
  decisionNumber : [this.selectedEmployeeData.decisionNumber, [ Validators.required ]],
  contractAmount : [this.selectedEmployeeData.contractAmount, [ Validators.required ]],
  nationality : [this.selectedEmployeeData.nationality, [ Validators.required ]],
  issuer : [this.selectedEmployeeData.issuer, [ Validators.required ]],
  gender : [this.selectedEmployeeData.gender, [ Validators.required ]],
  birthPlace : [this.selectedEmployeeData.birthPlace, [ Validators.required ]],
  religion : [this.selectedEmployeeData.religion, [ Validators.required ]],
  iDType : [this.selectedEmployeeData.iDType, [ Validators.required ]],
  governorate : [this.selectedEmployeeData.governorate, [ Validators.required ]],
  employeeStatus : [this.selectedEmployeeData.employeeStatus, [ Validators.required ]],
  subAdministration : [this.selectedEmployeeData.subAdministration, [ Validators.required ]],
  centralAdministration : [this.selectedEmployeeData.centralAdministration, [ Validators.required ]],
  sectionCenter : [this.selectedEmployeeData.sectionCenter, [ Validators.required ]],
  appointmentType : [this.selectedEmployeeData.appointmentType, [ Validators.required ]],
  financialDegree : [this.selectedEmployeeData.financialDegree, [ Validators.required ]],
  jobGroup : [this.selectedEmployeeData.jobGroup, [ Validators.required ]],
  jobTitle : [this.selectedEmployeeData.jobTitle, [ Validators.required ]],
  specialization : [this.selectedEmployeeData.specialization, [ Validators.required ]],
  socialStatus : [this.selectedEmployeeData.socialStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeeDataService.update(this.employeeDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeeDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.employeeDataForm.get(name);
  }

  initializeLookupServices() {
    this.nationalitiesService = new LookupService('nationalities', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.gendersService = new LookupService('genders', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.religionsService = new LookupService('religions', this.http);
this.iDTypesService = new LookupService('idtypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.appointmentTypesService = new LookupService('appointmenttypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.functionalGroupsService = new LookupService('functionalgroups', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.specializationsService = new LookupService('specializations', this.http);
this.socialStatusesService = new LookupService('socialstatuses', this.http);
  }
}
