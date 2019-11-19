
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MinistryOfSolidarityAndCommunications } from 'app/shared/models/ministry-of-solidarity-and-communications';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MinistryOfSolidarityAndCommunicationsService } from '../shared/ministry-of-solidarity-and-communications.service';

@Component({
  selector: 'app-ministry-of-solidarity-and-communications-view',
  templateUrl: './ministry-of-solidarity-and-communications-view.component.html',
  styleUrls: ['./ministry-of-solidarity-and-communications-view.component.scss'],
  providers: []
})

export class MinistryOfSolidarityAndCommunicationsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMinistryOfSolidarityAndCommunications: MinistryOfSolidarityAndCommunications;
  ministryOfSolidarityAndCommunicationsForm: FormGroup;

  private ministriesService: LookupService;
private modulesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private followersService: LookupService;
private headquartersTypesService: LookupService;
private officeTypesService: LookupService;

  
ministrySelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
followerSelectOptions: MaterialSelectOptions;
headquarterTypeSelectOptions: MaterialSelectOptions;
officeTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMinistryOfSolidarityAndCommunicationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<MinistryOfSolidarityAndCommunicationsViewComponent>,
    public ministryOfSolidarityAndCommunicationsService: MinistryOfSolidarityAndCommunicationsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMinistryOfSolidarityAndCommunications = this.selectedMinistryOfSolidarityAndCommunicationsDialog.data || this.selectedMinistryOfSolidarityAndCommunications;

    
	this.ministrySelectOptions = new MaterialSelectOptions({
	 data: this.ministriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوزارة',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.modulesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية',
	});

	this.followerSelectOptions = new MaterialSelectOptions({
	 data: this.followersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التابع',
	});

	this.headquarterTypeSelectOptions = new MaterialSelectOptions({
	 data: this.headquartersTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المقر',
	});

	this.officeTypeSelectOptions = new MaterialSelectOptions({
	 data: this.officeTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المكتب',
	});


    this.ministryOfSolidarityAndCommunicationsForm = this.formBuilder.group({
      
  name : [this.selectedMinistryOfSolidarityAndCommunications.name],
  address : [this.selectedMinistryOfSolidarityAndCommunications.address],
  manager : [this.selectedMinistryOfSolidarityAndCommunications.manager],
  area : [this.selectedMinistryOfSolidarityAndCommunications.area],
  telephone : [this.selectedMinistryOfSolidarityAndCommunications.telephone],
  ministry : [this.selectedMinistryOfSolidarityAndCommunications.ministry],
  unit : [this.selectedMinistryOfSolidarityAndCommunications.unit],
  governorate : [this.selectedMinistryOfSolidarityAndCommunications.governorate],
  center : [this.selectedMinistryOfSolidarityAndCommunications.center],
  village : [this.selectedMinistryOfSolidarityAndCommunications.village],
  follower : [this.selectedMinistryOfSolidarityAndCommunications.follower],
  headquarterType : [this.selectedMinistryOfSolidarityAndCommunications.headquarterType],
  officeType : [this.selectedMinistryOfSolidarityAndCommunications.officeType]
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
    return this.ministryOfSolidarityAndCommunicationsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.ministryOfSolidarityAndCommunicationsForm.controls)) {
      this.ministryOfSolidarityAndCommunicationsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.ministriesService = new LookupService('ministries', this.http);
this.modulesService = new LookupService('modules', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.followersService = new LookupService('followers', this.http);
this.headquartersTypesService = new LookupService('headquarterstypes', this.http);
this.officeTypesService = new LookupService('officetypes', this.http);
  }
}

