
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TheMainRoads } from 'app/shared/models/the-main-roads';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TheMainRoadsService } from '../shared/the-main-roads.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-main-roads-view',
  templateUrl: './the-main-roads-view.component.html',
  styleUrls: ['./the-main-roads-view.component.scss'],
  providers: []
})

export class TheMainRoadsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheMainRoads: TheMainRoads;
  theMainRoadsForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionStatusCodesService: LookupService;
private directionCodesService: LookupService;

  
centerCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadStatusCodeSelectOptions: MaterialSelectOptions;
movementDirectionCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheMainRoadsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheMainRoadsViewComponent>,
    public theMainRoadsService: TheMainRoadsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedTheMainRoads.buildingCode],
  mainRoadNumber : [this.selectedTheMainRoads.mainRoadNumber],
  roadWidth : [this.selectedTheMainRoads.roadWidth],
  usage : [this.selectedTheMainRoads.usage],
  theNameOfTheRoad : [this.selectedTheMainRoads.theNameOfTheRoad],
  centerCode : [this.selectedTheMainRoads.centerCode],
  branchCode : [this.selectedTheMainRoads.branchCode],
  mainRoadStatusCode : [this.selectedTheMainRoads.mainRoadStatusCode],
  movementDirectionCode : [this.selectedTheMainRoads.movementDirectionCode]
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
    return this.theMainRoadsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.theMainRoadsForm.controls)) {
      this.theMainRoadsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionStatusCodesService = new LookupService('directionstatuscodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}

