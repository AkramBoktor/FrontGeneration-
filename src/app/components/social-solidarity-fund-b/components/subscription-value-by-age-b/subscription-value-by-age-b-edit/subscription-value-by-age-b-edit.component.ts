
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscriptionValueByAgeB } from 'app/shared/models/subscription-value-by-age-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscriptionValueByAgeBService } from '../shared/subscription-value-by-age-b.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-value-by-age-b-edit',
  templateUrl: './subscription-value-by-age-b-edit.component.html',
  styleUrls: ['./subscription-value-by-age-b-edit.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeBEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionValueByAgeB: SubscriptionValueByAgeB;
  subscriptionValueByAgeBForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionValueByAgeBDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeBEditComponent>,
    public subscriptionValueByAgeBService: SubscriptionValueByAgeBService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeB = new SubscriptionValueByAgeB();
    this.selectedSubscriptionValueByAgeB = this.selectedSubscriptionValueByAgeBDialog.data || this.selectedSubscriptionValueByAgeB;

    

    this.subscriptionValueByAgeBForm = this.formBuilder.group({
      
  id : [this.selectedSubscriptionValueByAgeB.id],
  amount : [this.selectedSubscriptionValueByAgeB.amount, [ Validators.required ]],
  age : [this.selectedSubscriptionValueByAgeB.age, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subscriptionValueByAgeBService.update(this.subscriptionValueByAgeBForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscriptionValueByAgeBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscriptionValueByAgeBForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
