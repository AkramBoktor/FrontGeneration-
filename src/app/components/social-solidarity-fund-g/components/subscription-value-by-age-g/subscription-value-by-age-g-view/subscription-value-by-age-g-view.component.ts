
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriptionValueByAgeG } from 'app/shared/models/subscription-value-by-age-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionValueByAgeGService } from '../shared/subscription-value-by-age-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-value-by-age-g-view',
  templateUrl: './subscription-value-by-age-g-view.component.html',
  styleUrls: ['./subscription-value-by-age-g-view.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeGViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionValueByAgeG: SubscriptionValueByAgeG;
  subscriptionValueByAgeGForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionValueByAgeGDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeGViewComponent>,
    public subscriptionValueByAgeGService: SubscriptionValueByAgeGService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeG = this.selectedSubscriptionValueByAgeGDialog.data || this.selectedSubscriptionValueByAgeG;

    

    this.subscriptionValueByAgeGForm = this.formBuilder.group({
      
  age : [this.selectedSubscriptionValueByAgeG.age],
  amount : [this.selectedSubscriptionValueByAgeG.amount]
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
    return this.subscriptionValueByAgeGForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriptionValueByAgeGForm.controls)) {
      this.subscriptionValueByAgeGForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

