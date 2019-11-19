
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MinistryOfSolidarityAndCommunications } from 'app/shared/models/ministry-of-solidarity-and-communications';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { MinistryOfSolidarityAndCommunicationsService } from '../shared/ministry-of-solidarity-and-communications.service';




@Component({
  selector: 'app-ministry-of-solidarity-and-communications-edit',
  templateUrl: './ministry-of-solidarity-and-communications-edit.component.html',
  styleUrls: ['./ministry-of-solidarity-and-communications-edit.component.scss'],
  providers: []
})

export class MinistryOfSolidarityAndCommunicationsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMinistryOfSolidarityAndCommunications: MinistryOfSolidarityAndCommunications;
  ministryOfSolidarityAndCommunicationsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

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

  
	@ViewChild('ministry', { static: true }) MinistrySelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('center', { static: true }) CenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('follower', { static: true }) FollowerSelectComponent: MaterialSelectComponent;
	@ViewChild('headquarterType', { static: true }) HeadquarterTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('officeType', { static: true }) OfficeTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMinistryOfSolidarityAndCommunicationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<MinistryOfSolidarityAndCommunicationsEditComponent>,
    public ministryOfSolidarityAndCommunicationsService: MinistryOfSolidarityAndCommunicationsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMinistryOfSolidarityAndCommunications = new MinistryOfSolidarityAndCommunications();
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
      
  id : [this.selectedMinistryOfSolidarityAndCommunications.id],
  name : [this.selectedMinistryOfSolidarityAndCommunications.name, [ Validators.required ]],
  address : [this.selectedMinistryOfSolidarityAndCommunications.address, [ Validators.required ]],
  manager : [this.selectedMinistryOfSolidarityAndCommunications.manager, [ Validators.required ]],
  area : [this.selectedMinistryOfSolidarityAndCommunications.area, [ Validators.required ]],
  telephone : [this.selectedMinistryOfSolidarityAndCommunications.telephone, [ Validators.required ]],
  ministry : [this.selectedMinistryOfSolidarityAndCommunications.ministry, [ Validators.required ]],
  unit : [this.selectedMinistryOfSolidarityAndCommunications.unit, [ Validators.required ]],
  governorate : [this.selectedMinistryOfSolidarityAndCommunications.governorate, [ Validators.required ]],
  center : [this.selectedMinistryOfSolidarityAndCommunications.center, [ Validators.required ]],
  village : [this.selectedMinistryOfSolidarityAndCommunications.village, [ Validators.required ]],
  follower : [this.selectedMinistryOfSolidarityAndCommunications.follower, [ Validators.required ]],
  headquarterType : [this.selectedMinistryOfSolidarityAndCommunications.headquarterType, [ Validators.required ]],
  officeType : [this.selectedMinistryOfSolidarityAndCommunications.officeType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.ministryOfSolidarityAndCommunicationsService.update(this.ministryOfSolidarityAndCommunicationsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.ministryOfSolidarityAndCommunicationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.ministryOfSolidarityAndCommunicationsForm.get(name);
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
