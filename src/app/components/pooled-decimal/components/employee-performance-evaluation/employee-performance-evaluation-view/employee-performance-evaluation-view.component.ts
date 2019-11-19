
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EmployeePerformanceEvaluation } from 'app/shared/models/employee-performance-evaluation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeePerformanceEvaluationService } from '../shared/employee-performance-evaluation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-performance-evaluation-view',
  templateUrl: './employee-performance-evaluation-view.component.html',
  styleUrls: ['./employee-performance-evaluation-view.component.scss'],
  providers: []
})

export class EmployeePerformanceEvaluationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeePerformanceEvaluation: EmployeePerformanceEvaluation;
  employeePerformanceEvaluationForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeePerformanceEvaluationDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeePerformanceEvaluationViewComponent>,
    public employeePerformanceEvaluationService: EmployeePerformanceEvaluationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeePerformanceEvaluation = this.selectedEmployeePerformanceEvaluationDialog.data || this.selectedEmployeePerformanceEvaluation;

    

    this.employeePerformanceEvaluationForm = this.formBuilder.group({
      
  directManagerNumber : [this.selectedEmployeePerformanceEvaluation.directManagerNumber],
  seniorManagerNumber : [this.selectedEmployeePerformanceEvaluation.seniorManagerNumber],
  employeeCode : [this.selectedEmployeePerformanceEvaluation.employeeCode],
  yearOfReport : [this.selectedEmployeePerformanceEvaluation.yearOfReport],
  reportPeriod : [this.selectedEmployeePerformanceEvaluation.reportPeriod],
  from : [this.selectedEmployeePerformanceEvaluation.from],
  to : [this.selectedEmployeePerformanceEvaluation.to],
  performanceType : [this.selectedEmployeePerformanceEvaluation.performanceType],
  description : [this.selectedEmployeePerformanceEvaluation.description]
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
    return this.employeePerformanceEvaluationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeePerformanceEvaluationForm.controls)) {
      this.employeePerformanceEvaluationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

