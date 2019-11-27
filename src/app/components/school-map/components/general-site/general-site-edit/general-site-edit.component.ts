
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GeneralSite } from 'app/shared/models/general-site';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GeneralSiteService } from '../shared/general-site.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-general-site-edit',
  templateUrl: './general-site-edit.component.html',
  styleUrls: ['./general-site-edit.component.scss'],
  providers: []
})

export class GeneralSiteEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralSite: GeneralSite;
  generalSiteForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

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

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadTypeCode', { static: true }) MainRoadTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('directionCode', { static: true }) DirectionCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('movementDirectionCode', { static: true }) MovementDirectionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralSiteDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralSiteEditComponent>,
    public generalSiteService: GeneralSiteService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralSite = new GeneralSite();
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
      
  id : [this.selectedGeneralSite.id],
  buildingCode : [this.selectedGeneralSite.buildingCode, [ Validators.required ]],
  roadWidth : [this.selectedGeneralSite.roadWidth, [ Validators.required ]],
  quality : [this.selectedGeneralSite.quality, [ Validators.required ]],
  regionalCenterCode : [this.selectedGeneralSite.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedGeneralSite.branchCode, [ Validators.required ]],
  mainRoadTypeCode : [this.selectedGeneralSite.mainRoadTypeCode, [ Validators.required ]],
  directionCode : [this.selectedGeneralSite.directionCode, [ Validators.required ]],
  movementDirectionCode : [this.selectedGeneralSite.movementDirectionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.generalSiteService.update(this.generalSiteForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.generalSiteService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.generalSiteForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.mainRoadTypeCodesService = new LookupService('mainroadtypecodes', this.http);
this.directionStatusCodesService = new LookupService('directionstatuscodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}
