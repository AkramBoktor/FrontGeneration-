
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriptionValueByAgeB } from 'app/shared/models/subscription-value-by-age-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionValueByAgeBService } from '../shared/subscription-value-by-age-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-value-by-age-b-new',
  templateUrl: './subscription-value-by-age-b-new.component.html',
  styleUrls: ['./subscription-value-by-age-b-new.component.scss'],
  providers: [
    ]
})

export class SubscriptionValueByAgeBNewComponent extends AppBaseComponent implements OnInit {
  subscriptionValueByAgeBForm: FormGroup;
  @Input() selectedSubscriptionValueByAgeB: SubscriptionValueByAgeB;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeBNewComponent>,
    public subscriptionValueByAgeBService: SubscriptionValueByAgeBService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeB = new SubscriptionValueByAgeB();

    

    this.subscriptionValueByAgeBForm = this.formBuilder.group({
     
  id : [0],
  amount : [this.selectedSubscriptionValueByAgeB.amount, [ Validators.required ]],
  age : [this.selectedSubscriptionValueByAgeB.age, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriptionValueByAgeBService.create(this.subscriptionValueByAgeBForm.value)
        .pipe(switchMap(x => {
			return this.subscriptionValueByAgeBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriptionValueByAgeBForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
