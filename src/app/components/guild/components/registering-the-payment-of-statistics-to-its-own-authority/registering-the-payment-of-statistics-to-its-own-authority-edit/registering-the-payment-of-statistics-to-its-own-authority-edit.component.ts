
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthority } from 'app/shared/models/registering-the-payment-of-statistics-to-its-own-authority';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityService } from '../shared/registering-the-payment-of-statistics-to-its-own-authority.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-registering-the-payment-of-statistics-to-its-own-authority-edit',
  templateUrl: './registering-the-payment-of-statistics-to-its-own-authority-edit.component.html',
  styleUrls: ['./registering-the-payment-of-statistics-to-its-own-authority-edit.component.scss'],
  providers: []
})

export class RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority: RegisteringThePaymentOfStatisticsToItsOwnAuthority;
  registeringThePaymentOfStatisticsToItsOwnAuthorityForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisteringThePaymentOfStatisticsToItsOwnAuthorityDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent>,
    public registeringThePaymentOfStatisticsToItsOwnAuthorityService: RegisteringThePaymentOfStatisticsToItsOwnAuthorityService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority = new RegisteringThePaymentOfStatisticsToItsOwnAuthority();
    this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority = this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthorityDialog.data || this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority;

    

    this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm = this.formBuilder.group({
      
  id : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.id],
  collectionNumber : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.collectionNumber, [ Validators.required ]],
  collectionDate : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.collectionDate, [ Validators.required ]],
  collectionAmount : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.collectionAmount, [ Validators.required ]],
  from : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.from, [ Validators.required ]],
  to : [this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority.to, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.registeringThePaymentOfStatisticsToItsOwnAuthorityService.update(this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.registeringThePaymentOfStatisticsToItsOwnAuthorityService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
