
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssayWeightsFactorItems } from 'app/shared/models/assay-weights-factor-items';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssayWeightsFactorItemsService } from '../shared/assay-weights-factor-items.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-weights-factor-items-edit',
  templateUrl: './assay-weights-factor-items-edit.component.html',
  styleUrls: ['./assay-weights-factor-items-edit.component.scss'],
  providers: []
})

export class AssayWeightsFactorItemsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayWeightsFactorItems: AssayWeightsFactorItems;
  assayWeightsFactorItemsForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayWeightsFactorItemsDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayWeightsFactorItemsEditComponent>,
    public assayWeightsFactorItemsService: AssayWeightsFactorItemsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayWeightsFactorItems = new AssayWeightsFactorItems();
    this.selectedAssayWeightsFactorItems = this.selectedAssayWeightsFactorItemsDialog.data || this.selectedAssayWeightsFactorItems;

    
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
      
  id : [this.selectedAssayWeightsFactorItems.id],
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
    this.assayWeightsFactorItemsService.update(this.assayWeightsFactorItemsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assayWeightsFactorItemsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assayWeightsFactorItemsForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
