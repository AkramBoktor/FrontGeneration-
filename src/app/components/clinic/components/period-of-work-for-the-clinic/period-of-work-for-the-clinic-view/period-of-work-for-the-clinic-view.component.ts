
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PeriodOfWorkForTheClinic } from 'app/shared/models/period-of-work-for-the-clinic';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PeriodOfWorkForTheClinicService } from '../shared/period-of-work-for-the-clinic.service';

@Component({
  selector: 'app-period-of-work-for-the-clinic-view',
  templateUrl: './period-of-work-for-the-clinic-view.component.html',
  styleUrls: ['./period-of-work-for-the-clinic-view.component.scss'],
  providers: []
})

export class PeriodOfWorkForTheClinicViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPeriodOfWorkForTheClinic: PeriodOfWorkForTheClinic;
  periodOfWorkForTheClinicForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPeriodOfWorkForTheClinicDialog: any,
    @Optional() public dialogRef: MatDialogRef<PeriodOfWorkForTheClinicViewComponent>,
    public periodOfWorkForTheClinicService: PeriodOfWorkForTheClinicService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeriodOfWorkForTheClinic = this.selectedPeriodOfWorkForTheClinicDialog.data || this.selectedPeriodOfWorkForTheClinic;

    

    this.periodOfWorkForTheClinicForm = this.formBuilder.group({
      
  day : [this.selectedPeriodOfWorkForTheClinic.day],
  from : [this.selectedPeriodOfWorkForTheClinic.from],
  to : [this.selectedPeriodOfWorkForTheClinic.to],
  employeeCode : [this.selectedPeriodOfWorkForTheClinic.employeeCode],
  notes : [this.selectedPeriodOfWorkForTheClinic.notes],
  employeeName : [this.selectedPeriodOfWorkForTheClinic.employeeName]
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
    return this.periodOfWorkForTheClinicForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.periodOfWorkForTheClinicForm.controls)) {
      this.periodOfWorkForTheClinicForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

