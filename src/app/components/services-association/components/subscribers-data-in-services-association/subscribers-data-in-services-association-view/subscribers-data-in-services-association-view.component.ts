
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscribersDataInServicesAssociation } from 'app/shared/models/subscribers-data-in-services-association';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscribersDataInServicesAssociationService } from '../shared/subscribers-data-in-services-association.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscribers-data-in-services-association-view',
  templateUrl: './subscribers-data-in-services-association-view.component.html',
  styleUrls: ['./subscribers-data-in-services-association-view.component.scss'],
  providers: []
})

export class SubscribersDataInServicesAssociationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscribersDataInServicesAssociation: SubscribersDataInServicesAssociation;
  subscribersDataInServicesAssociationForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscribersDataInServicesAssociationDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscribersDataInServicesAssociationViewComponent>,
    public subscribersDataInServicesAssociationService: SubscribersDataInServicesAssociationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscribersDataInServicesAssociation = this.selectedSubscribersDataInServicesAssociationDialog.data || this.selectedSubscribersDataInServicesAssociation;

    

    this.subscribersDataInServicesAssociationForm = this.formBuilder.group({
      
  employeeCode : [this.selectedSubscribersDataInServicesAssociation.employeeCode],
  employeeName : [this.selectedSubscribersDataInServicesAssociation.employeeName],
  membershipNo : [this.selectedSubscribersDataInServicesAssociation.membershipNo],
  subscriptionDate : [this.selectedSubscribersDataInServicesAssociation.subscriptionDate]
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
    return this.subscribersDataInServicesAssociationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscribersDataInServicesAssociationForm.controls)) {
      this.subscribersDataInServicesAssociationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

