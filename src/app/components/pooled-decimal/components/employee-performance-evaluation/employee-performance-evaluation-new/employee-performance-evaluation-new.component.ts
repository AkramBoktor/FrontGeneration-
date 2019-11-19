
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EmployeePerformanceEvaluation } from 'app/shared/models/employee-performance-evaluation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeePerformanceEvaluationService } from '../shared/employee-performance-evaluation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-performance-evaluation-new',
  templateUrl: './employee-performance-evaluation-new.component.html',
  styleUrls: ['./employee-performance-evaluation-new.component.scss'],
  providers: [
    ]
})

export class EmployeePerformanceEvaluationNewComponent extends AppBaseComponent implements OnInit {
  employeePerformanceEvaluationForm: FormGroup;
  @Input() selectedEmployeePerformanceEvaluation: EmployeePerformanceEvaluation;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeePerformanceEvaluationNewComponent>,
    public employeePerformanceEvaluationService: EmployeePerformanceEvaluationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeePerformanceEvaluation = new EmployeePerformanceEvaluation();

    

    this.employeePerformanceEvaluationForm = this.formBuilder.group({
     
  id : [0],
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
    this.employeePerformanceEvaluationService.create(this.employeePerformanceEvaluationForm.value)
        .pipe(switchMap(x => {
			return this.employeePerformanceEvaluationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeePerformanceEvaluationForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
