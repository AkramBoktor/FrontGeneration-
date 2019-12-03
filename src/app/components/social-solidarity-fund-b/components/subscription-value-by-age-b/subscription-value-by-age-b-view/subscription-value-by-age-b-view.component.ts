
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriptionValueByAgeB } from 'app/shared/models/subscription-value-by-age-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionValueByAgeBService } from '../shared/subscription-value-by-age-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-value-by-age-b-view',
  templateUrl: './subscription-value-by-age-b-view.component.html',
  styleUrls: ['./subscription-value-by-age-b-view.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeBViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionValueByAgeB: SubscriptionValueByAgeB;
  subscriptionValueByAgeBForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionValueByAgeBDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeBViewComponent>,
    public subscriptionValueByAgeBService: SubscriptionValueByAgeBService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeB = this.selectedSubscriptionValueByAgeBDialog.data || this.selectedSubscriptionValueByAgeB;

    

    this.subscriptionValueByAgeBForm = this.formBuilder.group({
      
  amount : [this.selectedSubscriptionValueByAgeB.amount],
  age : [this.selectedSubscriptionValueByAgeB.age]
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
    return this.subscriptionValueByAgeBForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriptionValueByAgeBForm.controls)) {
      this.subscriptionValueByAgeBForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

