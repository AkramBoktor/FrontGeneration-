
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AbstractStatementStructural } from 'app/shared/models/abstract-statement-structural';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AbstractStatementStructuralService } from '../shared/abstract-statement-structural.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-abstract-statement-structural-new',
  templateUrl: './abstract-statement-structural-new.component.html',
  styleUrls: ['./abstract-statement-structural-new.component.scss'],
  providers: [
    ]
})

export class AbstractStatementStructuralNewComponent extends AppBaseComponent implements OnInit {
  abstractStatementStructuralForm: FormGroup;
  @Input() selectedAbstractStatementStructural: AbstractStatementStructural;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('abstractType', { static: true }) AbstractTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AbstractStatementStructuralNewComponent>,
    public abstractStatementStructuralService: AbstractStatementStructuralService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAbstractStatementStructural = new AbstractStatementStructural();

    
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
     
  id : [0],
  buildingCode : [this.selectedAbstractStatementStructural.buildingCode, [ Validators.required ]],
  abstractNumber : [this.selectedAbstractStatementStructural.abstractNumber, [ Validators.required ]],
  contractorName : [this.selectedAbstractStatementStructural.contractorName, [ Validators.required ]],
  siteDeliveryDate : [this.selectedAbstractStatementStructural.siteDeliveryDate, [ ]],
  planYear : [this.selectedAbstractStatementStructural.planYear, [ ]],
  bidNumber : [this.selectedAbstractStatementStructural.bidNumber, [ Validators.required ]],
  endPrevious : [this.selectedAbstractStatementStructural.endPrevious, [ ]],
  businessEnd : [this.selectedAbstractStatementStructural.businessEnd, [ Validators.required ]],
  extensionNumber : [this.selectedAbstractStatementStructural.extensionNumber, [ Validators.required ]],
  itemName : [this.selectedAbstractStatementStructural.itemName, [ ]],
  contractQuantity : [this.selectedAbstractStatementStructural.contractQuantity, [ ]],
  totalQuantity : [this.selectedAbstractStatementStructural.totalQuantity, [ Validators.required ]],
  constructionType : [this.selectedAbstractStatementStructural.constructionType, [ Validators.required ]],
  offeringType : [this.selectedAbstractStatementStructural.offeringType, [ Validators.required ]],
  abstractType : [this.selectedAbstractStatementStructural.abstractType, [ Validators.required ]],
  workType : [this.selectedAbstractStatementStructural.workType, [ Validators.required ]],
  itemCode : [this.selectedAbstractStatementStructural.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.abstractStatementStructuralService.create(this.abstractStatementStructuralForm.value)
        .pipe(switchMap(x => {
			return this.abstractStatementStructuralService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.abstractStatementStructuralForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
