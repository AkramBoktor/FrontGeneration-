
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Level } from 'app/shared/models/level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LevelService } from '../shared/level.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-level-new',
  templateUrl: './level-new.component.html',
  styleUrls: ['./level-new.component.scss'],
  providers: [
    ]
})

export class LevelNewComponent extends AppBaseComponent implements OnInit {
  levelForm: FormGroup;
  @Input() selectedLevel: Level;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LevelNewComponent>,
    public levelService: LevelService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLevel = new Level();

    
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


    this.levelForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedLevel.buildingCode, [ Validators.required ]],
  extensionNumber : [this.selectedLevel.extensionNumber, [ Validators.required ]],
  mainRoadLevel : [this.selectedLevel.mainRoadLevel, [ Validators.required ]],
  northernStreetLevel : [this.selectedLevel.northernStreetLevel, [ Validators.required ]],
  southernStreetLevel : [this.selectedLevel.southernStreetLevel, [ Validators.required ]],
  easternStreetLevel : [this.selectedLevel.easternStreetLevel, [ Validators.required ]],
  westernStreetLevel : [this.selectedLevel.westernStreetLevel, [ Validators.required ]],
  northEastStreetLevel : [this.selectedLevel.northEastStreetLevel, [ Validators.required ]],
  northWestStreetLevel : [this.selectedLevel.northWestStreetLevel, [ Validators.required ]],
  southEastStreetLevel : [this.selectedLevel.southEastStreetLevel, [ Validators.required ]],
  southWestStreetLevel : [this.selectedLevel.southWestStreetLevel, [ Validators.required ]],
  northernCourtyardLevel : [this.selectedLevel.northernCourtyardLevel, [ Validators.required ]],
  southernCourtyardLevel : [this.selectedLevel.southernCourtyardLevel, [ Validators.required ]],
  easternCourtyardLevel : [this.selectedLevel.easternCourtyardLevel, [ Validators.required ]],
  westernCourtyardLevel : [this.selectedLevel.westernCourtyardLevel, [ Validators.required ]],
  courtyardLevelWithinSite : [this.selectedLevel.courtyardLevelWithinSite, [ Validators.required ]],
  groundFloorLevel : [this.selectedLevel.groundFloorLevel, [ Validators.required ]],
  regionalCenterCode : [this.selectedLevel.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedLevel.branchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.levelService.create(this.levelForm.value)
        .pipe(switchMap(x => {
			return this.levelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.levelForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
