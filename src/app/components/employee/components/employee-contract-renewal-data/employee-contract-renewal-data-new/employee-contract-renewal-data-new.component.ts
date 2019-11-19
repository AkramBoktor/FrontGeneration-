
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeContractRenewalData } from 'app/shared/models/employee-contract-renewal-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EmployeeContractRenewalDataService } from '../shared/employee-contract-renewal-data.service';


@Component({
  selector: 'app-employee-contract-renewal-data-new',
  templateUrl: './employee-contract-renewal-data-new.component.html',
  styleUrls: ['./employee-contract-renewal-data-new.component.scss'],
  providers: [
    ]
})

export class EmployeeContractRenewalDataNewComponent extends AppBaseComponent implements OnInit {
  employeeContractRenewalDataForm: FormGroup;
  @Input() selectedEmployeeContractRenewalData: EmployeeContractRenewalData;
  errorMessages: FormControlError[] = [
        
  ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;
private financialDegreesService: LookupService;
private renewalTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
renewalTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('renewalType', { static: true }) RenewalTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeeContractRenewalDataNewComponent>,
    public employeeContractRenewalDataService: EmployeeContractRenewalDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeContractRenewalData = new EmployeeContractRenewalData();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});

	this.renewalTypeSelectOptions = new MaterialSelectOptions({
	 data: this.renewalTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجديد',
	});


    this.employeeContractRenewalDataForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedEmployeeContractRenewalData.employeeCode, [ Validators.required ]],
  receiptDate : [this.selectedEmployeeContractRenewalData.receiptDate, [ ]],
  startRenewalDate : [this.selectedEmployeeContractRenewalData.startRenewalDate, [ Validators.required ]],
  renewalPeriod : [this.selectedEmployeeContractRenewalData.renewalPeriod, [ ]],
  prePeriodNumber : [this.selectedEmployeeContractRenewalData.prePeriodNumber, [ ]],
  prePeriodStartingDate : [this.selectedEmployeeContractRenewalData.prePeriodStartingDate, [ ]],
  prePeriodEndDate : [this.selectedEmployeeContractRenewalData.prePeriodEndDate, [ ]],
  durationPeriod : [this.selectedEmployeeContractRenewalData.durationPeriod, [ ]],
  newPeriodNumber : [this.selectedEmployeeContractRenewalData.newPeriodNumber, [ Validators.required ]],
  periodEndDate : [this.selectedEmployeeContractRenewalData.periodEndDate, [ Validators.required ]],
  contractAmount : [this.selectedEmployeeContractRenewalData.contractAmount, [ Validators.required ]],
  centralAdministration : [this.selectedEmployeeContractRenewalData.centralAdministration, [ ]],
  subAdministration : [this.selectedEmployeeContractRenewalData.subAdministration, [ ]],
  jobTitle : [this.selectedEmployeeContractRenewalData.jobTitle, [ ]],
  financialDegree : [this.selectedEmployeeContractRenewalData.financialDegree, [ Validators.required ]],
  renewalType : [this.selectedEmployeeContractRenewalData.renewalType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.employeeContractRenewalDataService.create(this.employeeContractRenewalDataForm.value)
        .pipe(switchMap(x => {
			return this.employeeContractRenewalDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeeContractRenewalDataForm.get(name);
    }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.renewalTypesService = new LookupService('renewaltypes', this.http);
  }
 }
