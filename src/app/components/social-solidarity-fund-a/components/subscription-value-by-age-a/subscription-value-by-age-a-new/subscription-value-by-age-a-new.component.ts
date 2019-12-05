
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriptionValueByAgeA } from 'app/shared/models/subscription-value-by-age-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionValueByAgeAService } from '../shared/subscription-value-by-age-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-value-by-age-a-new',
  templateUrl: './subscription-value-by-age-a-new.component.html',
  styleUrls: ['./subscription-value-by-age-a-new.component.scss'],
  providers: [
    ]
})

export class SubscriptionValueByAgeANewComponent extends AppBaseComponent implements OnInit {
  subscriptionValueByAgeAForm: FormGroup;
  @Input() selectedSubscriptionValueByAgeA: SubscriptionValueByAgeA;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeANewComponent>,
    public subscriptionValueByAgeAService: SubscriptionValueByAgeAService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeA = new SubscriptionValueByAgeA();

    

    this.subscriptionValueByAgeAForm = this.formBuilder.group({
     
  id : [0],
  age : [this.selectedSubscriptionValueByAgeA.age, [ Validators.required ]],
  amount : [this.selectedSubscriptionValueByAgeA.amount, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriptionValueByAgeAService.create(this.subscriptionValueByAgeAForm.value)
        .pipe(switchMap(x => {
			return this.subscriptionValueByAgeAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriptionValueByAgeAForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
