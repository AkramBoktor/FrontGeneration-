
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { StatementOfEmployeePerformanceDuringACertainPeriod } from 'app/shared/models/statement-of-employee-performance-during-a-certain-period';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { StatementOfEmployeePerformanceDuringACertainPeriodService } from '../shared/statement-of-employee-performance-during-a-certain-period.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-statement-of-employee-performance-during-a-certain-period-view',
  templateUrl: './statement-of-employee-performance-during-a-certain-period-view.component.html',
  styleUrls: ['./statement-of-employee-performance-during-a-certain-period-view.component.scss'],
  providers: []
})

export class StatementOfEmployeePerformanceDuringACertainPeriodViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedStatementOfEmployeePerformanceDuringACertainPeriod: StatementOfEmployeePerformanceDuringACertainPeriod;
  statementOfEmployeePerformanceDuringACertainPeriodForm: FormGroup;

  private performanceTypesService: LookupService;

  
performanceTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedStatementOfEmployeePerformanceDuringACertainPeriodDialog: any,
    @Optional() public dialogRef: MatDialogRef<StatementOfEmployeePerformanceDuringACertainPeriodViewComponent>,
    public statementOfEmployeePerformanceDuringACertainPeriodService: StatementOfEmployeePerformanceDuringACertainPeriodService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementOfEmployeePerformanceDuringACertainPeriod = this.selectedStatementOfEmployeePerformanceDuringACertainPeriodDialog.data || this.selectedStatementOfEmployeePerformanceDuringACertainPeriod;

    
	this.performanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.performanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاداء',
	});


    this.statementOfEmployeePerformanceDuringACertainPeriodForm = this.formBuilder.group({
      
  directManagerCode : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.directManagerCode],
  seniorManagerCode : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.seniorManagerCode],
  employeeCode : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.employeeCode],
  estimationYear : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.estimationYear],
  estimatePeriodFrom : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.estimatePeriodFrom],
  estimatePeriodTo : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.estimatePeriodTo],
  performanceCharacterization : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.performanceCharacterization],
  performanceType : [this.selectedStatementOfEmployeePerformanceDuringACertainPeriod.performanceType]
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
    return this.statementOfEmployeePerformanceDuringACertainPeriodForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.statementOfEmployeePerformanceDuringACertainPeriodForm.controls)) {
      this.statementOfEmployeePerformanceDuringACertainPeriodForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.performanceTypesService = new LookupService('performancetypes', this.http);
  }
}

