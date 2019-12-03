
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataOfCompanyNotContractedWithTheAuthority } from 'app/shared/models/data-of-company-not-contracted-with-the-authority';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfCompanyNotContractedWithTheAuthorityService } from '../shared/data-of-company-not-contracted-with-the-authority.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-company-not-contracted-with-the-authority-view',
  templateUrl: './data-of-company-not-contracted-with-the-authority-view.component.html',
  styleUrls: ['./data-of-company-not-contracted-with-the-authority-view.component.scss'],
  providers: []
})

export class DataOfCompanyNotContractedWithTheAuthorityViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfCompanyNotContractedWithTheAuthority: DataOfCompanyNotContractedWithTheAuthority;
  dataOfCompanyNotContractedWithTheAuthorityForm: FormGroup;

  private mainActivitiesService: LookupService;
private mamoriaTaxService: LookupService;
private adjectivesService: LookupService;
private mainBranchCodeService: LookupService;

  
mainActivitySelectOptions: MaterialSelectOptions;
mamoriaTaxSelectOptions: MaterialSelectOptions;
adjectiveSelectOptions: MaterialSelectOptions;
mainBranchCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfCompanyNotContractedWithTheAuthorityDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfCompanyNotContractedWithTheAuthorityViewComponent>,
    public dataOfCompanyNotContractedWithTheAuthorityService: DataOfCompanyNotContractedWithTheAuthorityService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfCompanyNotContractedWithTheAuthority = this.selectedDataOfCompanyNotContractedWithTheAuthorityDialog.data || this.selectedDataOfCompanyNotContractedWithTheAuthority;

    
	this.mainActivitySelectOptions = new MaterialSelectOptions({
	 data: this.mainActivitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'النشاط الأساسي',
	});

	this.mamoriaTaxSelectOptions = new MaterialSelectOptions({
	 data: this.mamoriaTaxService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مامورية الضرائب',
	});

	this.adjectiveSelectOptions = new MaterialSelectOptions({
	 data: this.adjectivesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفته',
	});

	this.mainBranchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainBranchCodeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع الرئيسي',
	});


    this.dataOfCompanyNotContractedWithTheAuthorityForm = this.formBuilder.group({
      
  companyCode : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyCode],
  companyName : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyName],
  companyAddress : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyAddress],
  companyTelephon : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyTelephon],
  shopNumber : [this.selectedDataOfCompanyNotContractedWithTheAuthority.shopNumber],
  fileNumber : [this.selectedDataOfCompanyNotContractedWithTheAuthority.fileNumber],
  taxCardNumber : [this.selectedDataOfCompanyNotContractedWithTheAuthority.taxCardNumber],
  companyPresenter : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyPresenter],
  contractStartingDate : [this.selectedDataOfCompanyNotContractedWithTheAuthority.contractStartingDate],
  contractEndingDate : [this.selectedDataOfCompanyNotContractedWithTheAuthority.contractEndingDate],
  mainActivity : [this.selectedDataOfCompanyNotContractedWithTheAuthority.mainActivity],
  mamoriaTax : [this.selectedDataOfCompanyNotContractedWithTheAuthority.mamoriaTax],
  adjective : [this.selectedDataOfCompanyNotContractedWithTheAuthority.adjective],
  mainBranchCode : [this.selectedDataOfCompanyNotContractedWithTheAuthority.mainBranchCode]
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
    return this.dataOfCompanyNotContractedWithTheAuthorityForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataOfCompanyNotContractedWithTheAuthorityForm.controls)) {
      this.dataOfCompanyNotContractedWithTheAuthorityForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.mainActivitiesService = new LookupService('mainactivities', this.http);
this.mamoriaTaxService = new LookupService('mamoriataxes', this.http);
this.adjectivesService = new LookupService('adjectives', this.http);
this.mainBranchCodeService = new LookupService('mainbranchcodes', this.http);
  }
}

