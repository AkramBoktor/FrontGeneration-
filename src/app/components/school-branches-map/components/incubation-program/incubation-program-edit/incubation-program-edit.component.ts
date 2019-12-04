
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IncubationProgram } from 'app/shared/models/incubation-program';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IncubationProgramService } from '../shared/incubation-program.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-incubation-program-edit',
  templateUrl: './incubation-program-edit.component.html',
  styleUrls: ['./incubation-program-edit.component.scss'],
  providers: []
})

export class IncubationProgramEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIncubationProgram: IncubationProgram;
  incubationProgramForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private followersService: LookupService;
private landOwnershipsService: LookupService;
private buildingOwnershipsService: LookupService;
private usePositionsService: LookupService;

  
departmentSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
followedSelectOptions: MaterialSelectOptions;
landOwnershipSelectOptions: MaterialSelectOptions;
buildingOwnershipSelectOptions: MaterialSelectOptions;
usePositionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('followed', { static: true }) FollowedSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwnership', { static: true }) LandOwnershipSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingOwnership', { static: true }) BuildingOwnershipSelectComponent: MaterialSelectComponent;
	@ViewChild('usePosition', { static: true }) UsePositionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIncubationProgramDialog: any,
    @Optional() public dialogRef: MatDialogRef<IncubationProgramEditComponent>,
    public incubationProgramService: IncubationProgramService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIncubationProgram = new IncubationProgram();
    this.selectedIncubationProgram = this.selectedIncubationProgramDialog.data || this.selectedIncubationProgram;

    
	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز/قسم',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حي/قرية',
	});

	this.followedSelectOptions = new MaterialSelectOptions({
	 data: this.followersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تابع/شياخة',
	});

	this.landOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكية الارض',
	});

	this.buildingOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.buildingOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكية المبني',
	});

	this.usePositionSelectOptions = new MaterialSelectOptions({
	 data: this.usePositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاستخدام',
	});


    this.incubationProgramForm = this.formBuilder.group({
      
  id : [this.selectedIncubationProgram.id],
  buildingNumber : [this.selectedIncubationProgram.buildingNumber, [ Validators.required ]],
  buildingName : [this.selectedIncubationProgram.buildingName, [ Validators.required ]],
  streetName : [this.selectedIncubationProgram.streetName, [ Validators.required ]],
  phoneNumber : [this.selectedIncubationProgram.phoneNumber, [ Validators.required ]],
  admissionAge : [this.selectedIncubationProgram.admissionAge, [ Validators.required ]],
  coordinates : [this.selectedIncubationProgram.coordinates, [ Validators.required ]],
  department : [this.selectedIncubationProgram.department, [ Validators.required ]],
  village : [this.selectedIncubationProgram.village, [ Validators.required ]],
  followed : [this.selectedIncubationProgram.followed, [ Validators.required ]],
  landOwnership : [this.selectedIncubationProgram.landOwnership, [ Validators.required ]],
  buildingOwnership : [this.selectedIncubationProgram.buildingOwnership, [ Validators.required ]],
  usePosition : [this.selectedIncubationProgram.usePosition, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.incubationProgramService.update(this.incubationProgramForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.incubationProgramService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.incubationProgramForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.followersService = new LookupService('followers', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
this.usePositionsService = new LookupService('usepositions', this.http);
  }
}
