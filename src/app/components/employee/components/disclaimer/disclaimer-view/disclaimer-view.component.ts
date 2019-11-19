
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Disclaimer } from 'app/shared/models/disclaimer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DisclaimerService } from '../shared/disclaimer.service';

@Component({
  selector: 'app-disclaimer-view',
  templateUrl: './disclaimer-view.component.html',
  styleUrls: ['./disclaimer-view.component.scss'],
  providers: []
})

export class DisclaimerViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDisclaimer: Disclaimer;
  disclaimerForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDisclaimerDialog: any,
    @Optional() public dialogRef: MatDialogRef<DisclaimerViewComponent>,
    public disclaimerService: DisclaimerService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDisclaimer = this.selectedDisclaimerDialog.data || this.selectedDisclaimer;

    

    this.disclaimerForm = this.formBuilder.group({
      
  employeeCode : [this.selectedDisclaimer.employeeCode],
  disclaimerDate : [this.selectedDisclaimer.disclaimerDate],
  employeeName : [this.selectedDisclaimer.employeeName]
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
    return this.disclaimerForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.disclaimerForm.controls)) {
      this.disclaimerForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

