
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LaboratorySpace } from 'app/shared/models/laboratory-space';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LaboratorySpaceService } from '../shared/laboratory-space.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-laboratory-space-edit',
  templateUrl: './laboratory-space-edit.component.html',
  styleUrls: ['./laboratory-space-edit.component.scss'],
  providers: []
})

export class LaboratorySpaceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLaboratorySpace: LaboratorySpace;
  laboratorySpaceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private educationalSpacesService: LookupService;


  
spaceCodeSelectOptions: MaterialSelectOptions;
spaceNotConnectedToDevicesSelectOptions: MaterialSelectOptions;

  
	@ViewChild('spaceCode', { static: true }) SpaceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('spaceNotConnectedToDevices', { static: true }) SpaceNotConnectedToDevicesSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLaboratorySpaceDialog: any,
    @Optional() public dialogRef: MatDialogRef<LaboratorySpaceEditComponent>,
    public laboratorySpaceService: LaboratorySpaceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLaboratorySpace = new LaboratorySpace();
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
      
  id : [this.selectedLaboratorySpace.id],
  spaceName : [this.selectedLaboratorySpace.spaceName, [ Validators.required ]],
  annexNumber : [this.selectedLaboratorySpace.annexNumber, [ Validators.required ]],
  floorNumber : [this.selectedLaboratorySpace.floorNumber, [ Validators.required ]],
  spaceSeries : [this.selectedLaboratorySpace.spaceSeries, [ Validators.required ]],
  spaceCode : [this.selectedLaboratorySpace.spaceCode, [ Validators.required ]],
  spaceNotConnectedToDevices : [this.selectedLaboratorySpace.spaceNotConnectedToDevices, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.laboratorySpaceService.update(this.laboratorySpaceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.laboratorySpaceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.laboratorySpaceForm.get(name);
  }

  initializeLookupServices() {
    this.educationalSpacesService = new LookupService('educationalspaces', this.http);
this.educationalSpacesService = new LookupService('educationalspaces', this.http);
  }
}
