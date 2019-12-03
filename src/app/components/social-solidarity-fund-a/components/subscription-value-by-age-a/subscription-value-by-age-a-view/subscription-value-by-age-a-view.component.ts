
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriptionValueByAgeA } from 'app/shared/models/subscription-value-by-age-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionValueByAgeAService } from '../shared/subscription-value-by-age-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-value-by-age-a-view',
  templateUrl: './subscription-value-by-age-a-view.component.html',
  styleUrls: ['./subscription-value-by-age-a-view.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeAViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionValueByAgeA: SubscriptionValueByAgeA;
  subscriptionValueByAgeAForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionValueByAgeADialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeAViewComponent>,
    public subscriptionValueByAgeAService: SubscriptionValueByAgeAService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeA = this.selectedSubscriptionValueByAgeADialog.data || this.selectedSubscriptionValueByAgeA;

    

    this.subscriptionValueByAgeAForm = this.formBuilder.group({
      
  age : [this.selectedSubscriptionValueByAgeA.age],
  amount : [this.selectedSubscriptionValueByAgeA.amount]
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
    return this.subscriptionValueByAgeAForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriptionValueByAgeAForm.controls)) {
      this.subscriptionValueByAgeAForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

