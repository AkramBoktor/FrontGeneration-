
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BusinessAssayForOthers } from 'app/shared/models/business-assay-for-others';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BusinessAssayForOthersService } from '../shared/business-assay-for-others.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-business-assay-for-others-new',
  templateUrl: './business-assay-for-others-new.component.html',
  styleUrls: ['./business-assay-for-others-new.component.scss'],
  providers: [
    ]
})

export class BusinessAssayForOthersNewComponent extends AppBaseComponent implements OnInit {
  businessAssayForOthersForm: FormGroup;
  @Input() selectedBusinessAssayForOthers: BusinessAssayForOthers;
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
    @Optional() public dialogRef: MatDialogRef<BusinessAssayForOthersNewComponent>,
    public businessAssayForOthersService: BusinessAssayForOthersService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBusinessAssayForOthers = new BusinessAssayForOthers();

    
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
     
  id : [0],
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
    this.businessAssayForOthersService.create(this.businessAssayForOthersForm.value)
        .pipe(switchMap(x => {
			return this.businessAssayForOthersService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
