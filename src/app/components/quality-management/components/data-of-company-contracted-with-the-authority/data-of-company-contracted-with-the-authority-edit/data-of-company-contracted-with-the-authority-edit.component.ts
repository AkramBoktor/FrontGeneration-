
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataOfCompanyContractedWithTheAuthority } from 'app/shared/models/data-of-company-contracted-with-the-authority';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataOfCompanyContractedWithTheAuthorityService } from '../shared/data-of-company-contracted-with-the-authority.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-company-contracted-with-the-authority-edit',
  templateUrl: './data-of-company-contracted-with-the-authority-edit.component.html',
  styleUrls: ['./data-of-company-contracted-with-the-authority-edit.component.scss'],
  providers: []
})

export class DataOfCompanyContractedWithTheAuthorityEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfCompanyContractedWithTheAuthority: DataOfCompanyContractedWithTheAuthority;
  dataOfCompanyContractedWithTheAuthorityForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private mainBranchCodeService: LookupService;
private adjectivesService: LookupService;
private mamoriaTaxService: LookupService;
private mainActivitiesService: LookupService;

  
mainBranchCodeSelectOptions: MaterialSelectOptions;
adjectiveSelectOptions: MaterialSelectOptions;
mamoriaTaxSelectOptions: MaterialSelectOptions;
mainActivitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('mainBranchCode', { static: true }) MainBranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('adjective', { static: true }) AdjectiveSelectComponent: MaterialSelectComponent;
	@ViewChild('mamoriaTax', { static: true }) MamoriaTaxSelectComponent: MaterialSelectComponent;
	@ViewChild('mainActivity', { static: true }) MainActivitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfCompanyContractedWithTheAuthorityDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfCompanyContractedWithTheAuthorityEditComponent>,
    public dataOfCompanyContractedWithTheAuthorityService: DataOfCompanyContractedWithTheAuthorityService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfCompanyContractedWithTheAuthority = new DataOfCompanyContractedWithTheAuthority();
    this.selectedDataOfCompanyContractedWithTheAuthority = this.selectedDataOfCompanyContractedWithTheAuthorityDialog.data || this.selectedDataOfCompanyContractedWithTheAuthority;

    
	this.mainBranchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainBranchCodeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع الرئيسي',
	});

	this.adjectiveSelectOptions = new MaterialSelectOptions({
	 data: this.adjectivesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفته',
	});

	this.mamoriaTaxSelectOptions = new MaterialSelectOptions({
	 data: this.mamoriaTaxService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مامورية الضرائب',
	});

	this.mainActivitySelectOptions = new MaterialSelectOptions({
	 data: this.mainActivitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'النشاط الأساسي',
	});


    this.dataOfCompanyContractedWithTheAuthorityForm = this.formBuilder.group({
      
  id : [this.selectedDataOfCompanyContractedWithTheAuthority.id],
  contractEndingDate : [this.selectedDataOfCompanyContractedWithTheAuthority.contractEndingDate, [ Validators.required ]],
  contractStartingDate : [this.selectedDataOfCompanyContractedWithTheAuthority.contractStartingDate, [ Validators.required ]],
  companyPresenter : [this.selectedDataOfCompanyContractedWithTheAuthority.companyPresenter, [ Validators.required ]],
  taxCardNumber : [this.selectedDataOfCompanyContractedWithTheAuthority.taxCardNumber, [ Validators.required ]],
  companyCode : [this.selectedDataOfCompanyContractedWithTheAuthority.companyCode, [ Validators.required ]],
  companyName : [this.selectedDataOfCompanyContractedWithTheAuthority.companyName, [ Validators.required ]],
  companyAddress : [this.selectedDataOfCompanyContractedWithTheAuthority.companyAddress, [ Validators.required ]],
  companyTelephon : [this.selectedDataOfCompanyContractedWithTheAuthority.companyTelephon, [ Validators.required ]],
  shopNumber : [this.selectedDataOfCompanyContractedWithTheAuthority.shopNumber, [ Validators.required ]],
  fileNumber : [this.selectedDataOfCompanyContractedWithTheAuthority.fileNumber, [ Validators.required ]],
  mainBranchCode : [this.selectedDataOfCompanyContractedWithTheAuthority.mainBranchCode, [ Validators.required ]],
  adjective : [this.selectedDataOfCompanyContractedWithTheAuthority.adjective, [ Validators.required ]],
  mamoriaTax : [this.selectedDataOfCompanyContractedWithTheAuthority.mamoriaTax, [ Validators.required ]],
  mainActivity : [this.selectedDataOfCompanyContractedWithTheAuthority.mainActivity, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataOfCompanyContractedWithTheAuthorityService.update(this.dataOfCompanyContractedWithTheAuthorityForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataOfCompanyContractedWithTheAuthorityService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataOfCompanyContractedWithTheAuthorityForm.get(name);
  }

  initializeLookupServices() {
    this.mainBranchCodeService = new LookupService('mainbranchcodes', this.http);
this.adjectivesService = new LookupService('adjectives', this.http);
this.mamoriaTaxService = new LookupService('mamoriataxes', this.http);
this.mainActivitiesService = new LookupService('mainactivities', this.http);
  }
}
