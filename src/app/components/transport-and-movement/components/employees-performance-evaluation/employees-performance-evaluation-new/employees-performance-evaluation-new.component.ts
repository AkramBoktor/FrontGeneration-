
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EmployeesPerformanceEvaluation } from 'app/shared/models/employees-performance-evaluation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeesPerformanceEvaluationService } from '../shared/employees-performance-evaluation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employees-performance-evaluation-new',
  templateUrl: './employees-performance-evaluation-new.component.html',
  styleUrls: ['./employees-performance-evaluation-new.component.scss'],
  providers: [
    ]
})

export class EmployeesPerformanceEvaluationNewComponent extends AppBaseComponent implements OnInit {
  employeesPerformanceEvaluationForm: FormGroup;
  @Input() selectedEmployeesPerformanceEvaluation: EmployeesPerformanceEvaluation;
  errorMessages: FormControlError[] = [
        
  ];

  private performanceTypesService: LookupService;

  
performanceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('performanceType', { static: true }) PerformanceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EmployeesPerformanceEvaluationNewComponent>,
    public employeesPerformanceEvaluationService: EmployeesPerformanceEvaluationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeesPerformanceEvaluation = new EmployeesPerformanceEvaluation();

    
	this.performanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.performanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاداء ',
	});


    this.employeesPerformanceEvaluationForm = this.formBuilder.group({
     
  id : [0],
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
    this.employeesPerformanceEvaluationService.create(this.employeesPerformanceEvaluationForm.value)
        .pipe(switchMap(x => {
			return this.employeesPerformanceEvaluationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.employeesPerformanceEvaluationForm.get(name);
    }

  initializeLookupServices() {
    this.performanceTypesService = new LookupService('performancetypes', this.http);
  }
 }
