
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LaboratorySpace } from 'app/shared/models/laboratory-space';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LaboratorySpaceService } from '../shared/laboratory-space.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-laboratory-space-new',
  templateUrl: './laboratory-space-new.component.html',
  styleUrls: ['./laboratory-space-new.component.scss'],
  providers: [
    ]
})

export class LaboratorySpaceNewComponent extends AppBaseComponent implements OnInit {
  laboratorySpaceForm: FormGroup;
  @Input() selectedLaboratorySpace: LaboratorySpace;
  errorMessages: FormControlError[] = [
        
  ];

  private educationalSpacesService: LookupService;

  
spaceCodeSelectOptions: MaterialSelectOptions;
spaceNotConnectedToDevicesSelectOptions: MaterialSelectOptions;

  
	@ViewChild('spaceCode', { static: true }) SpaceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('spaceNotConnectedToDevices', { static: true }) SpaceNotConnectedToDevicesSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LaboratorySpaceNewComponent>,
    public laboratorySpaceService: LaboratorySpaceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLaboratorySpace = new LaboratorySpace();

    
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
     
  id : [0],
  buildingCode : [this.selectedLaboratorySpace.buildingCode, [ Validators.required ]],
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
    this.laboratorySpaceService.create(this.laboratorySpaceForm.value)
        .pipe(switchMap(x => {
			return this.laboratorySpaceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.laboratorySpaceForm.get(name);
    }

  initializeLookupServices() {
    this.educationalSpacesService = new LookupService('educationalspaces', this.http);
this.educationalSpacesService = new LookupService('educationalspaces', this.http);
  }
 }
