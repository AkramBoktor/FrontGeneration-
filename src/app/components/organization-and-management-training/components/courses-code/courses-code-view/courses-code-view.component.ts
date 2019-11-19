
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CoursesCode } from 'app/shared/models/courses-code';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CoursesCodeService } from '../shared/courses-code.service';

@Component({
  selector: 'app-courses-code-view',
  templateUrl: './courses-code-view.component.html',
  styleUrls: ['./courses-code-view.component.scss'],
  providers: []
})

export class CoursesCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCoursesCode: CoursesCode;
  coursesCodeForm: FormGroup;

  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCoursesCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<CoursesCodeViewComponent>,
    public coursesCodeService: CoursesCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCoursesCode = this.selectedCoursesCodeDialog.data || this.selectedCoursesCode;

    
	this.majorClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.majorClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف رئيسى',
	});

	this.subcategorySelectOptions = new MaterialSelectOptions({
	 data: this.subClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف فرعى',
	});


    this.coursesCodeForm = this.formBuilder.group({
      
  courseCode : [this.selectedCoursesCode.courseCode],
  courseName : [this.selectedCoursesCode.courseName],
  majorClassification : [this.selectedCoursesCode.majorClassification],
  subcategory : [this.selectedCoursesCode.subcategory]
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
    return this.coursesCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.coursesCodeForm.controls)) {
      this.coursesCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
  }
}

