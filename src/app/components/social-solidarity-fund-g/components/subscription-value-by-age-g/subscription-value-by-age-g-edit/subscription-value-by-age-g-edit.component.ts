
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscriptionValueByAgeG } from 'app/shared/models/subscription-value-by-age-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscriptionValueByAgeGService } from '../shared/subscription-value-by-age-g.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-value-by-age-g-edit',
  templateUrl: './subscription-value-by-age-g-edit.component.html',
  styleUrls: ['./subscription-value-by-age-g-edit.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeGEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionValueByAgeG: SubscriptionValueByAgeG;
  subscriptionValueByAgeGForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionValueByAgeGDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeGEditComponent>,
    public subscriptionValueByAgeGService: SubscriptionValueByAgeGService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeG = new SubscriptionValueByAgeG();
    this.selectedSubscriptionValueByAgeG = this.selectedSubscriptionValueByAgeGDialog.data || this.selectedSubscriptionValueByAgeG;

    

    this.subscriptionValueByAgeGForm = this.formBuilder.group({
      
  id : [this.selectedSubscriptionValueByAgeG.id],
  age : [this.selectedSubscriptionValueByAgeG.age, [ Validators.required ]],
  amount : [this.selectedSubscriptionValueByAgeG.amount, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subscriptionValueByAgeGService.update(this.subscriptionValueByAgeGForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscriptionValueByAgeGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscriptionValueByAgeGForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
