
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LandAdoption } from 'app/shared/models/land-adoption';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LandAdoptionService } from '../shared/land-adoption.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-land-adoption-view',
  templateUrl: './land-adoption-view.component.html',
  styleUrls: ['./land-adoption-view.component.scss'],
  providers: []
})

export class LandAdoptionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLandAdoption: LandAdoption;
  landAdoptionForm: FormGroup;

  private educationalLevelsService: LookupService;
private yesOrNosService: LookupService;
private rejectionReasonCodesService: LookupService;

  
proposedPhaseSelectOptions: MaterialSelectOptions;
landValiditySelectOptions: MaterialSelectOptions;
rejectionReasonCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLandAdoptionDialog: any,
    @Optional() public dialogRef: MatDialogRef<LandAdoptionViewComponent>,
    public landAdoptionService: LandAdoptionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  landCode : [this.selectedLandAdoption.landCode],
  modelCode : [this.selectedLandAdoption.modelCode],
  accreditationDate : [this.selectedLandAdoption.accreditationDate],
  notes : [this.selectedLandAdoption.notes],
  proposedPhase : [this.selectedLandAdoption.proposedPhase],
  landValidity : [this.selectedLandAdoption.landValidity],
  rejectionReasonCode : [this.selectedLandAdoption.rejectionReasonCode]
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
    return this.landAdoptionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.landAdoptionForm.controls)) {
      this.landAdoptionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.rejectionReasonCodesService = new LookupService('rejectionreasoncodes', this.http);
  }
}

