
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscriptionValueByAgeA } from 'app/shared/models/subscription-value-by-age-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscriptionValueByAgeAService } from '../shared/subscription-value-by-age-a.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-value-by-age-a-edit',
  templateUrl: './subscription-value-by-age-a-edit.component.html',
  styleUrls: ['./subscription-value-by-age-a-edit.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeAEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionValueByAgeA: SubscriptionValueByAgeA;
  subscriptionValueByAgeAForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionValueByAgeADialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeAEditComponent>,
    public subscriptionValueByAgeAService: SubscriptionValueByAgeAService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeA = new SubscriptionValueByAgeA();
    this.selectedSubscriptionValueByAgeA = this.selectedSubscriptionValueByAgeADialog.data || this.selectedSubscriptionValueByAgeA;

    

    this.subscriptionValueByAgeAForm = this.formBuilder.group({
      
  id : [this.selectedSubscriptionValueByAgeA.id],
  age : [this.selectedSubscriptionValueByAgeA.age, [ Validators.required ]],
  amount : [this.selectedSubscriptionValueByAgeA.amount, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subscriptionValueByAgeAService.update(this.subscriptionValueByAgeAForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscriptionValueByAgeAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscriptionValueByAgeAForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
