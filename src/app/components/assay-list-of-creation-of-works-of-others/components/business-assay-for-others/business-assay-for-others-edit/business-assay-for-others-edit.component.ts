
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BusinessAssayForOthers } from 'app/shared/models/business-assay-for-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BusinessAssayForOthersService } from '../shared/business-assay-for-others.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-business-assay-for-others-edit',
  templateUrl: './business-assay-for-others-edit.component.html',
  styleUrls: ['./business-assay-for-others-edit.component.scss'],
  providers: []
})

export class BusinessAssayForOthersEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBusinessAssayForOthers: BusinessAssayForOthers;
  businessAssayForOthersForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('employmentType', { static: true }) EmploymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBusinessAssayForOthersDialog: any,
    @Optional() public dialogRef: MatDialogRef<BusinessAssayForOthersEditComponent>,
    public businessAssayForOthersService: BusinessAssayForOthersService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBusinessAssayForOthers = new BusinessAssayForOthers();
    this.selectedBusinessAssayForOthers = this.selectedBusinessAssayForOthersDialog.data || this.selectedBusinessAssayForOthers;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.employmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.businessAssayForOthersForm = this.formBuilder.group({
      
  id : [this.selectedBusinessAssayForOthers.id],
  buildingCode : [this.selectedBusinessAssayForOthers.buildingCode, [ Validators.required ]],
  modelCode : [this.selectedBusinessAssayForOthers.modelCode, [ Validators.required ]],
  planYear : [this.selectedBusinessAssayForOthers.planYear, [ ]],
  pricingYear : [this.selectedBusinessAssayForOthers.pricingYear, [ ]],
  itemName : [this.selectedBusinessAssayForOthers.itemName, [ Validators.required ]],
  quantity : [this.selectedBusinessAssayForOthers.quantity, [ Validators.required ]],
  price : [this.selectedBusinessAssayForOthers.price, [ ]],
  constructionType : [this.selectedBusinessAssayForOthers.constructionType, [ Validators.required ]],
  employmentType : [this.selectedBusinessAssayForOthers.employmentType, [ Validators.required ]],
  itemCode : [this.selectedBusinessAssayForOthers.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.businessAssayForOthersService.update(this.businessAssayForOthersForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.businessAssayForOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.businessAssayForOthersForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
