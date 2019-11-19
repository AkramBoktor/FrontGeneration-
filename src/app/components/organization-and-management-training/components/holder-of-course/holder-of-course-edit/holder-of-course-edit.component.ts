
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { HolderOfCourse } from 'app/shared/models/holder-of-course';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { HolderOfCourseService } from '../shared/holder-of-course.service';




@Component({
  selector: 'app-holder-of-course-edit',
  templateUrl: './holder-of-course-edit.component.html',
  styleUrls: ['./holder-of-course-edit.component.scss'],
  providers: []
})

export class HolderOfCourseEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedHolderOfCourse: HolderOfCourse;
  holderOfCourseForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private departmentsSectionsService: LookupService;
private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;
private sessionDestinationCodesService: LookupService;
private sessionSerialsService: LookupService;
private unitDurationSessionsService: LookupService;

  
managementCodeSelectOptions: MaterialSelectOptions;
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;
courseDestinationCodeSelectOptions: MaterialSelectOptions;
serialSessionSelectOptions: MaterialSelectOptions;
courseUnitDurationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('managementCode', { static: true }) ManagementCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;
	@ViewChild('courseDestinationCode', { static: true }) CourseDestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('serialSession', { static: true }) SerialSessionSelectComponent: MaterialSelectComponent;
	@ViewChild('courseUnitDuration', { static: true }) CourseUnitDurationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedHolderOfCourseDialog: any,
    @Optional() public dialogRef: MatDialogRef<HolderOfCourseEditComponent>,
    public holderOfCourseService: HolderOfCourseService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedHolderOfCourse = new HolderOfCourse();
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

	this.courseDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sessionDestinationCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهه الدوره',
	});

	this.serialSessionSelectOptions = new MaterialSelectOptions({
	 data: this.sessionSerialsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مسلسل الدوره',
	});

	this.courseUnitDurationSelectOptions = new MaterialSelectOptions({
	 data: this.unitDurationSessionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحده مده الدوره',
	});


    this.holderOfCourseForm = this.formBuilder.group({
      
  id : [this.selectedHolderOfCourse.id],
  employeeCode : [this.selectedHolderOfCourse.employeeCode, [ Validators.required ]],
  trainingYear : [this.selectedHolderOfCourse.trainingYear, [ Validators.required ]],
  courseCode : [this.selectedHolderOfCourse.courseCode, [ Validators.required ]],
  courseDuration : [this.selectedHolderOfCourse.courseDuration, [ Validators.required ]],
  beginningSessionDate : [this.selectedHolderOfCourse.beginningSessionDate, [ Validators.required ]],
  courseCost : [this.selectedHolderOfCourse.courseCost, [ Validators.required ]],
  managementCode : [this.selectedHolderOfCourse.managementCode, [ Validators.required ]],
  majorClassification : [this.selectedHolderOfCourse.majorClassification, [ Validators.required ]],
  subcategory : [this.selectedHolderOfCourse.subcategory, [ Validators.required ]],
  courseDestinationCode : [this.selectedHolderOfCourse.courseDestinationCode, [ Validators.required ]],
  serialSession : [this.selectedHolderOfCourse.serialSession, [ Validators.required ]],
  courseUnitDuration : [this.selectedHolderOfCourse.courseUnitDuration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.holderOfCourseService.update(this.holderOfCourseForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.holderOfCourseService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.holderOfCourseForm.get(name);
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
this.sessionDestinationCodesService = new LookupService('sessiondestinationcodes', this.http);
this.sessionSerialsService = new LookupService('sessionserials', this.http);
this.unitDurationSessionsService = new LookupService('unitdurationsessions', this.http);
  }
}
