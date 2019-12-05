
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataOfCompanyNotContractedWithTheAuthority } from 'app/shared/models/data-of-company-not-contracted-with-the-authority';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataOfCompanyNotContractedWithTheAuthorityService } from '../shared/data-of-company-not-contracted-with-the-authority.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-company-not-contracted-with-the-authority-new',
  templateUrl: './data-of-company-not-contracted-with-the-authority-new.component.html',
  styleUrls: ['./data-of-company-not-contracted-with-the-authority-new.component.scss'],
  providers: [
    ]
})

export class DataOfCompanyNotContractedWithTheAuthorityNewComponent extends AppBaseComponent implements OnInit {
  dataOfCompanyNotContractedWithTheAuthorityForm: FormGroup;
  @Input() selectedDataOfCompanyNotContractedWithTheAuthority: DataOfCompanyNotContractedWithTheAuthority;
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
    @Optional() public dialogRef: MatDialogRef<DataOfCompanyNotContractedWithTheAuthorityNewComponent>,
    public dataOfCompanyNotContractedWithTheAuthorityService: DataOfCompanyNotContractedWithTheAuthorityService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfCompanyNotContractedWithTheAuthority = new DataOfCompanyNotContractedWithTheAuthority();

    
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
     
  id : [0],
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
    this.dataOfCompanyNotContractedWithTheAuthorityService.create(this.dataOfCompanyNotContractedWithTheAuthorityForm.value)
        .pipe(switchMap(x => {
			return this.dataOfCompanyNotContractedWithTheAuthorityService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
