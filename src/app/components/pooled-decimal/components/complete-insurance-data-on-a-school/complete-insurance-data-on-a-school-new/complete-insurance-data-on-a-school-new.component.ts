
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CompleteInsuranceDataOnASchool } from 'app/shared/models/complete-insurance-data-on-a-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CompleteInsuranceDataOnASchoolService } from '../shared/complete-insurance-data-on-a-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-complete-insurance-data-on-a-school-new',
  templateUrl: './complete-insurance-data-on-a-school-new.component.html',
  styleUrls: ['./complete-insurance-data-on-a-school-new.component.scss'],
  providers: [
    ]
})

export class CompleteInsuranceDataOnASchoolNewComponent extends AppBaseComponent implements OnInit {
  completeInsuranceDataOnASchoolForm: FormGroup;
  @Input() selectedCompleteInsuranceDataOnASchool: CompleteInsuranceDataOnASchool;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CompleteInsuranceDataOnASchoolNewComponent>,
    public completeInsuranceDataOnASchoolService: CompleteInsuranceDataOnASchoolService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCompleteInsuranceDataOnASchool = new CompleteInsuranceDataOnASchool();

    

    this.completeInsuranceDataOnASchoolForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedCompleteInsuranceDataOnASchool.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedCompleteInsuranceDataOnASchool.extensionCode, [ Validators.required ]],
  schoolType : [this.selectedCompleteInsuranceDataOnASchool.schoolType, [ Validators.required ]],
  modelNumber : [this.selectedCompleteInsuranceDataOnASchool.modelNumber, [ Validators.required ]],
  floorsNumber : [this.selectedCompleteInsuranceDataOnASchool.floorsNumber, [ Validators.required ]],
  classroomNumber : [this.selectedCompleteInsuranceDataOnASchool.classroomNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.completeInsuranceDataOnASchoolService.create(this.completeInsuranceDataOnASchoolForm.value)
        .pipe(switchMap(x => {
			return this.completeInsuranceDataOnASchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.completeInsuranceDataOnASchoolForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
