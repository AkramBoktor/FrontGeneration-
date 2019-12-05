
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuilding } from 'app/shared/models/elements-of-assay-items-for-weights-factor-of-a-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingService } from '../shared/elements-of-assay-items-for-weights-factor-of-a-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-elements-of-assay-items-for-weights-factor-of-a-building-new',
  templateUrl: './elements-of-assay-items-for-weights-factor-of-a-building-new.component.html',
  styleUrls: ['./elements-of-assay-items-for-weights-factor-of-a-building-new.component.scss'],
  providers: [
    ]
})

export class ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent extends AppBaseComponent implements OnInit {
  elementsOfAssayItemsForWeightsFactorOfABuildingForm: FormGroup;
  @Input() selectedElementsOfAssayItemsForWeightsFactorOfABuilding: ElementsOfAssayItemsForWeightsFactorOfABuilding;
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
    @Optional() public dialogRef: MatDialogRef<ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent>,
    public elementsOfAssayItemsForWeightsFactorOfABuildingService: ElementsOfAssayItemsForWeightsFactorOfABuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding = new ElementsOfAssayItemsForWeightsFactorOfABuilding();

    
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
     
  id : [0],
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
    this.elementsOfAssayItemsForWeightsFactorOfABuildingService.create(this.elementsOfAssayItemsForWeightsFactorOfABuildingForm.value)
        .pipe(switchMap(x => {
			return this.elementsOfAssayItemsForWeightsFactorOfABuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
