
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EnvelopesOpennigCommetyData } from 'app/shared/models/envelopes-opennig-commety-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EnvelopesOpennigCommetyDataService } from '../shared/envelopes-opennig-commety-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-envelopes-opennig-commety-data-view',
  templateUrl: './envelopes-opennig-commety-data-view.component.html',
  styleUrls: ['./envelopes-opennig-commety-data-view.component.scss'],
  providers: []
})

export class EnvelopesOpennigCommetyDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnvelopesOpennigCommetyData: EnvelopesOpennigCommetyData;
  envelopesOpennigCommetyDataForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnvelopesOpennigCommetyDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnvelopesOpennigCommetyDataViewComponent>,
    public envelopesOpennigCommetyDataService: EnvelopesOpennigCommetyDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnvelopesOpennigCommetyData = this.selectedEnvelopesOpennigCommetyDataDialog.data || this.selectedEnvelopesOpennigCommetyData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.envelopesOpennigCommetyDataForm = this.formBuilder.group({
      
  bidNumber : [this.selectedEnvelopesOpennigCommetyData.bidNumber],
  committeeDate : [this.selectedEnvelopesOpennigCommetyData.committeeDate],
  committeeHeadquarters : [this.selectedEnvelopesOpennigCommetyData.committeeHeadquarters],
  offeringApprovalDate : [this.selectedEnvelopesOpennigCommetyData.offeringApprovalDate],
  openingFinancialEnvelopesDate : [this.selectedEnvelopesOpennigCommetyData.openingFinancialEnvelopesDate],
  approvalFormationDate : [this.selectedEnvelopesOpennigCommetyData.approvalFormationDate],
  tenderPosition : [this.selectedEnvelopesOpennigCommetyData.tenderPosition],
  offeringType : [this.selectedEnvelopesOpennigCommetyData.offeringType]
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
    return this.envelopesOpennigCommetyDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.envelopesOpennigCommetyDataForm.controls)) {
      this.envelopesOpennigCommetyDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

