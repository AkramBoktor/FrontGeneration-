
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GroupDetailsData } from 'app/shared/models/group-details-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GroupDetailsDataService } from '../shared/group-details-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-group-details-data-edit',
  templateUrl: './group-details-data-edit.component.html',
  styleUrls: ['./group-details-data-edit.component.scss'],
  providers: []
})

export class GroupDetailsDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGroupDetailsData: GroupDetailsData;
  groupDetailsDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];

  private buildingTypesService: LookupService;
private offeringTypesService: LookupService;
private areasService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGroupDetailsDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<GroupDetailsDataEditComponent>,
    public groupDetailsDataService: GroupDetailsDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGroupDetailsData = new GroupDetailsData();
    this.selectedGroupDetailsData = this.selectedGroupDetailsDataDialog.data || this.selectedGroupDetailsData;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});


    this.groupDetailsDataForm = this.formBuilder.group({
      
  id : [this.selectedGroupDetailsData.id],
  bidNumber : [this.selectedGroupDetailsData.bidNumber, [ Validators.min(1) ]],
  group : [this.selectedGroupDetailsData.group, [ Validators.required ]],
  durationImplementationInMonths : [this.selectedGroupDetailsData.durationImplementationInMonths, [ Validators.required ]],
  buildingType : [this.selectedGroupDetailsData.buildingType, [ Validators.required ]],
  offeringType : [this.selectedGroupDetailsData.offeringType, [ Validators.required ]],
  educationalAdministration : [this.selectedGroupDetailsData.educationalAdministration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.groupDetailsDataService.update(this.groupDetailsDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.groupDetailsDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.groupDetailsDataForm.get(name);
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}
