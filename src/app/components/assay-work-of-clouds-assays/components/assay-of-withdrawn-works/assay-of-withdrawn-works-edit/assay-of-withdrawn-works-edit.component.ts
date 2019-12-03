
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssayOfWithdrawnWorks } from 'app/shared/models/assay-of-withdrawn-works';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssayOfWithdrawnWorksService } from '../shared/assay-of-withdrawn-works.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-of-withdrawn-works-edit',
  templateUrl: './assay-of-withdrawn-works-edit.component.html',
  styleUrls: ['./assay-of-withdrawn-works-edit.component.scss'],
  providers: []
})

export class AssayOfWithdrawnWorksEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayOfWithdrawnWorks: AssayOfWithdrawnWorks;
  assayOfWithdrawnWorksForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayOfWithdrawnWorksDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayOfWithdrawnWorksEditComponent>,
    public assayOfWithdrawnWorksService: AssayOfWithdrawnWorksService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayOfWithdrawnWorks = new AssayOfWithdrawnWorks();
    this.selectedAssayOfWithdrawnWorks = this.selectedAssayOfWithdrawnWorksDialog.data || this.selectedAssayOfWithdrawnWorks;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
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


    this.assayOfWithdrawnWorksForm = this.formBuilder.group({
      
  id : [this.selectedAssayOfWithdrawnWorks.id],
  buildingCode : [this.selectedAssayOfWithdrawnWorks.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedAssayOfWithdrawnWorks.extensionCode, [ Validators.required ]],
  modelCode : [this.selectedAssayOfWithdrawnWorks.modelCode, [ Validators.required ]],
  planYear : [this.selectedAssayOfWithdrawnWorks.planYear, [ ]],
  pricingYear : [this.selectedAssayOfWithdrawnWorks.pricingYear, [ ]],
  itemName : [this.selectedAssayOfWithdrawnWorks.itemName, [ ]],
  amount : [this.selectedAssayOfWithdrawnWorks.amount, [ Validators.required ]],
  price : [this.selectedAssayOfWithdrawnWorks.price, [ ]],
  constructionType : [this.selectedAssayOfWithdrawnWorks.constructionType, [ Validators.required ]],
  workType : [this.selectedAssayOfWithdrawnWorks.workType, [ Validators.required ]],
  itemCode : [this.selectedAssayOfWithdrawnWorks.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assayOfWithdrawnWorksService.update(this.assayOfWithdrawnWorksForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assayOfWithdrawnWorksService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assayOfWithdrawnWorksForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
