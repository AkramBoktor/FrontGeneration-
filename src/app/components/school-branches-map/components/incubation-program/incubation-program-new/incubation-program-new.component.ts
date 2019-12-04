
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IncubationProgram } from 'app/shared/models/incubation-program';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IncubationProgramService } from '../shared/incubation-program.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-incubation-program-new',
  templateUrl: './incubation-program-new.component.html',
  styleUrls: ['./incubation-program-new.component.scss'],
  providers: [
    ]
})

export class IncubationProgramNewComponent extends AppBaseComponent implements OnInit {
  incubationProgramForm: FormGroup;
  @Input() selectedIncubationProgram: IncubationProgram;
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
    @Optional() public dialogRef: MatDialogRef<IncubationProgramNewComponent>,
    public incubationProgramService: IncubationProgramService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIncubationProgram = new IncubationProgram();

    
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
     
  id : [0],
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
    this.incubationProgramService.create(this.incubationProgramForm.value)
        .pipe(switchMap(x => {
			return this.incubationProgramService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
