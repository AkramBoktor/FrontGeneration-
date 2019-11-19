
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CoursesCode } from 'app/shared/models/courses-code';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { CoursesCodeService } from '../shared/courses-code.service';




@Component({
  selector: 'app-courses-code-edit',
  templateUrl: './courses-code-edit.component.html',
  styleUrls: ['./courses-code-edit.component.scss'],
  providers: []
})

export class CoursesCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCoursesCode: CoursesCode;
  coursesCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;

  
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCoursesCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<CoursesCodeEditComponent>,
    public coursesCodeService: CoursesCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCoursesCode = new CoursesCode();
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
      
  id : [this.selectedCoursesCode.id],
  courseCode : [this.selectedCoursesCode.courseCode, [ Validators.required ]],
  courseName : [this.selectedCoursesCode.courseName, [ Validators.required ]],
  majorClassification : [this.selectedCoursesCode.majorClassification, [ Validators.required ]],
  subcategory : [this.selectedCoursesCode.subcategory, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.coursesCodeService.update(this.coursesCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.coursesCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.coursesCodeForm.get(name);
  }

  initializeLookupServices() {
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
  }
}
