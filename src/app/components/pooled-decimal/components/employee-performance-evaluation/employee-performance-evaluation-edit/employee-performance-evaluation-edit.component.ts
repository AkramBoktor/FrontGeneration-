
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeePerformanceEvaluation } from 'app/shared/models/employee-performance-evaluation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EmployeePerformanceEvaluationService } from '../shared/employee-performance-evaluation.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-performance-evaluation-edit',
  templateUrl: './employee-performance-evaluation-edit.component.html',
  styleUrls: ['./employee-performance-evaluation-edit.component.scss'],
  providers: []
})

export class EmployeePerformanceEvaluationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeePerformanceEvaluation: EmployeePerformanceEvaluation;
  employeePerformanceEvaluationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeePerformanceEvaluationDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeePerformanceEvaluationEditComponent>,
    public employeePerformanceEvaluationService: EmployeePerformanceEvaluationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeePerformanceEvaluation = new EmployeePerformanceEvaluation();
    this.selectedEmployeePerformanceEvaluation = this.selectedEmployeePerformanceEvaluationDialog.data || this.selectedEmployeePerformanceEvaluation;

    

    this.employeePerformanceEvaluationForm = this.formBuilder.group({
      
  id : [this.selectedEmployeePerformanceEvaluation.id],
  directManagerNumber : [this.selectedEmployeePerformanceEvaluation.directManagerNumber, [ Validators.required ]],
  seniorManagerNumber : [this.selectedEmployeePerformanceEvaluation.seniorManagerNumber, [ Validators.required ]],
  employeeCode : [this.selectedEmployeePerformanceEvaluation.employeeCode, [ Validators.required ]],
  yearOfReport : [this.selectedEmployeePerformanceEvaluation.yearOfReport, [ Validators.required ]],
  reportPeriod : [this.selectedEmployeePerformanceEvaluation.reportPeriod, [ Validators.required ]],
  from : [this.selectedEmployeePerformanceEvaluation.from, [ Validators.required ]],
  to : [this.selectedEmployeePerformanceEvaluation.to, [ Validators.required ]],
  performanceType : [this.selectedEmployeePerformanceEvaluation.performanceType, [ Validators.required ]],
  description : [this.selectedEmployeePerformanceEvaluation.description, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeePerformanceEvaluationService.update(this.employeePerformanceEvaluationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeePerformanceEvaluationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeePerformanceEvaluationForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
