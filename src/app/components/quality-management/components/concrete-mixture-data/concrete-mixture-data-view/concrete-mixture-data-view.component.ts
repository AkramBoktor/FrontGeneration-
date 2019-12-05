
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ConcreteMixtureData } from 'app/shared/models/concrete-mixture-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ConcreteMixtureDataService } from '../shared/concrete-mixture-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-concrete-mixture-data-view',
  templateUrl: './concrete-mixture-data-view.component.html',
  styleUrls: ['./concrete-mixture-data-view.component.scss'],
  providers: []
})

export class ConcreteMixtureDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedConcreteMixtureData: ConcreteMixtureData;
  concreteMixtureDataForm: FormGroup;

  private mixtureTypesService: LookupService;
private cementUsedTypesService: LookupService;
private sandGradientAreaesService: LookupService;

  
mixtureTypeSelectOptions: MaterialSelectOptions;
cementUsedSelectOptions: MaterialSelectOptions;
sandGradientAreaSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedConcreteMixtureDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ConcreteMixtureDataViewComponent>,
    public concreteMixtureDataService: ConcreteMixtureDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConcreteMixtureData = this.selectedConcreteMixtureDataDialog.data || this.selectedConcreteMixtureData;

    
	this.mixtureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.mixtureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخلطة',
	});

	this.cementUsedSelectOptions = new MaterialSelectOptions({
	 data: this.cementUsedTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاسمنت المستخدم',
	});

	this.sandGradientAreaSelectOptions = new MaterialSelectOptions({
	 data: this.sandGradientAreaesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رمل تدرج منطقه',
	});


    this.concreteMixtureDataForm = this.formBuilder.group({
      
  orderNumber : [this.selectedConcreteMixtureData.orderNumber],
  cementWeight : [this.selectedConcreteMixtureData.cementWeight],
  cementBulk : [this.selectedConcreteMixtureData.cementBulk],
  waterWeight : [this.selectedConcreteMixtureData.waterWeight],
  waterVolume : [this.selectedConcreteMixtureData.waterVolume],
  sandWeight : [this.selectedConcreteMixtureData.sandWeight],
  sandVolume : [this.selectedConcreteMixtureData.sandVolume],
  stonesWeight : [this.selectedConcreteMixtureData.stonesWeight],
  stonesVolume : [this.selectedConcreteMixtureData.stonesVolume],
  dolomiteWeight : [this.selectedConcreteMixtureData.dolomiteWeight],
  dolomiteVolume : [this.selectedConcreteMixtureData.dolomiteVolume],
  sandSpecificWeight : [this.selectedConcreteMixtureData.sandSpecificWeight],
  stonesSpecificWeight : [this.selectedConcreteMixtureData.stonesSpecificWeight],
  dolomiteSpecificWeight : [this.selectedConcreteMixtureData.dolomiteSpecificWeight],
  aggregatesSpecificWeight : [this.selectedConcreteMixtureData.aggregatesSpecificWeight],
  laboratoryLanding : [this.selectedConcreteMixtureData.laboratoryLanding],
  sandWeightVolume : [this.selectedConcreteMixtureData.sandWeightVolume],
  dolomiteWeightVolume : [this.selectedConcreteMixtureData.dolomiteWeightVolume],
  stonesWeightVolume : [this.selectedConcreteMixtureData.stonesWeightVolume],
  stonesCrush : [this.selectedConcreteMixtureData.stonesCrush],
  dolomiteStones : [this.selectedConcreteMixtureData.dolomiteStones],
  mixtureType : [this.selectedConcreteMixtureData.mixtureType],
  cementUsed : [this.selectedConcreteMixtureData.cementUsed],
  sandGradientArea : [this.selectedConcreteMixtureData.sandGradientArea]
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
    return this.concreteMixtureDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.concreteMixtureDataForm.controls)) {
      this.concreteMixtureDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.mixtureTypesService = new LookupService('mixturetypes', this.http);
this.cementUsedTypesService = new LookupService('cementusedtypes', this.http);
this.sandGradientAreaesService = new LookupService('sandgradientareaes', this.http);
  }
}

