
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CompleteInsuranceDataOnASchool } from 'app/shared/models/complete-insurance-data-on-a-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CompleteInsuranceDataOnASchoolService } from '../shared/complete-insurance-data-on-a-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-complete-insurance-data-on-a-school-view',
  templateUrl: './complete-insurance-data-on-a-school-view.component.html',
  styleUrls: ['./complete-insurance-data-on-a-school-view.component.scss'],
  providers: []
})

export class CompleteInsuranceDataOnASchoolViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCompleteInsuranceDataOnASchool: CompleteInsuranceDataOnASchool;
  completeInsuranceDataOnASchoolForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCompleteInsuranceDataOnASchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<CompleteInsuranceDataOnASchoolViewComponent>,
    public completeInsuranceDataOnASchoolService: CompleteInsuranceDataOnASchoolService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCompleteInsuranceDataOnASchool = this.selectedCompleteInsuranceDataOnASchoolDialog.data || this.selectedCompleteInsuranceDataOnASchool;

    

    this.completeInsuranceDataOnASchoolForm = this.formBuilder.group({
      
  buildingCode : [this.selectedCompleteInsuranceDataOnASchool.buildingCode],
  extensionCode : [this.selectedCompleteInsuranceDataOnASchool.extensionCode],
  schoolType : [this.selectedCompleteInsuranceDataOnASchool.schoolType],
  modelNumber : [this.selectedCompleteInsuranceDataOnASchool.modelNumber],
  floorsNumber : [this.selectedCompleteInsuranceDataOnASchool.floorsNumber],
  classroomNumber : [this.selectedCompleteInsuranceDataOnASchool.classroomNumber]
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
    return this.completeInsuranceDataOnASchoolForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.completeInsuranceDataOnASchoolForm.controls)) {
      this.completeInsuranceDataOnASchoolForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

