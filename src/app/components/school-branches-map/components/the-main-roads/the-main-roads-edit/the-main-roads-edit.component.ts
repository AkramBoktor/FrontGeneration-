
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TheMainRoads } from 'app/shared/models/the-main-roads';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TheMainRoadsService } from '../shared/the-main-roads.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-main-roads-edit',
  templateUrl: './the-main-roads-edit.component.html',
  styleUrls: ['./the-main-roads-edit.component.scss'],
  providers: []
})

export class TheMainRoadsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheMainRoads: TheMainRoads;
  theMainRoadsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionStatusCodesService: LookupService;
private directionCodesService: LookupService;

  
centerCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadStatusCodeSelectOptions: MaterialSelectOptions;
movementDirectionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centerCode', { static: true }) CenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadStatusCode', { static: true }) MainRoadStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('movementDirectionCode', { static: true }) MovementDirectionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheMainRoadsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheMainRoadsEditComponent>,
    public theMainRoadsService: TheMainRoadsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheMainRoads = new TheMainRoads();
    this.selectedTheMainRoads = this.selectedTheMainRoadsDialog.data || this.selectedTheMainRoads;

    
	this.centerCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.mainRoadStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الطريق الرئيسي',
	});

	this.movementDirectionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود اتجاه الحركة',
	});


    this.theMainRoadsForm = this.formBuilder.group({
      
  id : [this.selectedTheMainRoads.id],
  buildingCode : [this.selectedTheMainRoads.buildingCode, [ Validators.required ]],
  mainRoadNumber : [this.selectedTheMainRoads.mainRoadNumber, [ Validators.required ]],
  roadWidth : [this.selectedTheMainRoads.roadWidth, [ Validators.required ]],
  usage : [this.selectedTheMainRoads.usage, [ Validators.required ]],
  theNameOfTheRoad : [this.selectedTheMainRoads.theNameOfTheRoad, [ Validators.required ]],
  centerCode : [this.selectedTheMainRoads.centerCode, [ Validators.required ]],
  branchCode : [this.selectedTheMainRoads.branchCode, [ Validators.required ]],
  mainRoadStatusCode : [this.selectedTheMainRoads.mainRoadStatusCode, [ Validators.required ]],
  movementDirectionCode : [this.selectedTheMainRoads.movementDirectionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.theMainRoadsService.update(this.theMainRoadsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.theMainRoadsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.theMainRoadsForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionStatusCodesService = new LookupService('directionstatuscodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}
