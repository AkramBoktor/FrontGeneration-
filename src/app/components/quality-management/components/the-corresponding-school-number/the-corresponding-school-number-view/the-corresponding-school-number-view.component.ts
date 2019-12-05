
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TheCorrespondingSchoolNumber } from 'app/shared/models/the-corresponding-school-number';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TheCorrespondingSchoolNumberService } from '../shared/the-corresponding-school-number.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-corresponding-school-number-view',
  templateUrl: './the-corresponding-school-number-view.component.html',
  styleUrls: ['./the-corresponding-school-number-view.component.scss'],
  providers: []
})

export class TheCorrespondingSchoolNumberViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheCorrespondingSchoolNumber: TheCorrespondingSchoolNumber;
  theCorrespondingSchoolNumberForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheCorrespondingSchoolNumberDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheCorrespondingSchoolNumberViewComponent>,
    public theCorrespondingSchoolNumberService: TheCorrespondingSchoolNumberService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheCorrespondingSchoolNumber = this.selectedTheCorrespondingSchoolNumberDialog.data || this.selectedTheCorrespondingSchoolNumber;

    

    this.theCorrespondingSchoolNumberForm = this.formBuilder.group({
      
  oderNumber : [this.selectedTheCorrespondingSchoolNumber.oderNumber],
  currentSchoolCode : [this.selectedTheCorrespondingSchoolNumber.currentSchoolCode],
  correspondingSchool : [this.selectedTheCorrespondingSchoolNumber.correspondingSchool]
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
    return this.theCorrespondingSchoolNumberForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.theCorrespondingSchoolNumberForm.controls)) {
      this.theCorrespondingSchoolNumberForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

