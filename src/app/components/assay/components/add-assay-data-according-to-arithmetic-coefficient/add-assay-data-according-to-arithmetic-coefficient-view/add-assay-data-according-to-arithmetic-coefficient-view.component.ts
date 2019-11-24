
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AddAssayDataAccordingToArithmeticCoefficient } from 'app/shared/models/add-assay-data-according-to-arithmetic-coefficient';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AddAssayDataAccordingToArithmeticCoefficientService } from '../shared/add-assay-data-according-to-arithmetic-coefficient.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-assay-data-according-to-arithmetic-coefficient-view',
  templateUrl: './add-assay-data-according-to-arithmetic-coefficient-view.component.html',
  styleUrls: ['./add-assay-data-according-to-arithmetic-coefficient-view.component.scss'],
  providers: []
})

export class AddAssayDataAccordingToArithmeticCoefficientViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddAssayDataAccordingToArithmeticCoefficient: AddAssayDataAccordingToArithmeticCoefficient;
  addAssayDataAccordingToArithmeticCoefficientForm: FormGroup;

  private modelCodesService: LookupService;
private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
modelCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddAssayDataAccordingToArithmeticCoefficientDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddAssayDataAccordingToArithmeticCoefficientViewComponent>,
    public addAssayDataAccordingToArithmeticCoefficientService: AddAssayDataAccordingToArithmeticCoefficientService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.buildingCode],
  extensionCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.extensionCode],
  planYear : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.planYear],
  priceYear : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.priceYear],
  calculationCoefficient : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.calculationCoefficient],
  itemName : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.itemName],
  quntity : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.quntity],
  price : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.price],
  modelCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.modelCode],
  constructionType : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.constructionType],
  workType : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.workType],
  itemCode : [this.selectedAddAssayDataAccordingToArithmeticCoefficient.itemCode]
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
    return this.addAssayDataAccordingToArithmeticCoefficientForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.addAssayDataAccordingToArithmeticCoefficientForm.controls)) {
      this.addAssayDataAccordingToArithmeticCoefficientForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.modelCodesService = new LookupService('modelcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

