
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BarrierDataForThePlotOfLand } from 'app/shared/models/barrier-data-for-the-plot-of-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BarrierDataForThePlotOfLandService } from '../shared/barrier-data-for-the-plot-of-land.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-barrier-data-for-the-plot-of-land-view',
  templateUrl: './barrier-data-for-the-plot-of-land-view.component.html',
  styleUrls: ['./barrier-data-for-the-plot-of-land-view.component.scss'],
  providers: []
})

export class BarrierDataForThePlotOfLandViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBarrierDataForThePlotOfLand: BarrierDataForThePlotOfLand;
  barrierDataForThePlotOfLandForm: FormGroup;

  private obstacleCodesService: LookupService;

  
obstacleCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBarrierDataForThePlotOfLandDialog: any,
    @Optional() public dialogRef: MatDialogRef<BarrierDataForThePlotOfLandViewComponent>,
    public barrierDataForThePlotOfLandService: BarrierDataForThePlotOfLandService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBarrierDataForThePlotOfLand = this.selectedBarrierDataForThePlotOfLandDialog.data || this.selectedBarrierDataForThePlotOfLand;

    
	this.obstacleCodeSelectOptions = new MaterialSelectOptions({
	 data: this.obstacleCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العائق',
	});


    this.barrierDataForThePlotOfLandForm = this.formBuilder.group({
      
  landID : [this.selectedBarrierDataForThePlotOfLand.landID],
  obstacleCode : [this.selectedBarrierDataForThePlotOfLand.obstacleCode]
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
    return this.barrierDataForThePlotOfLandForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.barrierDataForThePlotOfLandForm.controls)) {
      this.barrierDataForThePlotOfLandForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.obstacleCodesService = new LookupService('obstaclecodes', this.http);
  }
}

