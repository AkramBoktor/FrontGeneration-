
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LandAdoption } from 'app/shared/models/land-adoption';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LandAdoptionService } from '../shared/land-adoption.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-land-adoption-edit',
  templateUrl: './land-adoption-edit.component.html',
  styleUrls: ['./land-adoption-edit.component.scss'],
  providers: []
})

export class LandAdoptionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLandAdoption: LandAdoption;
  landAdoptionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private educationalLevelsService: LookupService;
private yesOrNosService: LookupService;
private rejectionReasonCodesService: LookupService;

  
proposedPhaseSelectOptions: MaterialSelectOptions;
landValiditySelectOptions: MaterialSelectOptions;
rejectionReasonCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('proposedPhase', { static: true }) ProposedPhaseSelectComponent: MaterialSelectComponent;
	@ViewChild('landValidity', { static: true }) LandValiditySelectComponent: MaterialSelectComponent;
	@ViewChild('rejectionReasonCode', { static: true }) RejectionReasonCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLandAdoptionDialog: any,
    @Optional() public dialogRef: MatDialogRef<LandAdoptionEditComponent>,
    public landAdoptionService: LandAdoptionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLandAdoption = new LandAdoption();
    this.selectedLandAdoption = this.selectedLandAdoptionDialog.data || this.selectedLandAdoption;

    
	this.proposedPhaseSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحله المقترحه',
	});

	this.landValiditySelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صلاحية الأرض',
	});

	this.rejectionReasonCodeSelectOptions = new MaterialSelectOptions({
	 data: this.rejectionReasonCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود سبب الرفض',
	});


    this.landAdoptionForm = this.formBuilder.group({
      
  id : [this.selectedLandAdoption.id],
  landCode : [this.selectedLandAdoption.landCode, [ Validators.required ]],
  modelCode : [this.selectedLandAdoption.modelCode, [ Validators.required ]],
  accreditationDate : [this.selectedLandAdoption.accreditationDate, [ Validators.required ]],
  notes : [this.selectedLandAdoption.notes, [ Validators.required ]],
  proposedPhase : [this.selectedLandAdoption.proposedPhase, [ Validators.required ]],
  landValidity : [this.selectedLandAdoption.landValidity, [ Validators.required ]],
  rejectionReasonCode : [this.selectedLandAdoption.rejectionReasonCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.landAdoptionService.update(this.landAdoptionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.landAdoptionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.landAdoptionForm.get(name);
  }

  initializeLookupServices() {
    this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.rejectionReasonCodesService = new LookupService('rejectionreasoncodes', this.http);
  }
}
