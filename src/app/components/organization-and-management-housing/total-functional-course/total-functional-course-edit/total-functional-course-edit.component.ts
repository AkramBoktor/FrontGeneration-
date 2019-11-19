
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TotalFunctionalCourse } from 'app/shared/models/total-functional-course';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TotalFunctionalCourseService } from '../shared/total-functional-course.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-total-functional-course-edit',
  templateUrl: './total-functional-course-edit.component.html',
  styleUrls: ['./total-functional-course-edit.component.scss'],
  providers: []
})

export class TotalFunctionalCourseEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTotalFunctionalCourse: TotalFunctionalCourse;
  totalFunctionalCourseForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
jobCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobCode', { static: true }) JobCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTotalFunctionalCourseDialog: any,
    @Optional() public dialogRef: MatDialogRef<TotalFunctionalCourseEditComponent>,
    public totalFunctionalCourseService: TotalFunctionalCourseService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTotalFunctionalCourse = new TotalFunctionalCourse();
    this.selectedTotalFunctionalCourse = this.selectedTotalFunctionalCourseDialog.data || this.selectedTotalFunctionalCourse;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.jobCodeSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الوظيفه',
	});


    this.totalFunctionalCourseForm = this.formBuilder.group({
      
  id : [this.selectedTotalFunctionalCourse.id],
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
    this.totalFunctionalCourseService.update(this.totalFunctionalCourseForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.totalFunctionalCourseService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.totalFunctionalCourseForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}
