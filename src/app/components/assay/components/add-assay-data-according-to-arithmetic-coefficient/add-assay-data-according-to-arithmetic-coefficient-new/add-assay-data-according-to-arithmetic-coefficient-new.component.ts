
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddAssayDataAccordingToArithmeticCoefficient } from 'app/shared/models/add-assay-data-according-to-arithmetic-coefficient';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddAssayDataAccordingToArithmeticCoefficientService } from '../shared/add-assay-data-according-to-arithmetic-coefficient.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-assay-data-according-to-arithmetic-coefficient-new',
  templateUrl: './add-assay-data-according-to-arithmetic-coefficient-new.component.html',
  styleUrls: ['./add-assay-data-according-to-arithmetic-coefficient-new.component.scss'],
  providers: [
    ]
})

export class AddAssayDataAccordingToArithmeticCoefficientNewComponent extends AppBaseComponent implements OnInit {
  addAssayDataAccordingToArithmeticCoefficientForm: FormGroup;
  @Input() selectedAddAssayDataAccordingToArithmeticCoefficient: AddAssayDataAccordingToArithmeticCoefficient;
  errorMessages: FormControlError[] = [
        
  ];

  private modelCodesService: LookupService;
private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
modelCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('modelCode', { static: true }) ModelCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AddAssayDataAccordingToArithmeticCoefficientNewComponent>,
    public addAssayDataAccordingToArithmeticCoefficientService: AddAssayDataAccordingToArithmeticCoefficientService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddAssayDataAccordingToArithmeticCoefficient = new AddAssayDataAccordingToArithmeticCoefficient();

    
	this.modelCodeSelectOptions = new MaterialSelectOptions({
	 data: this.modelCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود النموذج',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.addAssayDataAccordingToArithmeticCoefficientForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.extensionCode, [ Validators.required ]],
  planYear : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.planYear, [ Validators.required ]],
  priceYear : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.priceYear, [ Validators.required ]],
  calculationCoefficient : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.calculationCoefficient, [ Validators.required ]],
  itemName : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.itemName, [ ]],
  quntity : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.quntity, [ Validators.required ]],
  price : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.price, [ Validators.required ]],
  modelCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.modelCode, [ Validators.required ]],
  constructionType : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.constructionType, [ Validators.required ]],
  workType : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.workType, [ Validators.required ]],
  itemCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.addAssayDataAccordingToArithmeticCoefficientService.create(this.addAssayDataAccordingToArithmeticCoefficientForm.value)
        .pipe(switchMap(x => {
			return this.addAssayDataAccordingToArithmeticCoefficientService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.addAssayDataAccordingToArithmeticCoefficientForm.get(name);
    }

  initializeLookupServices() {
    this.modelCodesService = new LookupService('modelcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
