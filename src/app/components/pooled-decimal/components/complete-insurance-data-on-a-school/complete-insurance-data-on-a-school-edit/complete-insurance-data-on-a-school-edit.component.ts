
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CompleteInsuranceDataOnASchool } from 'app/shared/models/complete-insurance-data-on-a-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CompleteInsuranceDataOnASchoolService } from '../shared/complete-insurance-data-on-a-school.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-complete-insurance-data-on-a-school-edit',
  templateUrl: './complete-insurance-data-on-a-school-edit.component.html',
  styleUrls: ['./complete-insurance-data-on-a-school-edit.component.scss'],
  providers: []
})

export class CompleteInsuranceDataOnASchoolEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCompleteInsuranceDataOnASchool: CompleteInsuranceDataOnASchool;
  completeInsuranceDataOnASchoolForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCompleteInsuranceDataOnASchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<CompleteInsuranceDataOnASchoolEditComponent>,
    public completeInsuranceDataOnASchoolService: CompleteInsuranceDataOnASchoolService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCompleteInsuranceDataOnASchool = new CompleteInsuranceDataOnASchool();
    this.selectedCompleteInsuranceDataOnASchool = this.selectedCompleteInsuranceDataOnASchoolDialog.data || this.selectedCompleteInsuranceDataOnASchool;

    

    this.completeInsuranceDataOnASchoolForm = this.formBuilder.group({
      
  id : [this.selectedCompleteInsuranceDataOnASchool.id],
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
    this.completeInsuranceDataOnASchoolService.update(this.completeInsuranceDataOnASchoolForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.completeInsuranceDataOnASchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.completeInsuranceDataOnASchoolForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
