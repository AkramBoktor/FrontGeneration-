
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SchoolAreExcludedFromQualityControl } from 'app/shared/models/school-are-excluded-from-quality-control';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolAreExcludedFromQualityControlService } from '../shared/school-are-excluded-from-quality-control.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-school-are-excluded-from-quality-control-new',
  templateUrl: './school-are-excluded-from-quality-control-new.component.html',
  styleUrls: ['./school-are-excluded-from-quality-control-new.component.scss'],
  providers: [
    ]
})

export class SchoolAreExcludedFromQualityControlNewComponent extends AppBaseComponent implements OnInit {
  schoolAreExcludedFromQualityControlForm: FormGroup;
  @Input() selectedSchoolAreExcludedFromQualityControl: SchoolAreExcludedFromQualityControl;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SchoolAreExcludedFromQualityControlNewComponent>,
    public schoolAreExcludedFromQualityControlService: SchoolAreExcludedFromQualityControlService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolAreExcludedFromQualityControl = new SchoolAreExcludedFromQualityControl();

    

    this.schoolAreExcludedFromQualityControlForm = this.formBuilder.group({
     
  id : [0],
  schoolCode : [this.selectedSchoolAreExcludedFromQualityControl.schoolCode, [ Validators.required ]],
  schoolName : [this.selectedSchoolAreExcludedFromQualityControl.schoolName, [ Validators.required ]],
  date : [this.selectedSchoolAreExcludedFromQualityControl.date, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.schoolAreExcludedFromQualityControlService.create(this.schoolAreExcludedFromQualityControlForm.value)
        .pipe(switchMap(x => {
			return this.schoolAreExcludedFromQualityControlService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.schoolAreExcludedFromQualityControlForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
