
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { IndexationOpening } from 'app/shared/models/indexation-opening';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { IndexationOpeningService } from '../shared/indexation-opening.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-indexation-opening-view',
  templateUrl: './indexation-opening-view.component.html',
  styleUrls: ['./indexation-opening-view.component.scss'],
  providers: []
})

export class IndexationOpeningViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIndexationOpening: IndexationOpening;
  indexationOpeningForm: FormGroup;

  private modelCodesService: LookupService;
private constructionTypesService: LookupService;
private workTypesService: LookupService;

  
modelCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
jopTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIndexationOpeningDialog: any,
    @Optional() public dialogRef: MatDialogRef<IndexationOpeningViewComponent>,
    public indexationOpeningService: IndexationOpeningService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIndexationOpening = this.selectedIndexationOpeningDialog.data || this.selectedIndexationOpening;

    
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

	this.jopTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.indexationOpeningForm = this.formBuilder.group({
      
  buildingCode : [this.selectedIndexationOpening.buildingCode],
  extensionCode : [this.selectedIndexationOpening.extensionCode],
  planYear : [this.selectedIndexationOpening.planYear],
  pricingYear : [this.selectedIndexationOpening.pricingYear],
  itemCode : [this.selectedIndexationOpening.itemCode],
  itemName : [this.selectedIndexationOpening.itemName],
  quantity : [this.selectedIndexationOpening.quantity],
  price : [this.selectedIndexationOpening.price],
  modelCode : [this.selectedIndexationOpening.modelCode],
  constructionType : [this.selectedIndexationOpening.constructionType],
  jopType : [this.selectedIndexationOpening.jopType]
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
    return this.indexationOpeningForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.indexationOpeningForm.controls)) {
      this.indexationOpeningForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.modelCodesService = new LookupService('modelcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
}

