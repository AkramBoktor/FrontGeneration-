
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReleasingCustodyByTheAuthority } from 'app/shared/models/releasing-custody-by-the-authority';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ReleasingCustodyByTheAuthorityService } from '../shared/releasing-custody-by-the-authority.service';

@Component({
  selector: 'app-releasing-custody-by-the-authority-view',
  templateUrl: './releasing-custody-by-the-authority-view.component.html',
  styleUrls: ['./releasing-custody-by-the-authority-view.component.scss'],
  providers: []
})

export class ReleasingCustodyByTheAuthorityViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReleasingCustodyByTheAuthority: ReleasingCustodyByTheAuthority;
  releasingCustodyByTheAuthorityForm: FormGroup;

  private powerTypesService: LookupService;
private powerCodesService: LookupService;
private itemStatusesService: LookupService;

  
authorityTypeSelectOptions: MaterialSelectOptions;
authorityCodeSelectOptions: MaterialSelectOptions;
itemConditionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReleasingCustodyByTheAuthorityDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReleasingCustodyByTheAuthorityViewComponent>,
    public releasingCustodyByTheAuthorityService: ReleasingCustodyByTheAuthorityService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReleasingCustodyByTheAuthority = this.selectedReleasingCustodyByTheAuthorityDialog.data || this.selectedReleasingCustodyByTheAuthority;

    
	this.authorityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.powerTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع السلطة  ',
	});

	this.authorityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.powerCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السلطة',
	});

	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.releasingCustodyByTheAuthorityForm = this.formBuilder.group({
      
  employeeCode : [this.selectedReleasingCustodyByTheAuthority.employeeCode],
  itemNo : [this.selectedReleasingCustodyByTheAuthority.itemNo],
  lastPrice : [this.selectedReleasingCustodyByTheAuthority.lastPrice],
  storeNumber : [this.selectedReleasingCustodyByTheAuthority.storeNumber],
  exchangeAuthorizationNumber : [this.selectedReleasingCustodyByTheAuthority.exchangeAuthorizationNumber],
  exchangeDate : [this.selectedReleasingCustodyByTheAuthority.exchangeDate],
  quantity : [this.selectedReleasingCustodyByTheAuthority.quantity],
  projectionDate : [this.selectedReleasingCustodyByTheAuthority.projectionDate],
  quantityRaised : [this.selectedReleasingCustodyByTheAuthority.quantityRaised],
  authorityType : [this.selectedReleasingCustodyByTheAuthority.authorityType],
  authorityCode : [this.selectedReleasingCustodyByTheAuthority.authorityCode],
  itemCondition : [this.selectedReleasingCustodyByTheAuthority.itemCondition]
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
    return this.releasingCustodyByTheAuthorityForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.releasingCustodyByTheAuthorityForm.controls)) {
      this.releasingCustodyByTheAuthorityForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.powerTypesService = new LookupService('powertypes', this.http);
this.powerCodesService = new LookupService('powercodes', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

