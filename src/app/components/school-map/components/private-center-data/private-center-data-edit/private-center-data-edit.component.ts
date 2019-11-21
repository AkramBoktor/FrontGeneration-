
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PrivateCenterData } from 'app/shared/models/private-center-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PrivateCenterDataService } from '../shared/private-center-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-private-center-data-edit',
  templateUrl: './private-center-data-edit.component.html',
  styleUrls: ['./private-center-data-edit.component.scss'],
  providers: []
})

export class PrivateCenterDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrivateCenterData: PrivateCenterData;
  privateCenterDataForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrivateCenterDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrivateCenterDataEditComponent>,
    public privateCenterDataService: PrivateCenterDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrivateCenterData = new PrivateCenterData();
    this.selectedPrivateCenterData = this.selectedPrivateCenterDataDialog.data || this.selectedPrivateCenterData;

    
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
      
  id : [this.selectedPrivateCenterData.id],
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
    this.privateCenterDataService.update(this.privateCenterDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.privateCenterDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.privateCenterDataForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}
