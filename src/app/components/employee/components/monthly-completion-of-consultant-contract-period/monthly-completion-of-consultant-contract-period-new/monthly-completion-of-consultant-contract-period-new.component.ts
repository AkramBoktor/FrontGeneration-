
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MonthlyCompletionOfConsultantContractPeriod } from 'app/shared/models/monthly-completion-of-consultant-contract-period';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { MonthlyCompletionOfConsultantContractPeriodService } from '../shared/monthly-completion-of-consultant-contract-period.service';


@Component({
  selector: 'app-monthly-completion-of-consultant-contract-period-new',
  templateUrl: './monthly-completion-of-consultant-contract-period-new.component.html',
  styleUrls: ['./monthly-completion-of-consultant-contract-period-new.component.scss'],
  providers: [
    ]
})

export class MonthlyCompletionOfConsultantContractPeriodNewComponent extends AppBaseComponent implements OnInit {
  monthlyCompletionOfConsultantContractPeriodForm: FormGroup;
  @Input() selectedMonthlyCompletionOfConsultantContractPeriod: MonthlyCompletionOfConsultantContractPeriod;
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
    @Optional() public dialogRef: MatDialogRef<MonthlyCompletionOfConsultantContractPeriodNewComponent>,
    public monthlyCompletionOfConsultantContractPeriodService: MonthlyCompletionOfConsultantContractPeriodService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMonthlyCompletionOfConsultantContractPeriod = new MonthlyCompletionOfConsultantContractPeriod();

    
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
     
  id : [0],
  employeeCode : [this.selectedMonthlyCompletionOfConsultantContractPeriod.employeeCode, [ Validators.required ]],
  attendeesNumber : [this.selectedMonthlyCompletionOfConsultantContractPeriod.attendeesNumber, [ Validators.required ]],
  periodNumber : [this.selectedMonthlyCompletionOfConsultantContractPeriod.periodNumber, [ Validators.required ]],
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
    this.monthlyCompletionOfConsultantContractPeriodService.create(this.monthlyCompletionOfConsultantContractPeriodForm.value)
        .pipe(switchMap(x => {
			return this.monthlyCompletionOfConsultantContractPeriodService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
