
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Level } from 'app/shared/models/level';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LevelService } from '../shared/level.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-level-edit',
  templateUrl: './level-edit.component.html',
  styleUrls: ['./level-edit.component.scss'],
  providers: []
})

export class LevelEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLevel: Level;
  levelForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private regionalCenterCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
regionalCenterCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLevelDialog: any,
    @Optional() public dialogRef: MatDialogRef<LevelEditComponent>,
    public levelService: LevelService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLevel = new Level();
    this.selectedLevel = this.selectedLevelDialog.data || this.selectedLevel;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});


    this.levelForm = this.formBuilder.group({
      
  id : [this.selectedLevel.id],
  buildingCode : [this.selectedLevel.buildingCode, [ Validators.required ]],
  westernCourtyardLevel : [this.selectedLevel.westernCourtyardLevel, [ Validators.required ]],
  easternCourtyardLevel : [this.selectedLevel.easternCourtyardLevel, [ Validators.required ]],
  southernCourtyardLevel : [this.selectedLevel.southernCourtyardLevel, [ Validators.required ]],
  northernCourtyardLevel : [this.selectedLevel.northernCourtyardLevel, [ Validators.required ]],
  southWestStreetLevel : [this.selectedLevel.southWestStreetLevel, [ Validators.required ]],
  southEastStreetLevel : [this.selectedLevel.southEastStreetLevel, [ Validators.required ]],
  northWestStreetLevel : [this.selectedLevel.northWestStreetLevel, [ Validators.required ]],
  courtyardLevelWithinSite : [this.selectedLevel.courtyardLevelWithinSite, [ Validators.required ]],
  northEastStreetLevel : [this.selectedLevel.northEastStreetLevel, [ Validators.required ]],
  easternStreetLevel : [this.selectedLevel.easternStreetLevel, [ Validators.required ]],
  southernStreetLevel : [this.selectedLevel.southernStreetLevel, [ Validators.required ]],
  northernStreetLevel : [this.selectedLevel.northernStreetLevel, [ Validators.required ]],
  mainRoadLevel : [this.selectedLevel.mainRoadLevel, [ Validators.required ]],
  extensionNumber : [this.selectedLevel.extensionNumber, [ Validators.required ]],
  westernStreetLevel : [this.selectedLevel.westernStreetLevel, [ Validators.required ]],
  groundFloorLevel : [this.selectedLevel.groundFloorLevel, [ Validators.required ]],
  branchCode : [this.selectedLevel.branchCode, [ Validators.required ]],
  regionalCenterCode : [this.selectedLevel.regionalCenterCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.levelService.update(this.levelForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.levelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.levelForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
  }
}
