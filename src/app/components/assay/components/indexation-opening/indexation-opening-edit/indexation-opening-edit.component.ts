
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IndexationOpening } from 'app/shared/models/indexation-opening';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IndexationOpeningService } from '../shared/indexation-opening.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-indexation-opening-edit',
  templateUrl: './indexation-opening-edit.component.html',
  styleUrls: ['./indexation-opening-edit.component.scss'],
  providers: []
})

export class IndexationOpeningEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIndexationOpening: IndexationOpening;
  indexationOpeningForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
jopTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('jopType', { static: true }) JopTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIndexationOpeningDialog: any,
    @Optional() public dialogRef: MatDialogRef<IndexationOpeningEditComponent>,
    public indexationOpeningService: IndexationOpeningService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIndexationOpening = new IndexationOpening();
    this.selectedIndexationOpening = this.selectedIndexationOpeningDialog.data || this.selectedIndexationOpening;

    
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

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.indexationOpeningForm = this.formBuilder.group({
      
  id : [this.selectedIndexationOpening.id],
  buildingCode : [this.selectedIndexationOpening.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedIndexationOpening.extensionCode, [ ]],
  modelCode : [this.selectedIndexationOpening.modelCode, [ ]],
  planYear : [this.selectedIndexationOpening.planYear, [ Validators.required ]],
  pricingYear : [this.selectedIndexationOpening.pricingYear, [ ]],
  itemName : [this.selectedIndexationOpening.itemName, [ ]],
  quantity : [this.selectedIndexationOpening.quantity, [ Validators.required ]],
  price : [this.selectedIndexationOpening.price, [ ]],
  constructionType : [this.selectedIndexationOpening.constructionType, [ Validators.required ]],
  jopType : [this.selectedIndexationOpening.jopType, [ Validators.required ]],
  itemCode : [this.selectedIndexationOpening.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.indexationOpeningService.update(this.indexationOpeningForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.indexationOpeningService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.indexationOpeningForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
