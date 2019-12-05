
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractorRankingData } from 'app/shared/models/contractor-ranking-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorRankingDataService } from '../shared/contractor-ranking-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-ranking-data-new',
  templateUrl: './contractor-ranking-data-new.component.html',
  styleUrls: ['./contractor-ranking-data-new.component.scss'],
  providers: [
    ]
})

export class ContractorRankingDataNewComponent extends AppBaseComponent implements OnInit {
  contractorRankingDataForm: FormGroup;
  @Input() selectedContractorRankingData: ContractorRankingData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private classificationFieldCodesService: LookupService;
private classificationValueCodesService: LookupService;
private classificationDecisionsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
classificationCodeSelectOptions: MaterialSelectOptions;
classificationValueCodeSelectOptions: MaterialSelectOptions;
decisionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationCode', { static: true }) ClassificationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationValueCode', { static: true }) ClassificationValueCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('decision', { static: true }) DecisionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContractorRankingDataNewComponent>,
    public contractorRankingDataService: ContractorRankingDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorRankingData = new ContractorRankingData();

    
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

	this.classificationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classificationFieldCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مجال التصنيف',
	});

	this.classificationValueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classificationValueCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود قيمه التصنيف',
	});

	this.decisionSelectOptions = new MaterialSelectOptions({
	 data: this.classificationDecisionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرار',
	});


    this.contractorRankingDataForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedContractorRankingData.bidNumber, [ Validators.required ]],
  projectNumber : [this.selectedContractorRankingData.projectNumber, [ Validators.required ]],
  contractorCode : [this.selectedContractorRankingData.contractorCode, [ Validators.required ]],
  ongoingBusinessTotalValue : [this.selectedContractorRankingData.ongoingBusinessTotalValue, [ ]],
  classificationCardNumber : [this.selectedContractorRankingData.classificationCardNumber, [ ]],
  dateCardRating : [this.selectedContractorRankingData.dateCardRating, [ Validators.required ]],
  reason : [this.selectedContractorRankingData.reason, [ Validators.required ]],
  offeringType : [this.selectedContractorRankingData.offeringType, [ Validators.required ]],
  constructionType : [this.selectedContractorRankingData.constructionType, [ Validators.required ]],
  classificationCode : [this.selectedContractorRankingData.classificationCode, [ Validators.required ]],
  classificationValueCode : [this.selectedContractorRankingData.classificationValueCode, [ Validators.required ]],
  decision : [this.selectedContractorRankingData.decision, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.contractorRankingDataService.create(this.contractorRankingDataForm.value)
        .pipe(switchMap(x => {
			return this.contractorRankingDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contractorRankingDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.classificationFieldCodesService = new LookupService('classificationfieldcodes', this.http);
this.classificationValueCodesService = new LookupService('classificationvaluecodes', this.http);
this.classificationDecisionsService = new LookupService('classificationdecisions', this.http);
  }
 }
