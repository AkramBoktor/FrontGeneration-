
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { StatementOfEmployeePerformanceDuringACertainPeriod } from 'app/shared/models/statement-of-employee-performance-during-a-certain-period';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { StatementOfEmployeePerformanceDuringACertainPeriodService } from '../shared/statement-of-employee-performance-during-a-certain-period.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-statement-of-employee-performance-during-a-certain-period-new',
  templateUrl: './statement-of-employee-performance-during-a-certain-period-new.component.html',
  styleUrls: ['./statement-of-employee-performance-during-a-certain-period-new.component.scss'],
  providers: [
    ]
})

export class StatementOfEmployeePerformanceDuringACertainPeriodNewComponent extends AppBaseComponent implements OnInit {
  statementOfEmployeePerformanceDuringACertainPeriodForm: FormGroup;
  @Input() selectedStatementOfEmployeePerformanceDuringACertainPeriod: StatementOfEmployeePerformanceDuringACertainPeriod;
  errorMessages: FormControlError[] = [
        
  ];

  private performanceTypesService: LookupService;

  
performanceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('performanceType', { static: true }) PerformanceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<StatementOfEmployeePerformanceDuringACertainPeriodNewComponent>,
    public statementOfEmployeePerformanceDuringACertainPeriodService: StatementOfEmployeePerformanceDuringACertainPeriodService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementOfEmployeePerformanceDuringACertainPeriod = new StatementOfEmployeePerformanceDuringACertainPeriod();

    
	this.performanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.performanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاداء',
	});


    this.statementOfEmployeePerformanceDuringACertainPeriodForm = this.formBuilder.group({
     
  id : [0],
  directManagerCode : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.directManagerCode, [ Validators.required ]],
  seniorManagerCode : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.seniorManagerCode, [ Validators.required ]],
  employeeCode : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.employeeCode, [ Validators.required ]],
  estimationYear : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.estimationYear, [ Validators.required ]],
  estimatePeriodFrom : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.estimatePeriodFrom, [ Validators.required ]],
  estimatePeriodTo : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.estimatePeriodTo, [ Validators.required ]],
  performanceCharacterization : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.performanceCharacterization, [ Validators.required ]],
  performanceType : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.performanceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.statementOfEmployeePerformanceDuringACertainPeriodService.create(this.statementOfEmployeePerformanceDuringACertainPeriodForm.value)
        .pipe(switchMap(x => {
			return this.statementOfEmployeePerformanceDuringACertainPeriodService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.statementOfEmployeePerformanceDuringACertainPeriodForm.get(name);
    }

  initializeLookupServices() {
    this.performanceTypesService = new LookupService('performancetypes', this.http);
  }
 }
