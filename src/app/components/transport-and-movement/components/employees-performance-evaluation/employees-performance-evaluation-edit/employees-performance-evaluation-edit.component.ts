
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeesPerformanceEvaluation } from 'app/shared/models/employees-performance-evaluation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EmployeesPerformanceEvaluationService } from '../shared/employees-performance-evaluation.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employees-performance-evaluation-edit',
  templateUrl: './employees-performance-evaluation-edit.component.html',
  styleUrls: ['./employees-performance-evaluation-edit.component.scss'],
  providers: []
})

export class EmployeesPerformanceEvaluationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeesPerformanceEvaluation: EmployeesPerformanceEvaluation;
  employeesPerformanceEvaluationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private performanceTypesService: LookupService;

  
performanceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('performanceType', { static: true }) PerformanceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeesPerformanceEvaluationDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeesPerformanceEvaluationEditComponent>,
    public employeesPerformanceEvaluationService: EmployeesPerformanceEvaluationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeesPerformanceEvaluation = new EmployeesPerformanceEvaluation();
    this.selectedEmployeesPerformanceEvaluation = this.selectedEmployeesPerformanceEvaluationDialog.data || this.selectedEmployeesPerformanceEvaluation;

    
	this.performanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.performanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاداء ',
	});


    this.employeesPerformanceEvaluationForm = this.formBuilder.group({
      
  id : [this.selectedEmployeesPerformanceEvaluation.id],
  directManagerNumber : [this.selectedEmployeesPerformanceEvaluation.directManagerNumber, [ Validators.required ]],
  seniorManagerNumber : [this.selectedEmployeesPerformanceEvaluation.seniorManagerNumber, [ Validators.required ]],
  employeeCode : [this.selectedEmployeesPerformanceEvaluation.employeeCode, [ Validators.required ]],
  yearOfReport : [this.selectedEmployeesPerformanceEvaluation.yearOfReport, [ Validators.required ]],
  reportPeriod : [this.selectedEmployeesPerformanceEvaluation.reportPeriod, [ Validators.required ]],
  from : [this.selectedEmployeesPerformanceEvaluation.from, [ Validators.required ]],
  to : [this.selectedEmployeesPerformanceEvaluation.to, [ Validators.required ]],
  details : [this.selectedEmployeesPerformanceEvaluation.details, [ Validators.required ]],
  performanceType : [this.selectedEmployeesPerformanceEvaluation.performanceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.employeesPerformanceEvaluationService.update(this.employeesPerformanceEvaluationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.employeesPerformanceEvaluationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.employeesPerformanceEvaluationForm.get(name);
  }

  initializeLookupServices() {
    this.performanceTypesService = new LookupService('performancetypes', this.http);
  }
}
