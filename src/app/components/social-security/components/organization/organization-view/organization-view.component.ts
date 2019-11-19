
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Organization } from 'app/shared/models/organization';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { OrganizationService } from '../shared/organization.service';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss'],
  providers: []
})

export class OrganizationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedOrganization: Organization;
  organizationForm: FormGroup;

  private sectorCodesService: LookupService;

  
sectorSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedOrganizationDialog: any,
    @Optional() public dialogRef: MatDialogRef<OrganizationViewComponent>,
    public organizationService: OrganizationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedOrganization = this.selectedOrganizationDialog.data || this.selectedOrganization;

    
	this.sectorSelectOptions = new MaterialSelectOptions({
	 data: this.sectorCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القطاع',
	});


    this.organizationForm = this.formBuilder.group({
      
  organizationNumber : [this.selectedOrganization.organizationNumber],
  organizationName : [this.selectedOrganization.organizationName],
  sector : [this.selectedOrganization.sector]
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
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.organizationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.organizationForm.controls)) {
      this.organizationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectorCodesService = new LookupService('sectorcodes', this.http);
  }
}

