
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding } from 'app/shared/models/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService } from '../shared/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new',
  templateUrl: './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new.component.html',
  styleUrls: ['./elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new.component.scss'],
  providers: [
    ]
})

export class ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent extends AppBaseComponent implements OnInit {
  elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingForm: FormGroup;
  @Input() selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding;
  errorMessages: FormControlError[] = [
        
  ];

  private itemCodesService: LookupService;
private workTypesService: LookupService;
private constructionTypesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
elementSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employmentType', { static: true }) EmploymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('element', { static: true }) ElementSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent>,
    public elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding = new ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding();

    
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
     
  id : [0],
  buildingCode : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.buildingCode, [ Validators.required ]],
  sample : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.sample, [ ]],
  yearPlan : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.yearPlan, [ ]],
  extensionCode : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.extensionCode, [ ]],
  buildingName : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.buildingName, [ ]],
  itemCode : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.itemCode, [ Validators.required ]],
  employmentType : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.employmentType, [ Validators.required ]],
  constructionType : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.constructionType, [ Validators.required ]],
  element : [this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding.element, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService.create(this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingForm.value)
        .pipe(switchMap(x => {
			return this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingForm.get(name);
    }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
 }
