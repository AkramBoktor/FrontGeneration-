
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AbstractStatementStructural } from 'app/shared/models/abstract-statement-structural';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AbstractStatementStructuralService } from '../shared/abstract-statement-structural.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-abstract-statement-structural-view',
  templateUrl: './abstract-statement-structural-view.component.html',
  styleUrls: ['./abstract-statement-structural-view.component.scss'],
  providers: []
})

export class AbstractStatementStructuralViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAbstractStatementStructural: AbstractStatementStructural;
  abstractStatementStructuralForm: FormGroup;

  private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private extractTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
abstractTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAbstractStatementStructuralDialog: any,
    @Optional() public dialogRef: MatDialogRef<AbstractStatementStructuralViewComponent>,
    public abstractStatementStructuralService: AbstractStatementStructuralService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractStatementStructural = this.selectedAbstractStatementStructuralDialog.data || this.selectedAbstractStatementStructural;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.abstractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
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


    this.abstractStatementStructuralForm = this.formBuilder.group({
      
  buildingCode : [this.selectedAbstractStatementStructural.buildingCode],
  abstractNumber : [this.selectedAbstractStatementStructural.abstractNumber],
  contractorName : [this.selectedAbstractStatementStructural.contractorName],
  siteDeliveryDate : [this.selectedAbstractStatementStructural.siteDeliveryDate],
  planYear : [this.selectedAbstractStatementStructural.planYear],
  bidNumber : [this.selectedAbstractStatementStructural.bidNumber],
  endPrevious : [this.selectedAbstractStatementStructural.endPrevious],
  businessEnd : [this.selectedAbstractStatementStructural.businessEnd],
  extensionNumber : [this.selectedAbstractStatementStructural.extensionNumber],
  itemName : [this.selectedAbstractStatementStructural.itemName],
  contractQuantity : [this.selectedAbstractStatementStructural.contractQuantity],
  totalQuantity : [this.selectedAbstractStatementStructural.totalQuantity],
  constructionType : [this.selectedAbstractStatementStructural.constructionType],
  offeringType : [this.selectedAbstractStatementStructural.offeringType],
  abstractType : [this.selectedAbstractStatementStructural.abstractType],
  workType : [this.selectedAbstractStatementStructural.workType],
  itemCode : [this.selectedAbstractStatementStructural.itemCode]
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
    return this.abstractStatementStructuralForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.abstractStatementStructuralForm.controls)) {
      this.abstractStatementStructuralForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

