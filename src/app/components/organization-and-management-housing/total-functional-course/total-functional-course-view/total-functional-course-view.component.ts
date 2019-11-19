
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TotalFunctionalCourse } from 'app/shared/models/total-functional-course';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TotalFunctionalCourseService } from '../shared/total-functional-course.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-total-functional-course-view',
  templateUrl: './total-functional-course-view.component.html',
  styleUrls: ['./total-functional-course-view.component.scss'],
  providers: []
})

export class TotalFunctionalCourseViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTotalFunctionalCourse: TotalFunctionalCourse;
  totalFunctionalCourseForm: FormGroup;

  private branchCodesService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
jobCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTotalFunctionalCourseDialog: any,
    @Optional() public dialogRef: MatDialogRef<TotalFunctionalCourseViewComponent>,
    public totalFunctionalCourseService: TotalFunctionalCourseService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTotalFunctionalCourse = this.selectedTotalFunctionalCourseDialog.data || this.selectedTotalFunctionalCourse;

    
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
      
  total : [this.selectedTotalFunctionalCourse.total],
  fixed : [this.selectedTotalFunctionalCourse.fixed],
  variable : [this.selectedTotalFunctionalCourse.variable],
  branchCode : [this.selectedTotalFunctionalCourse.branchCode],
  jobCode : [this.selectedTotalFunctionalCourse.jobCode]
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
    return this.totalFunctionalCourseForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.totalFunctionalCourseForm.controls)) {
      this.totalFunctionalCourseForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

