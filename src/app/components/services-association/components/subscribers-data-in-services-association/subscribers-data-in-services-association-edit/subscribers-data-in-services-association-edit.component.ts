
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscribersDataInServicesAssociation } from 'app/shared/models/subscribers-data-in-services-association';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscribersDataInServicesAssociationService } from '../shared/subscribers-data-in-services-association.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscribers-data-in-services-association-edit',
  templateUrl: './subscribers-data-in-services-association-edit.component.html',
  styleUrls: ['./subscribers-data-in-services-association-edit.component.scss'],
  providers: []
})

export class SubscribersDataInServicesAssociationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscribersDataInServicesAssociation: SubscribersDataInServicesAssociation;
  subscribersDataInServicesAssociationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscribersDataInServicesAssociationDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscribersDataInServicesAssociationEditComponent>,
    public subscribersDataInServicesAssociationService: SubscribersDataInServicesAssociationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscribersDataInServicesAssociation = new SubscribersDataInServicesAssociation();
    this.selectedSubscribersDataInServicesAssociation = this.selectedSubscribersDataInServicesAssociationDialog.data || this.selectedSubscribersDataInServicesAssociation;

    

    this.subscribersDataInServicesAssociationForm = this.formBuilder.group({
      
  id : [this.selectedSubscribersDataInServicesAssociation.id],
  employeeCode : [this.selectedSubscribersDataInServicesAssociation.employeeCode, [ Validators.required ]],
  employeeName : [this.selectedSubscribersDataInServicesAssociation.employeeName, [ Validators.required ]],
  membershipNo : [this.selectedSubscribersDataInServicesAssociation.membershipNo, [ Validators.required ]],
  subscriptionDate : [this.selectedSubscribersDataInServicesAssociation.subscriptionDate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subscribersDataInServicesAssociationService.update(this.subscribersDataInServicesAssociationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscribersDataInServicesAssociationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscribersDataInServicesAssociationForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
