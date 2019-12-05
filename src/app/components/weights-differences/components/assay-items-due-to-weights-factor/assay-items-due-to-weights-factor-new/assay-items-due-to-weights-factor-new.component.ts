
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssayItemsDueToWeightsFactor } from 'app/shared/models/assay-items-due-to-weights-factor';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayItemsDueToWeightsFactorService } from '../shared/assay-items-due-to-weights-factor.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-items-due-to-weights-factor-new',
  templateUrl: './assay-items-due-to-weights-factor-new.component.html',
  styleUrls: ['./assay-items-due-to-weights-factor-new.component.scss'],
  providers: [
    ]
})

export class AssayItemsDueToWeightsFactorNewComponent extends AppBaseComponent implements OnInit {
  assayItemsDueToWeightsFactorForm: FormGroup;
  @Input() selectedAssayItemsDueToWeightsFactor: AssayItemsDueToWeightsFactor;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
clauseSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('employmentType', { static: true }) EmploymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('clause', { static: true }) ClauseSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssayItemsDueToWeightsFactorNewComponent>,
    public assayItemsDueToWeightsFactorService: AssayItemsDueToWeightsFactorService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayItemsDueToWeightsFactor = new AssayItemsDueToWeightsFactor();

    
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

	this.clauseSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'البند',
	});


    this.assayItemsDueToWeightsFactorForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedAssayItemsDueToWeightsFactor.buildingCode, [ Validators.required ]],
  buildingName : [this.selectedAssayItemsDueToWeightsFactor.buildingName, [ ]],
  extensionCode : [this.selectedAssayItemsDueToWeightsFactor.extensionCode, [ ]],
  yearPlan : [this.selectedAssayItemsDueToWeightsFactor.yearPlan, [ ]],
  sample : [this.selectedAssayItemsDueToWeightsFactor.sample, [ ]],
  pricingYear : [this.selectedAssayItemsDueToWeightsFactor.pricingYear, [ ]],
  constructionType : [this.selectedAssayItemsDueToWeightsFactor.constructionType, [ Validators.required ]],
  employmentType : [this.selectedAssayItemsDueToWeightsFactor.employmentType, [ Validators.required ]],
  clause : [this.selectedAssayItemsDueToWeightsFactor.clause, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assayItemsDueToWeightsFactorService.create(this.assayItemsDueToWeightsFactorForm.value)
        .pipe(switchMap(x => {
			return this.assayItemsDueToWeightsFactorService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assayItemsDueToWeightsFactorForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
 }
