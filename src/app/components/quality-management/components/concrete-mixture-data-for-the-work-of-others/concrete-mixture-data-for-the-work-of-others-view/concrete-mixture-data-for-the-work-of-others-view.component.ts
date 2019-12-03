
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ConcreteMixtureDataForTheWorkOfOthers } from 'app/shared/models/concrete-mixture-data-for-the-work-of-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ConcreteMixtureDataForTheWorkOfOthersService } from '../shared/concrete-mixture-data-for-the-work-of-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-concrete-mixture-data-for-the-work-of-others-view',
  templateUrl: './concrete-mixture-data-for-the-work-of-others-view.component.html',
  styleUrls: ['./concrete-mixture-data-for-the-work-of-others-view.component.scss'],
  providers: []
})

export class ConcreteMixtureDataForTheWorkOfOthersViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedConcreteMixtureDataForTheWorkOfOthers: ConcreteMixtureDataForTheWorkOfOthers;
  concreteMixtureDataForTheWorkOfOthersForm: FormGroup;

  private cementUsedTypesService: LookupService;
private mixtureTypesService: LookupService;
private sandGradientAreaesService: LookupService;

  
cementUsedSelectOptions: MaterialSelectOptions;
mixtureTypeSelectOptions: MaterialSelectOptions;
sandGradientAreaSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedConcreteMixtureDataForTheWorkOfOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<ConcreteMixtureDataForTheWorkOfOthersViewComponent>,
    public concreteMixtureDataForTheWorkOfOthersService: ConcreteMixtureDataForTheWorkOfOthersService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConcreteMixtureDataForTheWorkOfOthers = this.selectedConcreteMixtureDataForTheWorkOfOthersDialog.data || this.selectedConcreteMixtureDataForTheWorkOfOthers;

    
	this.cementUsedSelectOptions = new MaterialSelectOptions({
	 data: this.cementUsedTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاسمنت المستخدم',
	});

	this.mixtureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.mixtureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخلطة',
	});

	this.sandGradientAreaSelectOptions = new MaterialSelectOptions({
	 data: this.sandGradientAreaesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رمل تدرج منطقه',
	});


    this.concreteMixtureDataForTheWorkOfOthersForm = this.formBuilder.group({
      
  laboratoryLanding : [this.selectedConcreteMixtureDataForTheWorkOfOthers.laboratoryLanding],
  aggregatesSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.aggregatesSpecificWeight],
  dolomiteSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteSpecificWeight],
  stonesSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesSpecificWeight],
  sandSpecificWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandSpecificWeight],
  dolomiteVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteVolume],
  dolomiteWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteWeight],
  sandWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandWeightVolume],
  stonesVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesVolume],
  sandVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandVolume],
  sandWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandWeight],
  waterVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.waterVolume],
  waterWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.waterWeight],
  cementBulk : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementBulk],
  cementWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementWeight],
  orderNumber : [this.selectedConcreteMixtureDataForTheWorkOfOthers.orderNumber],
  stonesWeight : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesWeight],
  dolomiteWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteWeightVolume],
  stonesWeightVolume : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesWeightVolume],
  stonesCrush : [this.selectedConcreteMixtureDataForTheWorkOfOthers.stonesCrush],
  dolomiteStones : [this.selectedConcreteMixtureDataForTheWorkOfOthers.dolomiteStones],
  cementUsed : [this.selectedConcreteMixtureDataForTheWorkOfOthers.cementUsed],
  mixtureType : [this.selectedConcreteMixtureDataForTheWorkOfOthers.mixtureType],
  sandGradientArea : [this.selectedConcreteMixtureDataForTheWorkOfOthers.sandGradientArea]
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
    return this.concreteMixtureDataForTheWorkOfOthersForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.concreteMixtureDataForTheWorkOfOthersForm.controls)) {
      this.concreteMixtureDataForTheWorkOfOthersForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.cementUsedTypesService = new LookupService('cementusedtypes', this.http);
this.mixtureTypesService = new LookupService('mixturetypes', this.http);
this.sandGradientAreaesService = new LookupService('sandgradientareaes', this.http);
  }
}

