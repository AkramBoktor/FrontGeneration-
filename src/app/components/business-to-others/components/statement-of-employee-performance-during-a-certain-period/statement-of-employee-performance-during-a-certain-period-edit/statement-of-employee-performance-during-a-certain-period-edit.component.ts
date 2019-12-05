
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { StatementOfEmployeePerformanceDuringACertainPeriod } from 'app/shared/models/statement-of-employee-performance-during-a-certain-period';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { StatementOfEmployeePerformanceDuringACertainPeriodService } from '../shared/statement-of-employee-performance-during-a-certain-period.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-statement-of-employee-performance-during-a-certain-period-edit',
  templateUrl: './statement-of-employee-performance-during-a-certain-period-edit.component.html',
  styleUrls: ['./statement-of-employee-performance-during-a-certain-period-edit.component.scss'],
  providers: []
})

export class StatementOfEmployeePerformanceDuringACertainPeriodEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedStatementOfEmployeePerformanceDuringACertainPeriod: StatementOfEmployeePerformanceDuringACertainPeriod;
  statementOfEmployeePerformanceDuringACertainPeriodForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private performanceTypesService: LookupService;

  
performanceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('performanceType', { static: true }) PerformanceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedStatementOfEmployeePerformanceDuringACertainPeriodDialog: any,
    @Optional() public dialogRef: MatDialogRef<StatementOfEmployeePerformanceDuringACertainPeriodEditComponent>,
    public statementOfEmployeePerformanceDuringACertainPeriodService: StatementOfEmployeePerformanceDuringACertainPeriodService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementOfEmployeePerformanceDuringACertainPeriod = new StatementOfEmployeePerformanceDuringACertainPeriod();
    this.selectedStatementOfEmployeePerformanceDuringACertainPeriod = this.selectedStatementOfEmployeePerformanceDuringACertainPeriodDialog.data || this.selectedStatementOfEmployeePerformanceDuringACertainPeriod;

    
	this.performanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.performanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاداء',
	});


    this.statementOfEmployeePerformanceDuringACertainPeriodForm = this.formBuilder.group({
      
  id : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.id],
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
    this.statementOfEmployeePerformanceDuringACertainPeriodService.update(this.statementOfEmployeePerformanceDuringACertainPeriodForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.statementOfEmployeePerformanceDuringACertainPeriodService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.statementOfEmployeePerformanceDuringACertainPeriodForm.get(name);
  }

  initializeLookupServices() {
    this.performanceTypesService = new LookupService('performancetypes', this.http);
  }
}
