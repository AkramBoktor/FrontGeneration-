
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataOfCompanyContractedWithTheAuthority } from 'app/shared/models/data-of-company-contracted-with-the-authority';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfCompanyContractedWithTheAuthorityService } from '../shared/data-of-company-contracted-with-the-authority.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-company-contracted-with-the-authority-view',
  templateUrl: './data-of-company-contracted-with-the-authority-view.component.html',
  styleUrls: ['./data-of-company-contracted-with-the-authority-view.component.scss'],
  providers: []
})

export class DataOfCompanyContractedWithTheAuthorityViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfCompanyContractedWithTheAuthority: DataOfCompanyContractedWithTheAuthority;
  dataOfCompanyContractedWithTheAuthorityForm: FormGroup;

  private mainActivitiesService: LookupService;
private mamoriaTaxService: LookupService;
private adjectivesService: LookupService;
private mainBranchCodeService: LookupService;

  
mainActivitySelectOptions: MaterialSelectOptions;
mamoriaTaxSelectOptions: MaterialSelectOptions;
adjectiveSelectOptions: MaterialSelectOptions;
mainBranchCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfCompanyContractedWithTheAuthorityDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfCompanyContractedWithTheAuthorityViewComponent>,
    public dataOfCompanyContractedWithTheAuthorityService: DataOfCompanyContractedWithTheAuthorityService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfCompanyContractedWithTheAuthority = this.selectedDataOfCompanyContractedWithTheAuthorityDialog.data || this.selectedDataOfCompanyContractedWithTheAuthority;

    
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


    this.dataOfCompanyContractedWithTheAuthorityForm = this.formBuilder.group({
      
  companyCode : [this.selectedDataOfCompanyContractedWithTheAuthority.companyCode],
  companyName : [this.selectedDataOfCompanyContractedWithTheAuthority.companyName],
  companyAddress : [this.selectedDataOfCompanyContractedWithTheAuthority.companyAddress],
  companyTelephon : [this.selectedDataOfCompanyContractedWithTheAuthority.companyTelephon],
  shopNumber : [this.selectedDataOfCompanyContractedWithTheAuthority.shopNumber],
  fileNumber : [this.selectedDataOfCompanyContractedWithTheAuthority.fileNumber],
  taxCardNumber : [this.selectedDataOfCompanyContractedWithTheAuthority.taxCardNumber],
  companyPresenter : [this.selectedDataOfCompanyContractedWithTheAuthority.companyPresenter],
  contractStartingDate : [this.selectedDataOfCompanyContractedWithTheAuthority.contractStartingDate],
  contractEndingDate : [this.selectedDataOfCompanyContractedWithTheAuthority.contractEndingDate],
  mainActivity : [this.selectedDataOfCompanyContractedWithTheAuthority.mainActivity],
  mamoriaTax : [this.selectedDataOfCompanyContractedWithTheAuthority.mamoriaTax],
  adjective : [this.selectedDataOfCompanyContractedWithTheAuthority.adjective],
  mainBranchCode : [this.selectedDataOfCompanyContractedWithTheAuthority.mainBranchCode]
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
    return this.dataOfCompanyContractedWithTheAuthorityForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataOfCompanyContractedWithTheAuthorityForm.controls)) {
      this.dataOfCompanyContractedWithTheAuthorityForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.mainActivitiesService = new LookupService('mainactivities', this.http);
this.mamoriaTaxService = new LookupService('mamoriataxes', this.http);
this.adjectivesService = new LookupService('adjectives', this.http);
this.mainBranchCodeService = new LookupService('mainbranchcodes', this.http);
  }
}

