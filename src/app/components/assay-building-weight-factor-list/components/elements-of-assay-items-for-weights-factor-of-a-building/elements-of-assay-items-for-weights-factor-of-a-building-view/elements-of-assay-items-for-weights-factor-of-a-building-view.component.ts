
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuilding } from 'app/shared/models/elements-of-assay-items-for-weights-factor-of-a-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingService } from '../shared/elements-of-assay-items-for-weights-factor-of-a-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-elements-of-assay-items-for-weights-factor-of-a-building-view',
  templateUrl: './elements-of-assay-items-for-weights-factor-of-a-building-view.component.html',
  styleUrls: ['./elements-of-assay-items-for-weights-factor-of-a-building-view.component.scss'],
  providers: []
})

export class ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElementsOfAssayItemsForWeightsFactorOfABuilding: ElementsOfAssayItemsForWeightsFactorOfABuilding;
  elementsOfAssayItemsForWeightsFactorOfABuildingForm: FormGroup;

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;
private elementsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
jobTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElementsOfAssayItemsForWeightsFactorOfABuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent>,
    public elementsOfAssayItemsForWeightsFactorOfABuildingService: ElementsOfAssayItemsForWeightsFactorOfABuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding = this.selectedElementsOfAssayItemsForWeightsFactorOfABuildingDialog.data || this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.jobTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
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


    this.elementsOfAssayItemsForWeightsFactorOfABuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.buildingCode],
  extensionCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.extensionCode],
  planYear : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.planYear],
  date : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.date],
  testCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.testCode],
  elementName : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.elementName],
  constructionType : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.constructionType],
  jobType : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.jobType],
  itemCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.itemCode],
  elementCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.elementCode]
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
    return this.elementsOfAssayItemsForWeightsFactorOfABuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.elementsOfAssayItemsForWeightsFactorOfABuildingForm.controls)) {
      this.elementsOfAssayItemsForWeightsFactorOfABuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

