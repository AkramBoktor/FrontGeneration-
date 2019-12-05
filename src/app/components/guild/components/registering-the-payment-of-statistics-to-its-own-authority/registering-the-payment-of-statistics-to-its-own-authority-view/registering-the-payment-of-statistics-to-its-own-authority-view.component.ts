
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthority } from 'app/shared/models/registering-the-payment-of-statistics-to-its-own-authority';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityService } from '../shared/registering-the-payment-of-statistics-to-its-own-authority.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-registering-the-payment-of-statistics-to-its-own-authority-view',
  templateUrl: './registering-the-payment-of-statistics-to-its-own-authority-view.component.html',
  styleUrls: ['./registering-the-payment-of-statistics-to-its-own-authority-view.component.scss'],
  providers: []
})

export class RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority: RegisteringThePaymentOfStatisticsToItsOwnAuthority;
  registeringThePaymentOfStatisticsToItsOwnAuthorityForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisteringThePaymentOfStatisticsToItsOwnAuthorityDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent>,
    public registeringThePaymentOfStatisticsToItsOwnAuthorityService: RegisteringThePaymentOfStatisticsToItsOwnAuthorityService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority = this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthorityDialog.data || this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority;

    

    this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm = this.formBuilder.group({
      
  collectionNumber : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.collectionNumber],
  collectionDate : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.collectionDate],
  collectionAmount : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.collectionAmount],
  from : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.from],
  to : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.to]
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
    return this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm.controls)) {
      this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

