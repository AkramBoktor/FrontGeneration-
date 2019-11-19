
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MembershipData } from 'app/shared/models/membership-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MembershipDataService } from '../shared/membership-data.service';

@Component({
  selector: 'app-membership-data-view',
  templateUrl: './membership-data-view.component.html',
  styleUrls: ['./membership-data-view.component.scss'],
  providers: []
})

export class MembershipDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMembershipData: MembershipData;
  membershipDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMembershipDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<MembershipDataViewComponent>,
    public membershipDataService: MembershipDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMembershipData = this.selectedMembershipDataDialog.data || this.selectedMembershipData;

    

    this.membershipDataForm = this.formBuilder.group({
      
  employeeCode : [this.selectedMembershipData.employeeCode],
  job : [this.selectedMembershipData.job],
  iDNumber : [this.selectedMembershipData.iDNumber],
  residence : [this.selectedMembershipData.residence],
  sharesNumber : [this.selectedMembershipData.sharesNumber],
  membershipNumber : [this.selectedMembershipData.membershipNumber],
  membershipDate : [this.selectedMembershipData.membershipDate],
  profitAmount : [this.selectedMembershipData.profitAmount]
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
    return this.membershipDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.membershipDataForm.controls)) {
      this.membershipDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

