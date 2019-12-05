
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssayWeightsFactorItems } from 'app/shared/models/assay-weights-factor-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayWeightsFactorItemsService } from '../shared/assay-weights-factor-items.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-weights-factor-items-new',
  templateUrl: './assay-weights-factor-items-new.component.html',
  styleUrls: ['./assay-weights-factor-items-new.component.scss'],
  providers: [
    ]
})

export class AssayWeightsFactorItemsNewComponent extends AppBaseComponent implements OnInit {
  assayWeightsFactorItemsForm: FormGroup;
  @Input() selectedAssayWeightsFactorItems: AssayWeightsFactorItems;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
jobTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobType', { static: true }) JobTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssayWeightsFactorItemsNewComponent>,
    public assayWeightsFactorItemsService: AssayWeightsFactorItemsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayWeightsFactorItems = new AssayWeightsFactorItems();

    
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


    this.assayWeightsFactorItemsForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedAssayWeightsFactorItems.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedAssayWeightsFactorItems.extensionCode, [ ]],
  model : [this.selectedAssayWeightsFactorItems.model, [ ]],
  planYear : [this.selectedAssayWeightsFactorItems.planYear, [ ]],
  pricingYear : [this.selectedAssayWeightsFactorItems.pricingYear, [ ]],
  testCode : [this.selectedAssayWeightsFactorItems.testCode, [ Validators.required ]],
  itemName : [this.selectedAssayWeightsFactorItems.itemName, [ ]],
  constructionType : [this.selectedAssayWeightsFactorItems.constructionType, [ ]],
  jobType : [this.selectedAssayWeightsFactorItems.jobType, [ Validators.required ]],
  itemCode : [this.selectedAssayWeightsFactorItems.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assayWeightsFactorItemsService.create(this.assayWeightsFactorItemsForm.value)
        .pipe(switchMap(x => {
			return this.assayWeightsFactorItemsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assayWeightsFactorItemsForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
