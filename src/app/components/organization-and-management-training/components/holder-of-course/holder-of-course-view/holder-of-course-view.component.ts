
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { HolderOfCourse } from 'app/shared/models/holder-of-course';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { HolderOfCourseService } from '../shared/holder-of-course.service';

@Component({
  selector: 'app-holder-of-course-view',
  templateUrl: './holder-of-course-view.component.html',
  styleUrls: ['./holder-of-course-view.component.scss'],
  providers: []
})

export class HolderOfCourseViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedHolderOfCourse: HolderOfCourse;
  holderOfCourseForm: FormGroup;

  private departmentsSectionsService: LookupService;
private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;
private unitDurationSessionsService: LookupService;

  
managementCodeSelectOptions: MaterialSelectOptions;
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;
courseUnitDurationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedHolderOfCourseDialog: any,
    @Optional() public dialogRef: MatDialogRef<HolderOfCourseViewComponent>,
    public holderOfCourseService: HolderOfCourseService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedHolderOfCourse = this.selectedHolderOfCourseDialog.data || this.selectedHolderOfCourse;

    
	this.managementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

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

	this.courseUnitDurationSelectOptions = new MaterialSelectOptions({
	 data: this.unitDurationSessionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحده مده الدوره',
	});


    this.holderOfCourseForm = this.formBuilder.group({
      
  employeeCode : [this.selectedHolderOfCourse.employeeCode],
  trainingYear : [this.selectedHolderOfCourse.trainingYear],
  courseCode : [this.selectedHolderOfCourse.courseCode],
  courseDestinationCode : [this.selectedHolderOfCourse.courseDestinationCode],
  serialSession : [this.selectedHolderOfCourse.serialSession],
  courseDuration : [this.selectedHolderOfCourse.courseDuration],
  beginningSessionDate : [this.selectedHolderOfCourse.beginningSessionDate],
  courseCost : [this.selectedHolderOfCourse.courseCost],
  managementCode : [this.selectedHolderOfCourse.managementCode],
  majorClassification : [this.selectedHolderOfCourse.majorClassification],
  subcategory : [this.selectedHolderOfCourse.subcategory],
  courseUnitDuration : [this.selectedHolderOfCourse.courseUnitDuration]
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
    return this.holderOfCourseForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.holderOfCourseForm.controls)) {
      this.holderOfCourseForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
this.unitDurationSessionsService = new LookupService('unitdurationsessions', this.http);
  }
}

