
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MonthlyCompletionOfConsultantContractPeriod } from 'app/shared/models/monthly-completion-of-consultant-contract-period';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { MonthlyCompletionOfConsultantContractPeriodService } from '../shared/monthly-completion-of-consultant-contract-period.service';




@Component({
  selector: 'app-monthly-completion-of-consultant-contract-period-edit',
  templateUrl: './monthly-completion-of-consultant-contract-period-edit.component.html',
  styleUrls: ['./monthly-completion-of-consultant-contract-period-edit.component.scss'],
  providers: []
})

export class MonthlyCompletionOfConsultantContractPeriodEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMonthlyCompletionOfConsultantContractPeriod: MonthlyCompletionOfConsultantContractPeriod;
  monthlyCompletionOfConsultantContractPeriodForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMonthlyCompletionOfConsultantContractPeriodDialog: any,
    @Optional() public dialogRef: MatDialogRef<MonthlyCompletionOfConsultantContractPeriodEditComponent>,
    public monthlyCompletionOfConsultantContractPeriodService: MonthlyCompletionOfConsultantContractPeriodService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMonthlyCompletionOfConsultantContractPeriod = new MonthlyCompletionOfConsultantContractPeriod();
    this.selectedMonthlyCompletionOfConsultantContractPeriod = this.selectedMonthlyCompletionOfConsultantContractPeriodDialog.data || this.selectedMonthlyCompletionOfConsultantContractPeriod;

    
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


    this.monthlyCompletionOfConsultantContractPeriodForm = this.formBuilder.group({
      
  id : [this.selectedMonthlyCompletionOfConsultantContractPeriod.id],
  employeeCode : [this.selectedMonthlyCompletionOfConsultantContractPeriod.employeeCode, [ Validators.required ]],
  attendeesNumber : [this.selectedMonthlyCompletionOfConsultantContractPeriod.attendeesNumber, [ Validators.required ]],
  periodNumber : [this.selectedMonthlyCompletionOfConsultantContractPeriod.periodNumber, [ ]],
  startDate : [this.selectedMonthlyCompletionOfConsultantContractPeriod.startDate, [ ]],
  contractAmount : [this.selectedMonthlyCompletionOfConsultantContractPeriod.contractAmount, [ ]],
  endDate : [this.selectedMonthlyCompletionOfConsultantContractPeriod.endDate, [ ]],
  period : [this.selectedMonthlyCompletionOfConsultantContractPeriod.period, [ ]],
  centralAdministration : [this.selectedMonthlyCompletionOfConsultantContractPeriod.centralAdministration, [ ]],
  subAdministration : [this.selectedMonthlyCompletionOfConsultantContractPeriod.subAdministration, [ ]],
  jobTitle : [this.selectedMonthlyCompletionOfConsultantContractPeriod.jobTitle, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.monthlyCompletionOfConsultantContractPeriodService.update(this.monthlyCompletionOfConsultantContractPeriodForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.monthlyCompletionOfConsultantContractPeriodService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.monthlyCompletionOfConsultantContractPeriodForm.get(name);
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}
