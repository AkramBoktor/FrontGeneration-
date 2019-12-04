
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { WeightsFactor } from 'app/shared/models/weights-factor';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { WeightsFactorService } from '../shared/weights-factor.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-weights-factor-view',
  templateUrl: './weights-factor-view.component.html',
  styleUrls: ['./weights-factor-view.component.scss'],
  providers: []
})

export class WeightsFactorViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedWeightsFactor: WeightsFactor;
  weightsFactorForm: FormGroup;

  private offeringTypesService: LookupService;
private itemCodesService: LookupService;
private elementsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedWeightsFactorDialog: any,
    @Optional() public dialogRef: MatDialogRef<WeightsFactorViewComponent>,
    public weightsFactorService: WeightsFactorService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedWeightsFactor = this.selectedWeightsFactorDialog.data || this.selectedWeightsFactor;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.weightsFactorForm = this.formBuilder.group({
      
  buildingCode : [this.selectedWeightsFactor.buildingCode],
  tenderNumber : [this.selectedWeightsFactor.tenderNumber],
  tenderName : [this.selectedWeightsFactor.tenderName],
  contractorCode : [this.selectedWeightsFactor.contractorCode],
  supplementSeries : [this.selectedWeightsFactor.supplementSeries],
  dateOfOpeningTechnicalAttribution : [this.selectedWeightsFactor.dateOfOpeningTechnicalAttribution],
  assayPriceCategory : [this.selectedWeightsFactor.assayPriceCategory],
  ratioOfWeightsCoefficient : [this.selectedWeightsFactor.ratioOfWeightsCoefficient],
  offeringType : [this.selectedWeightsFactor.offeringType],
  itemCode : [this.selectedWeightsFactor.itemCode],
  elementCode : [this.selectedWeightsFactor.elementCode]
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
    return this.weightsFactorForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.weightsFactorForm.controls)) {
      this.weightsFactorForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

