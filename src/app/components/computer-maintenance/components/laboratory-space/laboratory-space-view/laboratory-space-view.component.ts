
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LaboratorySpace } from 'app/shared/models/laboratory-space';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LaboratorySpaceService } from '../shared/laboratory-space.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-laboratory-space-view',
  templateUrl: './laboratory-space-view.component.html',
  styleUrls: ['./laboratory-space-view.component.scss'],
  providers: []
})

export class LaboratorySpaceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLaboratorySpace: LaboratorySpace;
  laboratorySpaceForm: FormGroup;

  private educationalSpacesService: LookupService;

  
spaceCodeSelectOptions: MaterialSelectOptions;
spaceNotConnectedToDevicesSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLaboratorySpaceDialog: any,
    @Optional() public dialogRef: MatDialogRef<LaboratorySpaceViewComponent>,
    public laboratorySpaceService: LaboratorySpaceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLaboratorySpace = this.selectedLaboratorySpaceDialog.data || this.selectedLaboratorySpace;

    
	this.spaceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalSpacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفراغ',
	});

	this.spaceNotConnectedToDevicesSelectOptions = new MaterialSelectOptions({
	 data: this.educationalSpacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفراغ لم يصله اجهزة',
	});


    this.laboratorySpaceForm = this.formBuilder.group({
      
  buildingCode : [this.selectedLaboratorySpace.buildingCode],
  spaceName : [this.selectedLaboratorySpace.spaceName],
  annexNumber : [this.selectedLaboratorySpace.annexNumber],
  floorNumber : [this.selectedLaboratorySpace.floorNumber],
  spaceSeries : [this.selectedLaboratorySpace.spaceSeries],
  spaceCode : [this.selectedLaboratorySpace.spaceCode],
  spaceNotConnectedToDevices : [this.selectedLaboratorySpace.spaceNotConnectedToDevices]
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
    return this.laboratorySpaceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.laboratorySpaceForm.controls)) {
      this.laboratorySpaceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.educationalSpacesService = new LookupService('educationalspaces', this.http);
this.educationalSpacesService = new LookupService('educationalspaces', this.http);
  }
}

