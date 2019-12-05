
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AbstractStatementStructural } from 'app/shared/models/abstract-statement-structural';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AbstractStatementStructuralService } from '../shared/abstract-statement-structural.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-abstract-statement-structural-edit',
  templateUrl: './abstract-statement-structural-edit.component.html',
  styleUrls: ['./abstract-statement-structural-edit.component.scss'],
  providers: []
})

export class AbstractStatementStructuralEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAbstractStatementStructural: AbstractStatementStructural;
  abstractStatementStructuralForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemCodesService: LookupService;
private workTypesService: LookupService;
private extractTypesService: LookupService;
private offeringTypesService: LookupService;
private constructionTypesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
abstractTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('abstractType', { static: true }) AbstractTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAbstractStatementStructuralDialog: any,
    @Optional() public dialogRef: MatDialogRef<AbstractStatementStructuralEditComponent>,
    public abstractStatementStructuralService: AbstractStatementStructuralService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractStatementStructural = new AbstractStatementStructural();
    this.selectedAbstractStatementStructural = this.selectedAbstractStatementStructuralDialog.data || this.selectedAbstractStatementStructural;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.abstractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.abstractStatementStructuralForm = this.formBuilder.group({
      
  id : [this.selectedAbstractStatementStructural.id],
  buildingCode : [this.selectedAbstractStatementStructural.buildingCode, [ Validators.required ]],
  itemName : [this.selectedAbstractStatementStructural.itemName, [ ]],
  extensionNumber : [this.selectedAbstractStatementStructural.extensionNumber, [ Validators.required ]],
  businessEnd : [this.selectedAbstractStatementStructural.businessEnd, [ Validators.required ]],
  contractQuantity : [this.selectedAbstractStatementStructural.contractQuantity, [ ]],
  endPrevious : [this.selectedAbstractStatementStructural.endPrevious, [ ]],
  planYear : [this.selectedAbstractStatementStructural.planYear, [ ]],
  siteDeliveryDate : [this.selectedAbstractStatementStructural.siteDeliveryDate, [ ]],
  contractorName : [this.selectedAbstractStatementStructural.contractorName, [ Validators.required ]],
  abstractNumber : [this.selectedAbstractStatementStructural.abstractNumber, [ Validators.required ]],
  bidNumber : [this.selectedAbstractStatementStructural.bidNumber, [ Validators.required ]],
  totalQuantity : [this.selectedAbstractStatementStructural.totalQuantity, [ Validators.required ]],
  itemCode : [this.selectedAbstractStatementStructural.itemCode, [ Validators.required ]],
  workType : [this.selectedAbstractStatementStructural.workType, [ Validators.required ]],
  abstractType : [this.selectedAbstractStatementStructural.abstractType, [ Validators.required ]],
  offeringType : [this.selectedAbstractStatementStructural.offeringType, [ Validators.required ]],
  constructionType : [this.selectedAbstractStatementStructural.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.abstractStatementStructuralService.update(this.abstractStatementStructuralForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.abstractStatementStructuralService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.abstractStatementStructuralForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
