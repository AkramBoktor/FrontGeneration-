
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriptionValueByAgeG } from 'app/shared/models/subscription-value-by-age-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionValueByAgeGService } from '../shared/subscription-value-by-age-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-value-by-age-g-new',
  templateUrl: './subscription-value-by-age-g-new.component.html',
  styleUrls: ['./subscription-value-by-age-g-new.component.scss'],
  providers: [
    ]
})

export class SubscriptionValueByAgeGNewComponent extends AppBaseComponent implements OnInit {
  subscriptionValueByAgeGForm: FormGroup;
  @Input() selectedSubscriptionValueByAgeG: SubscriptionValueByAgeG;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubscriptionValueByAgeGNewComponent>,
    public subscriptionValueByAgeGService: SubscriptionValueByAgeGService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeG = new SubscriptionValueByAgeG();

    

    this.subscriptionValueByAgeGForm = this.formBuilder.group({
     
  id : [0],
  age : [this.selectedSubscriptionValueByAgeG.age, [ Validators.required ]],
  amount : [this.selectedSubscriptionValueByAgeG.amount, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriptionValueByAgeGService.create(this.subscriptionValueByAgeGForm.value)
        .pipe(switchMap(x => {
			return this.subscriptionValueByAgeGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriptionValueByAgeGForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
