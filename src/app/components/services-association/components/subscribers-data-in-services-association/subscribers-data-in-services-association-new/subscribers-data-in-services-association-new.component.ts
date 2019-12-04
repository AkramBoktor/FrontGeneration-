
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscribersDataInServicesAssociation } from 'app/shared/models/subscribers-data-in-services-association';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscribersDataInServicesAssociationService } from '../shared/subscribers-data-in-services-association.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscribers-data-in-services-association-new',
  templateUrl: './subscribers-data-in-services-association-new.component.html',
  styleUrls: ['./subscribers-data-in-services-association-new.component.scss'],
  providers: [
    ]
})

export class SubscribersDataInServicesAssociationNewComponent extends AppBaseComponent implements OnInit {
  subscribersDataInServicesAssociationForm: FormGroup;
  @Input() selectedSubscribersDataInServicesAssociation: SubscribersDataInServicesAssociation;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubscribersDataInServicesAssociationNewComponent>,
    public subscribersDataInServicesAssociationService: SubscribersDataInServicesAssociationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscribersDataInServicesAssociation = new SubscribersDataInServicesAssociation();

    

    this.subscribersDataInServicesAssociationForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedSubscribersDataInServicesAssociation.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedSubscribersDataInServicesAssociation.employeeName, [ Validators.required ]],
  membershipNo : [this.selectedSubscribersDataInServicesAssociation.membershipNo, [ Validators.required ]],
  subscriptionDate : [this.selectedSubscribersDataInServicesAssociation.subscriptionDate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscribersDataInServicesAssociationService.create(this.subscribersDataInServicesAssociationForm.value)
        .pipe(switchMap(x => {
			return this.subscribersDataInServicesAssociationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscribersDataInServicesAssociationForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
