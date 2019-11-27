
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AddAssayDataAccordingToArithmeticCoefficient } from 'app/shared/models/add-assay-data-according-to-arithmetic-coefficient';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AddAssayDataAccordingToArithmeticCoefficientService } from '../shared/add-assay-data-according-to-arithmetic-coefficient.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-assay-data-according-to-arithmetic-coefficient-edit',
  templateUrl: './add-assay-data-according-to-arithmetic-coefficient-edit.component.html',
  styleUrls: ['./add-assay-data-according-to-arithmetic-coefficient-edit.component.scss'],
  providers: []
})

export class AddAssayDataAccordingToArithmeticCoefficientEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddAssayDataAccordingToArithmeticCoefficient: AddAssayDataAccordingToArithmeticCoefficient;
  addAssayDataAccordingToArithmeticCoefficientForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddAssayDataAccordingToArithmeticCoefficientDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddAssayDataAccordingToArithmeticCoefficientEditComponent>,
    public addAssayDataAccordingToArithmeticCoefficientService: AddAssayDataAccordingToArithmeticCoefficientService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddAssayDataAccordingToArithmeticCoefficient = new AddAssayDataAccordingToArithmeticCoefficient();
    this.selectedAddAssayDataAccordingToArithmeticCoefficient = this.selectedAddAssayDataAccordingToArithmeticCoefficientDialog.data || this.selectedAddAssayDataAccordingToArithmeticCoefficient;

    
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
      
  id : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.id],
  buildingCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.extensionCode, [ Validators.required ]],
  planYear : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.planYear, [ Validators.required ]],
  priceYear : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.priceYear, [ Validators.required ]],
  calculationCoefficient : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.calculationCoefficient, [ Validators.required ]],
  itemName : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.itemName, [ Validators.required ]],
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
    this.addAssayDataAccordingToArithmeticCoefficientService.update(this.addAssayDataAccordingToArithmeticCoefficientForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.addAssayDataAccordingToArithmeticCoefficientService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.addAssayDataAccordingToArithmeticCoefficientForm.get(name);
  }

  initializeLookupServices() {
    this.modelCodesService = new LookupService('modelcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
