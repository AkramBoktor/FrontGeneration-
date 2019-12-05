
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BarrierDataForThePlotOfLand } from 'app/shared/models/barrier-data-for-the-plot-of-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BarrierDataForThePlotOfLandService } from '../shared/barrier-data-for-the-plot-of-land.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-barrier-data-for-the-plot-of-land-edit',
  templateUrl: './barrier-data-for-the-plot-of-land-edit.component.html',
  styleUrls: ['./barrier-data-for-the-plot-of-land-edit.component.scss'],
  providers: []
})

export class BarrierDataForThePlotOfLandEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBarrierDataForThePlotOfLand: BarrierDataForThePlotOfLand;
  barrierDataForThePlotOfLandForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private obstacleCodesService: LookupService;

  
obstacleCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('obstacleCode', { static: true }) ObstacleCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBarrierDataForThePlotOfLandDialog: any,
    @Optional() public dialogRef: MatDialogRef<BarrierDataForThePlotOfLandEditComponent>,
    public barrierDataForThePlotOfLandService: BarrierDataForThePlotOfLandService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBarrierDataForThePlotOfLand = new BarrierDataForThePlotOfLand();
    this.selectedBarrierDataForThePlotOfLand = this.selectedBarrierDataForThePlotOfLandDialog.data || this.selectedBarrierDataForThePlotOfLand;

    
	this.obstacleCodeSelectOptions = new MaterialSelectOptions({
	 data: this.obstacleCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العائق',
	});


    this.barrierDataForThePlotOfLandForm = this.formBuilder.group({
      
  id : [this.selectedBarrierDataForThePlotOfLand.id],
  landID : [this.selectedBarrierDataForThePlotOfLand.landID, [ Validators.required ]],
  obstacleCode : [this.selectedBarrierDataForThePlotOfLand.obstacleCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.barrierDataForThePlotOfLandService.update(this.barrierDataForThePlotOfLandForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.barrierDataForThePlotOfLandService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.barrierDataForThePlotOfLandForm.get(name);
  }

  initializeLookupServices() {
    this.obstacleCodesService = new LookupService('obstaclecodes', this.http);
  }
}
