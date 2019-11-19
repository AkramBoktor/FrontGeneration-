
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PeriodOfWorkForThePharmacy } from 'app/shared/models/period-of-work-for-the-pharmacy';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PeriodOfWorkForThePharmacyService } from '../shared/period-of-work-for-the-pharmacy.service';

@Component({
  selector: 'app-period-of-work-for-the-pharmacy-view',
  templateUrl: './period-of-work-for-the-pharmacy-view.component.html',
  styleUrls: ['./period-of-work-for-the-pharmacy-view.component.scss'],
  providers: []
})

export class PeriodOfWorkForThePharmacyViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPeriodOfWorkForThePharmacy: PeriodOfWorkForThePharmacy;
  periodOfWorkForThePharmacyForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPeriodOfWorkForThePharmacyDialog: any,
    @Optional() public dialogRef: MatDialogRef<PeriodOfWorkForThePharmacyViewComponent>,
    public periodOfWorkForThePharmacyService: PeriodOfWorkForThePharmacyService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeriodOfWorkForThePharmacy = this.selectedPeriodOfWorkForThePharmacyDialog.data || this.selectedPeriodOfWorkForThePharmacy;

    

    this.periodOfWorkForThePharmacyForm = this.formBuilder.group({
      
  day : [this.selectedPeriodOfWorkForThePharmacy.day],
  from : [this.selectedPeriodOfWorkForThePharmacy.from],
  to : [this.selectedPeriodOfWorkForThePharmacy.to],
  employeeCode : [this.selectedPeriodOfWorkForThePharmacy.employeeCode],
  employeeName : [this.selectedPeriodOfWorkForThePharmacy.employeeName],
  notes : [this.selectedPeriodOfWorkForThePharmacy.notes]
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
    return this.periodOfWorkForThePharmacyForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.periodOfWorkForThePharmacyForm.controls)) {
      this.periodOfWorkForThePharmacyForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

