
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GeneralSite } from 'app/shared/models/general-site';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralSiteService } from '../shared/general-site.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-site-view',
  templateUrl: './general-site-view.component.html',
  styleUrls: ['./general-site-view.component.scss'],
  providers: []
})

export class GeneralSiteViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralSite: GeneralSite;
  generalSiteForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private mainRoadTypeCodesService: LookupService;
private directionStatusCodesService: LookupService;
private directionCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadTypeCodeSelectOptions: MaterialSelectOptions;
directionCodeSelectOptions: MaterialSelectOptions;
movementDirectionCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralSiteDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralSiteViewComponent>,
    public generalSiteService: GeneralSiteService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralSite = this.selectedGeneralSiteDialog.data || this.selectedGeneralSite;

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.mainRoadTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainRoadTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الطريق الرئيسي',
	});

	this.directionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الطريق الرئيسي',
	});

	this.movementDirectionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود اتجاه الحركه',
	});


    this.generalSiteForm = this.formBuilder.group({
      
  buildingCode : [this.selectedGeneralSite.buildingCode],
  roadWidth : [this.selectedGeneralSite.roadWidth],
  quality : [this.selectedGeneralSite.quality],
  regionalCenterCode : [this.selectedGeneralSite.regionalCenterCode],
  branchCode : [this.selectedGeneralSite.branchCode],
  mainRoadTypeCode : [this.selectedGeneralSite.mainRoadTypeCode],
  directionCode : [this.selectedGeneralSite.directionCode],
  movementDirectionCode : [this.selectedGeneralSite.movementDirectionCode]
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
    return this.generalSiteForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.generalSiteForm.controls)) {
      this.generalSiteForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.mainRoadTypeCodesService = new LookupService('mainroadtypecodes', this.http);
this.directionStatusCodesService = new LookupService('directionstatuscodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}

