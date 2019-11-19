
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EnvelopesOpennigCommetyData } from 'app/shared/models/envelopes-opennig-commety-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EnvelopesOpennigCommetyDataService } from '../shared/envelopes-opennig-commety-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-envelopes-opennig-commety-data-edit',
  templateUrl: './envelopes-opennig-commety-data-edit.component.html',
  styleUrls: ['./envelopes-opennig-commety-data-edit.component.scss'],
  providers: []
})

export class EnvelopesOpennigCommetyDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnvelopesOpennigCommetyData: EnvelopesOpennigCommetyData;
  envelopesOpennigCommetyDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnvelopesOpennigCommetyDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnvelopesOpennigCommetyDataEditComponent>,
    public envelopesOpennigCommetyDataService: EnvelopesOpennigCommetyDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnvelopesOpennigCommetyData = new EnvelopesOpennigCommetyData();
    this.selectedEnvelopesOpennigCommetyData = this.selectedEnvelopesOpennigCommetyDataDialog.data || this.selectedEnvelopesOpennigCommetyData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.envelopesOpennigCommetyDataForm = this.formBuilder.group({
      
  id : [this.selectedEnvelopesOpennigCommetyData.id],
  bidNumber : [this.selectedEnvelopesOpennigCommetyData.bidNumber, [ Validators.required ]],
  committeeDate : [this.selectedEnvelopesOpennigCommetyData.committeeDate, [ Validators.required ]],
  committeeHeadquarters : [this.selectedEnvelopesOpennigCommetyData.committeeHeadquarters, [ Validators.required ]],
  offeringApprovalDate : [this.selectedEnvelopesOpennigCommetyData.offeringApprovalDate, [ Validators.required ]],
  openingFinancialEnvelopesDate : [this.selectedEnvelopesOpennigCommetyData.openingFinancialEnvelopesDate, [ Validators.required ]],
  approvalFormationDate : [this.selectedEnvelopesOpennigCommetyData.approvalFormationDate, [ Validators.required ]],
  tenderPosition : [this.selectedEnvelopesOpennigCommetyData.tenderPosition, [ Validators.required ]],
  offeringType : [this.selectedEnvelopesOpennigCommetyData.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.envelopesOpennigCommetyDataService.update(this.envelopesOpennigCommetyDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.envelopesOpennigCommetyDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.envelopesOpennigCommetyDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
