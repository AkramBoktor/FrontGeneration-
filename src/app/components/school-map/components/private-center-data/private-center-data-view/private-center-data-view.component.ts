
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PrivateCenterData } from 'app/shared/models/private-center-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PrivateCenterDataService } from '../shared/private-center-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-private-center-data-view',
  templateUrl: './private-center-data-view.component.html',
  styleUrls: ['./private-center-data-view.component.scss'],
  providers: []
})

export class PrivateCenterDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrivateCenterData: PrivateCenterData;
  privateCenterDataForm: FormGroup;

  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
governmentSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdminstrationSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrivateCenterDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrivateCenterDataViewComponent>,
    public privateCenterDataService: PrivateCenterDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  centralCode : [this.selectedPrivateCenterData.centralCode],
  name : [this.selectedPrivateCenterData.name],
  phoneNumber : [this.selectedPrivateCenterData.phoneNumber],
  address : [this.selectedPrivateCenterData.address],
  centerOwnerName : [this.selectedPrivateCenterData.centerOwnerName],
  iDNumber : [this.selectedPrivateCenterData.iDNumber],
  issuer : [this.selectedPrivateCenterData.issuer],
  responsibleManagerName : [this.selectedPrivateCenterData.responsibleManagerName],
  government : [this.selectedPrivateCenterData.government],
  sectionCenter : [this.selectedPrivateCenterData.sectionCenter],
  village : [this.selectedPrivateCenterData.village],
  educationalAdminstration : [this.selectedPrivateCenterData.educationalAdminstration]
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
    return this.privateCenterDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.privateCenterDataForm.controls)) {
      this.privateCenterDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

