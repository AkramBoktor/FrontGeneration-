
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GroupDetailsData } from 'app/shared/models/group-details-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GroupDetailsDataService } from '../shared/group-details-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-group-details-data-view',
  templateUrl: './group-details-data-view.component.html',
  styleUrls: ['./group-details-data-view.component.scss'],
  providers: []
})

export class GroupDetailsDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGroupDetailsData: GroupDetailsData;
  groupDetailsDataForm: FormGroup;

  private buildingTypesService: LookupService;
  private offeringTypesService: LookupService;
  private areasService: LookupService;


  buildingTypeSelectOptions: MaterialSelectOptions;
  offeringTypeSelectOptions: MaterialSelectOptions;
  educationalAdministrationSelectOptions: MaterialSelectOptions;



  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGroupDetailsDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<GroupDetailsDataViewComponent>,
    public groupDetailsDataService: GroupDetailsDataService) {
    super(injector);
  }

  ngOnInit() {
    this.initializeLookupServices();
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

      bidNumber: [this.selectedGroupDetailsData.bidNumber],
      project: [this.selectedGroupDetailsData.project],
      durationImplementationInMonths: [this.selectedGroupDetailsData.durationImplementationInMonths],
      buildingType: [this.selectedGroupDetailsData.buildingType],
      offeringType: [this.selectedGroupDetailsData.offeringType],
      educationalAdministration: [this.selectedGroupDetailsData.educationalAdministration]
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

      {
        errorName: 'min',
        errorMessage: 'لا يوجد مسلسل يساوي صفر'
      }
    ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
  }

  getControls(name: string) {
    return this.groupDetailsDataForm.get(name);
  }


  disableControls() {
    for (const control of Object.keys(this.groupDetailsDataForm.controls)) {
      this.groupDetailsDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
    this.areasService = new LookupService('areas', this.http);
  }
}

