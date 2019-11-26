
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EnteringResortData } from 'app/shared/models/entering-resort-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EnteringResortDataService } from '../shared/entering-resort-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-entering-resort-data-view',
  templateUrl: './entering-resort-data-view.component.html',
  styleUrls: ['./entering-resort-data-view.component.scss'],
  providers: []
})

export class EnteringResortDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnteringResortData: EnteringResortData;
  enteringResortDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnteringResortDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnteringResortDataViewComponent>,
    public enteringResortDataService: EnteringResortDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnteringResortData = this.selectedEnteringResortDataDialog.data || this.selectedEnteringResortData;

    

    this.enteringResortDataForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEnteringResortData.employeeCode],
  employeeName : [this.selectedEnteringResortData.employeeName],
  membershipNo : [this.selectedEnteringResortData.membershipNo],
  resortPlace : [this.selectedEnteringResortData.resortPlace],
  resortStartDate : [this.selectedEnteringResortData.resortStartDate],
  resortEndDate : [this.selectedEnteringResortData.resortEndDate],
  floorNumber : [this.selectedEnteringResortData.floorNumber],
  apartmentNumber : [this.selectedEnteringResortData.apartmentNumber],
  resortValue : [this.selectedEnteringResortData.resortValue],
  insuranceValue : [this.selectedEnteringResortData.insuranceValue],
  insuranceExpenses : [this.selectedEnteringResortData.insuranceExpenses],
  companionsNumber : [this.selectedEnteringResortData.companionsNumber],
  insuranceDeductionValue : [this.selectedEnteringResortData.insuranceDeductionValue]
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
    return this.enteringResortDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.enteringResortDataForm.controls)) {
      this.enteringResortDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

