
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GrantInformation } from 'app/shared/models/grant-information';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GrantInformationService } from '../shared/grant-information.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-grant-information-view',
  templateUrl: './grant-information-view.component.html',
  styleUrls: ['./grant-information-view.component.scss'],
  providers: []
})

export class GrantInformationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGrantInformation: GrantInformation;
  grantInformationForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGrantInformationDialog: any,
    @Optional() public dialogRef: MatDialogRef<GrantInformationViewComponent>,
    public grantInformationService: GrantInformationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrantInformation = this.selectedGrantInformationDialog.data || this.selectedGrantInformation;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح ',
	});


    this.grantInformationForm = this.formBuilder.group({
      
  grantCode : [this.selectedGrantInformation.grantCode],
  grantName : [this.selectedGrantInformation.grantName],
  entityCode : [this.selectedGrantInformation.entityCode],
  schoolNumber : [this.selectedGrantInformation.schoolNumber],
  contributionRatio : [this.selectedGrantInformation.contributionRatio],
  grantStartdate : [this.selectedGrantInformation.grantStartdate],
  grantEndDate : [this.selectedGrantInformation.grantEndDate],
  totalAmount : [this.selectedGrantInformation.totalAmount],
  offeringType : [this.selectedGrantInformation.offeringType]
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
    return this.grantInformationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.grantInformationForm.controls)) {
      this.grantInformationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

