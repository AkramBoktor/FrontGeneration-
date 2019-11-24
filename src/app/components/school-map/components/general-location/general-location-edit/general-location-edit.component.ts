
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GeneralLocation } from 'app/shared/models/general-location';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GeneralLocationService } from '../shared/general-location.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-general-location-edit',
  templateUrl: './general-location-edit.component.html',
  styleUrls: ['./general-location-edit.component.scss'],
  providers: []
})

export class GeneralLocationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralLocation: GeneralLocation;
  generalLocationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private mainRoadTypeCodesService: LookupService;
private directionCodesService: LookupService;

  
sectionCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadTypeCodeSelectOptions: MaterialSelectOptions;
mainRoadStatusCodeSelectOptions: MaterialSelectOptions;
roadDirectionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCode', { static: true }) SectionCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadTypeCode', { static: true }) MainRoadTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadStatusCode', { static: true }) MainRoadStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('roadDirectionCode', { static: true }) RoadDirectionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralLocationDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralLocationEditComponent>,
    public generalLocationService: GeneralLocationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralLocation = new GeneralLocation();
    this.selectedGeneralLocation = this.selectedGeneralLocationDialog.data || this.selectedGeneralLocation;

    
	this.sectionCodeSelectOptions = new MaterialSelectOptions({
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

	this.mainRoadStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainRoadTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الطريق الرئيسي',
	});

	this.roadDirectionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود اتجاه الحركه',
	});


    this.generalLocationForm = this.formBuilder.group({
      
  id : [this.selectedGeneralLocation.id],
  buildingCode : [this.selectedGeneralLocation.buildingCode, [ Validators.required ]],
  roadWidth : [this.selectedGeneralLocation.roadWidth, [ Validators.required ]],
  type : [this.selectedGeneralLocation.type, [ Validators.required ]],
  sectionCode : [this.selectedGeneralLocation.sectionCode, [ ]],
  branchCode : [this.selectedGeneralLocation.branchCode, [ ]],
  mainRoadTypeCode : [this.selectedGeneralLocation.mainRoadTypeCode, [ Validators.required ]],
  mainRoadStatusCode : [this.selectedGeneralLocation.mainRoadStatusCode, [ Validators.required ]],
  roadDirectionCode : [this.selectedGeneralLocation.roadDirectionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.generalLocationService.update(this.generalLocationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.generalLocationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.generalLocationForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.mainRoadTypeCodesService = new LookupService('mainroadtypecodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}
