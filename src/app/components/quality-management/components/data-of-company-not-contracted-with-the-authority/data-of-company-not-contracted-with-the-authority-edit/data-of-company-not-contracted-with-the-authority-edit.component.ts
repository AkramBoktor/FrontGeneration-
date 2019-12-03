
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataOfCompanyNotContractedWithTheAuthority } from 'app/shared/models/data-of-company-not-contracted-with-the-authority';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataOfCompanyNotContractedWithTheAuthorityService } from '../shared/data-of-company-not-contracted-with-the-authority.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-company-not-contracted-with-the-authority-edit',
  templateUrl: './data-of-company-not-contracted-with-the-authority-edit.component.html',
  styleUrls: ['./data-of-company-not-contracted-with-the-authority-edit.component.scss'],
  providers: []
})

export class DataOfCompanyNotContractedWithTheAuthorityEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfCompanyNotContractedWithTheAuthority: DataOfCompanyNotContractedWithTheAuthority;
  dataOfCompanyNotContractedWithTheAuthorityForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private mainActivitiesService: LookupService;
private mamoriaTaxService: LookupService;
private adjectivesService: LookupService;
private mainBranchCodeService: LookupService;

  
mainActivitySelectOptions: MaterialSelectOptions;
mamoriaTaxSelectOptions: MaterialSelectOptions;
adjectiveSelectOptions: MaterialSelectOptions;
mainBranchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('mainActivity', { static: true }) MainActivitySelectComponent: MaterialSelectComponent;
	@ViewChild('mamoriaTax', { static: true }) MamoriaTaxSelectComponent: MaterialSelectComponent;
	@ViewChild('adjective', { static: true }) AdjectiveSelectComponent: MaterialSelectComponent;
	@ViewChild('mainBranchCode', { static: true }) MainBranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfCompanyNotContractedWithTheAuthorityDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfCompanyNotContractedWithTheAuthorityEditComponent>,
    public dataOfCompanyNotContractedWithTheAuthorityService: DataOfCompanyNotContractedWithTheAuthorityService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfCompanyNotContractedWithTheAuthority = new DataOfCompanyNotContractedWithTheAuthority();
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
      
  id : [this.selectedDataOfCompanyNotContractedWithTheAuthority.id],
  companyCode : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyCode, [ Validators.required ]],
  companyName : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyName, [ Validators.required ]],
  companyAddress : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyAddress, [ Validators.required ]],
  companyTelephon : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyTelephon, [ Validators.required ]],
  shopNumber : [this.selectedDataOfCompanyNotContractedWithTheAuthority.shopNumber, [ Validators.required ]],
  fileNumber : [this.selectedDataOfCompanyNotContractedWithTheAuthority.fileNumber, [ Validators.required ]],
  taxCardNumber : [this.selectedDataOfCompanyNotContractedWithTheAuthority.taxCardNumber, [ Validators.required ]],
  companyPresenter : [this.selectedDataOfCompanyNotContractedWithTheAuthority.companyPresenter, [ Validators.required ]],
  contractStartingDate : [this.selectedDataOfCompanyNotContractedWithTheAuthority.contractStartingDate, [ Validators.required ]],
  contractEndingDate : [this.selectedDataOfCompanyNotContractedWithTheAuthority.contractEndingDate, [ Validators.required ]],
  mainActivity : [this.selectedDataOfCompanyNotContractedWithTheAuthority.mainActivity, [ Validators.required ]],
  mamoriaTax : [this.selectedDataOfCompanyNotContractedWithTheAuthority.mamoriaTax, [ Validators.required ]],
  adjective : [this.selectedDataOfCompanyNotContractedWithTheAuthority.adjective, [ Validators.required ]],
  mainBranchCode : [this.selectedDataOfCompanyNotContractedWithTheAuthority.mainBranchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataOfCompanyNotContractedWithTheAuthorityService.update(this.dataOfCompanyNotContractedWithTheAuthorityForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataOfCompanyNotContractedWithTheAuthorityService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataOfCompanyNotContractedWithTheAuthorityForm.get(name);
  }

  initializeLookupServices() {
    this.mainActivitiesService = new LookupService('mainactivities', this.http);
this.mamoriaTaxService = new LookupService('mamoriataxes', this.http);
this.adjectivesService = new LookupService('adjectives', this.http);
this.mainBranchCodeService = new LookupService('mainbranchcodes', this.http);
  }
}
