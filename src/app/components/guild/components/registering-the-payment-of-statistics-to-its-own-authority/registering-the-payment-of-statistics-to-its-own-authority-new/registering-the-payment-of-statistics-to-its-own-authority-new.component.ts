
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthority } from 'app/shared/models/registering-the-payment-of-statistics-to-its-own-authority';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityService } from '../shared/registering-the-payment-of-statistics-to-its-own-authority.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-registering-the-payment-of-statistics-to-its-own-authority-new',
  templateUrl: './registering-the-payment-of-statistics-to-its-own-authority-new.component.html',
  styleUrls: ['./registering-the-payment-of-statistics-to-its-own-authority-new.component.scss'],
  providers: [
    ]
})

export class RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent extends AppBaseComponent implements OnInit {
  registeringThePaymentOfStatisticsToItsOwnAuthorityForm: FormGroup;
  @Input() selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority: RegisteringThePaymentOfStatisticsToItsOwnAuthority;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent>,
    public registeringThePaymentOfStatisticsToItsOwnAuthorityService: RegisteringThePaymentOfStatisticsToItsOwnAuthorityService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisteringThePaymentOfStatisticsToItsOwnAuthority = new RegisteringThePaymentOfStatisticsToItsOwnAuthority();

    

    this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm = this.formBuilder.group({
     
  id : [0],
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
    this.registeringThePaymentOfStatisticsToItsOwnAuthorityService.create(this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm.value)
        .pipe(switchMap(x => {
			return this.registeringThePaymentOfStatisticsToItsOwnAuthorityService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.registeringThePaymentOfStatisticsToItsOwnAuthorityForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
