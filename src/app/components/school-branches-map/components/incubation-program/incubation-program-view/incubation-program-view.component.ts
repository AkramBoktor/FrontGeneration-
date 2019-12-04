
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { IncubationProgram } from 'app/shared/models/incubation-program';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { IncubationProgramService } from '../shared/incubation-program.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-incubation-program-view',
  templateUrl: './incubation-program-view.component.html',
  styleUrls: ['./incubation-program-view.component.scss'],
  providers: []
})

export class IncubationProgramViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIncubationProgram: IncubationProgram;
  incubationProgramForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIncubationProgramDialog: any,
    @Optional() public dialogRef: MatDialogRef<IncubationProgramViewComponent>,
    public incubationProgramService: IncubationProgramService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingNumber : [this.selectedIncubationProgram.buildingNumber],
  buildingName : [this.selectedIncubationProgram.buildingName],
  streetName : [this.selectedIncubationProgram.streetName],
  phoneNumber : [this.selectedIncubationProgram.phoneNumber],
  admissionAge : [this.selectedIncubationProgram.admissionAge],
  coordinates : [this.selectedIncubationProgram.coordinates],
  department : [this.selectedIncubationProgram.department],
  village : [this.selectedIncubationProgram.village],
  followed : [this.selectedIncubationProgram.followed],
  landOwnership : [this.selectedIncubationProgram.landOwnership],
  buildingOwnership : [this.selectedIncubationProgram.buildingOwnership],
  usePosition : [this.selectedIncubationProgram.usePosition]
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
    return this.incubationProgramForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.incubationProgramForm.controls)) {
      this.incubationProgramForm.controls[control].disable();
    }
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

