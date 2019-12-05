
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ElementsOfAssayItemsForWeightsFactorOfABuilding } from 'app/shared/models/elements-of-assay-items-for-weights-factor-of-a-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ElementsOfAssayItemsForWeightsFactorOfABuildingService } from '../shared/elements-of-assay-items-for-weights-factor-of-a-building.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-elements-of-assay-items-for-weights-factor-of-a-building-edit',
  templateUrl: './elements-of-assay-items-for-weights-factor-of-a-building-edit.component.html',
  styleUrls: ['./elements-of-assay-items-for-weights-factor-of-a-building-edit.component.scss'],
  providers: []
})

export class ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElementsOfAssayItemsForWeightsFactorOfABuilding: ElementsOfAssayItemsForWeightsFactorOfABuilding;
  elementsOfAssayItemsForWeightsFactorOfABuildingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;
private elementsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
jobTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobType', { static: true }) JobTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElementsOfAssayItemsForWeightsFactorOfABuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent>,
    public elementsOfAssayItemsForWeightsFactorOfABuildingService: ElementsOfAssayItemsForWeightsFactorOfABuildingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding = new ElementsOfAssayItemsForWeightsFactorOfABuilding();
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
      
  id : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.id],
  buildingCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.extensionCode, [ ]],
  planYear : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.planYear, [ ]],
  date : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.date, [ Validators.required ]],
  testCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.testCode, [ Validators.required ]],
  elementName : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.elementName, [ ]],
  constructionType : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.constructionType, [ ]],
  jobType : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.jobType, [ Validators.required ]],
  itemCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.itemCode, [ Validators.required ]],
  elementCode : [this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.elementsOfAssayItemsForWeightsFactorOfABuildingService.update(this.elementsOfAssayItemsForWeightsFactorOfABuildingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.elementsOfAssayItemsForWeightsFactorOfABuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.elementsOfAssayItemsForWeightsFactorOfABuildingForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}
