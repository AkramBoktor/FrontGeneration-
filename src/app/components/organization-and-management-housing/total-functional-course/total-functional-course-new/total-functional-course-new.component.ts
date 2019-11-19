
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TotalFunctionalCourse } from 'app/shared/models/total-functional-course';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TotalFunctionalCourseService } from '../shared/total-functional-course.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-total-functional-course-new',
  templateUrl: './total-functional-course-new.component.html',
  styleUrls: ['./total-functional-course-new.component.scss'],
  providers: [
    ]
})

export class TotalFunctionalCourseNewComponent extends AppBaseComponent implements OnInit {
  totalFunctionalCourseForm: FormGroup;
  @Input() selectedTotalFunctionalCourse: TotalFunctionalCourse;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
jobCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobCode', { static: true }) JobCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TotalFunctionalCourseNewComponent>,
    public totalFunctionalCourseService: TotalFunctionalCourseService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTotalFunctionalCourse = new TotalFunctionalCourse();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.jobCodeSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الوظيفه',
	});


    this.totalFunctionalCourseForm = this.formBuilder.group({
     
  id : [0],
  total : [this.selectedTotalFunctionalCourse.total, [ Validators.required ]],
  fixed : [this.selectedTotalFunctionalCourse.fixed, [ Validators.required ]],
  variable : [this.selectedTotalFunctionalCourse.variable, [ Validators.required ]],
  branchCode : [this.selectedTotalFunctionalCourse.branchCode, [ Validators.required ]],
  jobCode : [this.selectedTotalFunctionalCourse.jobCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.totalFunctionalCourseService.create(this.totalFunctionalCourseForm.value)
        .pipe(switchMap(x => {
			return this.totalFunctionalCourseService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.totalFunctionalCourseForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
 }
