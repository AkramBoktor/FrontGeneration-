
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PrivateCenterData } from 'app/shared/models/private-center-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrivateCenterDataService } from '../shared/private-center-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-private-center-data-new',
  templateUrl: './private-center-data-new.component.html',
  styleUrls: ['./private-center-data-new.component.scss'],
  providers: [
    ]
})

export class PrivateCenterDataNewComponent extends AppBaseComponent implements OnInit {
  privateCenterDataForm: FormGroup;
  @Input() selectedPrivateCenterData: PrivateCenterData;
  errorMessages: FormControlError[] = [
        
  ];

  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
governmentSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdminstrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('government', { static: true }) GovernmentSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdminstration', { static: true }) EducationalAdminstrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PrivateCenterDataNewComponent>,
    public privateCenterDataService: PrivateCenterDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrivateCenterData = new PrivateCenterData();

    
	this.governmentSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز/القسم',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحي/القرية',
	});

	this.educationalAdminstrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الإدارة التعليمية',
	});


    this.privateCenterDataForm = this.formBuilder.group({
     
  id : [0],
  centralCode : [this.selectedPrivateCenterData.centralCode, [ Validators.required ]],
  name : [this.selectedPrivateCenterData.name, [ Validators.required ]],
  phoneNumber : [this.selectedPrivateCenterData.phoneNumber, [ Validators.required ]],
  address : [this.selectedPrivateCenterData.address, [ Validators.required ]],
  centerOwnerName : [this.selectedPrivateCenterData.centerOwnerName, [ Validators.required ]],
  iDNumber : [this.selectedPrivateCenterData.iDNumber, [ Validators.required ]],
  issuer : [this.selectedPrivateCenterData.issuer, [ Validators.required ]],
  responsibleManagerName : [this.selectedPrivateCenterData.responsibleManagerName, [ Validators.required ]],
  government : [this.selectedPrivateCenterData.government, [ Validators.required ]],
  sectionCenter : [this.selectedPrivateCenterData.sectionCenter, [ Validators.required ]],
  village : [this.selectedPrivateCenterData.village, [ Validators.required ]],
  educationalAdminstration : [this.selectedPrivateCenterData.educationalAdminstration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.privateCenterDataService.create(this.privateCenterDataForm.value)
        .pipe(switchMap(x => {
			return this.privateCenterDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.privateCenterDataForm.get(name);
    }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
 }
