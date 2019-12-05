
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding } from 'app/shared/models/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService } from '../shared/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view',
  templateUrl: './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view.component.html',
  styleUrls: ['./elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view.component.scss'],
  providers: []
})

export class ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding;
  elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingForm: FormGroup;

  private itemCodesService: LookupService;
private workTypesService: LookupService;
private constructionTypesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
elementSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent>,
    public elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding = this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingDialog.data || this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.employmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.elementSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العنصر',
	});


    this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.buildingCode],
  sample : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.sample],
  yearPlan : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.yearPlan],
  extensionCode : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.extensionCode],
  buildingName : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.buildingName],
  itemCode : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.itemCode],
  employmentType : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.employmentType],
  constructionType : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.constructionType],
  element : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.element]
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
    return this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingForm.controls)) {
      this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

