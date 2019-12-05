
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EmployeesPerformanceEvaluation } from 'app/shared/models/employees-performance-evaluation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeesPerformanceEvaluationService } from '../shared/employees-performance-evaluation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employees-performance-evaluation-view',
  templateUrl: './employees-performance-evaluation-view.component.html',
  styleUrls: ['./employees-performance-evaluation-view.component.scss'],
  providers: []
})

export class EmployeesPerformanceEvaluationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeesPerformanceEvaluation: EmployeesPerformanceEvaluation;
  employeesPerformanceEvaluationForm: FormGroup;

  private performanceTypesService: LookupService;

  
performanceTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeesPerformanceEvaluationDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeesPerformanceEvaluationViewComponent>,
    public employeesPerformanceEvaluationService: EmployeesPerformanceEvaluationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeesPerformanceEvaluation = this.selectedEmployeesPerformanceEvaluationDialog.data || this.selectedEmployeesPerformanceEvaluation;

    
	this.performanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.performanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاداء ',
	});


    this.employeesPerformanceEvaluationForm = this.formBuilder.group({
      
  directManagerNumber : [this.selectedEmployeesPerformanceEvaluation.directManagerNumber],
  seniorManagerNumber : [this.selectedEmployeesPerformanceEvaluation.seniorManagerNumber],
  employeeCode : [this.selectedEmployeesPerformanceEvaluation.employeeCode],
  yearOfReport : [this.selectedEmployeesPerformanceEvaluation.yearOfReport],
  reportPeriod : [this.selectedEmployeesPerformanceEvaluation.reportPeriod],
  from : [this.selectedEmployeesPerformanceEvaluation.from],
  to : [this.selectedEmployeesPerformanceEvaluation.to],
  details : [this.selectedEmployeesPerformanceEvaluation.details],
  performanceType : [this.selectedEmployeesPerformanceEvaluation.performanceType]
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
    return this.employeesPerformanceEvaluationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeesPerformanceEvaluationForm.controls)) {
      this.employeesPerformanceEvaluationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.performanceTypesService = new LookupService('performancetypes', this.http);
  }
}

