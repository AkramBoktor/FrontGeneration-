
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BasicDataForTheYouthCenter } from 'app/shared/models/basic-data-for-the-youth-center';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BasicDataForTheYouthCenterService } from '../shared/basic-data-for-the-youth-center.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-basic-data-for-the-youth-center-edit',
  templateUrl: './basic-data-for-the-youth-center-edit.component.html',
  styleUrls: ['./basic-data-for-the-youth-center-edit.component.scss'],
  providers: []
})

export class BasicDataForTheYouthCenterEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicDataForTheYouthCenter: BasicDataForTheYouthCenter;
  basicDataForTheYouthCenterForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private governoratesService: LookupService;
private regionalCenterCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
regionalCenterSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
neighborhoodVillageSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('regionalCenter', { static: true }) RegionalCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('neighborhoodVillage', { static: true }) NeighborhoodVillageSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicDataForTheYouthCenterDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicDataForTheYouthCenterEditComponent>,
    public basicDataForTheYouthCenterService: BasicDataForTheYouthCenterService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataForTheYouthCenter = new BasicDataForTheYouthCenter();
    this.selectedBasicDataForTheYouthCenter = this.selectedBasicDataForTheYouthCenterDialog.data || this.selectedBasicDataForTheYouthCenter;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

	this.regionalCenterSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز الاقليمى',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم / المركز',
	});

	this.neighborhoodVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحى / القريه',
	});


    this.basicDataForTheYouthCenterForm = this.formBuilder.group({
      
  id : [this.selectedBasicDataForTheYouthCenter.id],
  centerName : [this.selectedBasicDataForTheYouthCenter.centerName, [ Validators.required ]],
  governorate : [this.selectedBasicDataForTheYouthCenter.governorate, [ Validators.required ]],
  regionalCenter : [this.selectedBasicDataForTheYouthCenter.regionalCenter, [ Validators.required ]],
  sectionCenter : [this.selectedBasicDataForTheYouthCenter.sectionCenter, [ Validators.required ]],
  neighborhoodVillage : [this.selectedBasicDataForTheYouthCenter.neighborhoodVillage, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.basicDataForTheYouthCenterService.update(this.basicDataForTheYouthCenterForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.basicDataForTheYouthCenterService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.basicDataForTheYouthCenterForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
  }
}
