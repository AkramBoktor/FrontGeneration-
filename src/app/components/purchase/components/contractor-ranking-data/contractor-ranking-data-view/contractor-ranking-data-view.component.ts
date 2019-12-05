
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContractorRankingData } from 'app/shared/models/contractor-ranking-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorRankingDataService } from '../shared/contractor-ranking-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-ranking-data-view',
  templateUrl: './contractor-ranking-data-view.component.html',
  styleUrls: ['./contractor-ranking-data-view.component.scss'],
  providers: []
})

export class ContractorRankingDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorRankingData: ContractorRankingData;
  contractorRankingDataForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorRankingDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorRankingDataViewComponent>,
    public contractorRankingDataService: ContractorRankingDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorRankingData = this.selectedContractorRankingDataDialog.data || this.selectedContractorRankingData;

    
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
      
  bidNumber : [this.selectedContractorRankingData.bidNumber],
  projectNumber : [this.selectedContractorRankingData.projectNumber],
  contractorCode : [this.selectedContractorRankingData.contractorCode],
  ongoingBusinessTotalValue : [this.selectedContractorRankingData.ongoingBusinessTotalValue],
  classificationCardNumber : [this.selectedContractorRankingData.classificationCardNumber],
  dateCardRating : [this.selectedContractorRankingData.dateCardRating],
  reason : [this.selectedContractorRankingData.reason],
  offeringType : [this.selectedContractorRankingData.offeringType],
  constructionType : [this.selectedContractorRankingData.constructionType],
  classificationCode : [this.selectedContractorRankingData.classificationCode],
  classificationValueCode : [this.selectedContractorRankingData.classificationValueCode],
  decision : [this.selectedContractorRankingData.decision]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.contractorRankingDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contractorRankingDataForm.controls)) {
      this.contractorRankingDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.classificationFieldCodesService = new LookupService('classificationfieldcodes', this.http);
this.classificationValueCodesService = new LookupService('classificationvaluecodes', this.http);
this.classificationDecisionsService = new LookupService('classificationdecisions', this.http);
  }
}

