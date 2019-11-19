
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractorRankingData } from 'app/shared/models/contractor-ranking-data';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ContractorRankingDataService } from '../shared/contractor-ranking-data.service';




@Component({
  selector: 'app-contractor-ranking-data-edit',
  templateUrl: './contractor-ranking-data-edit.component.html',
  styleUrls: ['./contractor-ranking-data-edit.component.scss'],
  providers: []
})

export class ContractorRankingDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorRankingData : ContractorRankingData;
  contractorRankingDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private classificationFieldCodesService: LookupService;
private classificationValueCodesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
classificationCodeSelectOptions: MaterialSelectOptions;
classificationValueCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationCode', { static: true }) ClassificationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationValueCode', { static: true }) ClassificationValueCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorRankingDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorRankingDataEditComponent>,
    public contractorRankingDataService: ContractorRankingDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorRankingData  = new ContractorRankingData();
    this.selectedContractorRankingData  = this.selectedContractorRankingDataDialog.data || this.selectedContractorRankingData ;

    
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


    this.contractorRankingDataForm = this.formBuilder.group({
      
  id : [this.selectedContractorRankingData .id],
  bidNumber : [this.selectedContractorRankingData .bidNumber, [ Validators.required ]],
  projectNumber : [this.selectedContractorRankingData .projectNumber, [ Validators.required ]],
  contractorCode : [this.selectedContractorRankingData .contractorCode, [ Validators.required ]],
  ongoingBusinessTotalValue : [this.selectedContractorRankingData .ongoingBusinessTotalValue, [ ]],
  classificationCardNumber : [this.selectedContractorRankingData .classificationCardNumber, [ ]],
  dateCardRating : [this.selectedContractorRankingData .dateCardRating, [ Validators.required ]],
  decision : [this.selectedContractorRankingData .decision, [ Validators.required ]],
  reason : [this.selectedContractorRankingData .reason, [ Validators.required ]],
  offeringType : [this.selectedContractorRankingData .offeringType, [ Validators.required ]],
  constructionType : [this.selectedContractorRankingData .constructionType, [ Validators.required ]],
  classificationCode : [this.selectedContractorRankingData .classificationCode, [ Validators.required ]],
  classificationValueCode : [this.selectedContractorRankingData .classificationValueCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contractorRankingDataService.update(this.contractorRankingDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contractorRankingDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contractorRankingDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.classificationFieldCodesService = new LookupService('classificationfieldcodes', this.http);
this.classificationValueCodesService = new LookupService('classificationvaluecodes', this.http);
  }
}
