
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BarrierDataForThePlotOfLand } from 'app/shared/models/barrier-data-for-the-plot-of-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BarrierDataForThePlotOfLandService } from '../shared/barrier-data-for-the-plot-of-land.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-barrier-data-for-the-plot-of-land-new',
  templateUrl: './barrier-data-for-the-plot-of-land-new.component.html',
  styleUrls: ['./barrier-data-for-the-plot-of-land-new.component.scss'],
  providers: [
    ]
})

export class BarrierDataForThePlotOfLandNewComponent extends AppBaseComponent implements OnInit {
  barrierDataForThePlotOfLandForm: FormGroup;
  @Input() selectedBarrierDataForThePlotOfLand: BarrierDataForThePlotOfLand;
  errorMessages: FormControlError[] = [
        
  ];

  private obstacleCodesService: LookupService;

  
obstacleCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('obstacleCode', { static: true }) ObstacleCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BarrierDataForThePlotOfLandNewComponent>,
    public barrierDataForThePlotOfLandService: BarrierDataForThePlotOfLandService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBarrierDataForThePlotOfLand = new BarrierDataForThePlotOfLand();

    
	this.obstacleCodeSelectOptions = new MaterialSelectOptions({
	 data: this.obstacleCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العائق',
	});


    this.barrierDataForThePlotOfLandForm = this.formBuilder.group({
     
  id : [0],
  landID : [this.selectedBarrierDataForThePlotOfLand.landID, [ Validators.required ]],
  obstacleCode : [this.selectedBarrierDataForThePlotOfLand.obstacleCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.barrierDataForThePlotOfLandService.create(this.barrierDataForThePlotOfLandForm.value)
        .pipe(switchMap(x => {
			return this.barrierDataForThePlotOfLandService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.barrierDataForThePlotOfLandForm.get(name);
    }

  initializeLookupServices() {
    this.obstacleCodesService = new LookupService('obstaclecodes', this.http);
  }
 }
