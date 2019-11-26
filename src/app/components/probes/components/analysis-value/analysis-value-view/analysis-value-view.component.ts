
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AnalysisValue } from 'app/shared/models/analysis-value';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AnalysisValueService } from '../shared/analysis-value.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-analysis-value-view',
  templateUrl: './analysis-value-view.component.html',
  styleUrls: ['./analysis-value-view.component.scss'],
  providers: []
})

export class AnalysisValueViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAnalysisValue: AnalysisValue;
  analysisValueForm: FormGroup;

  private firstLevelCodesService: LookupService;

  
firstLevelCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAnalysisValueDialog: any,
    @Optional() public dialogRef: MatDialogRef<AnalysisValueViewComponent>,
    public analysisValueService: AnalysisValueService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnalysisValue = this.selectedAnalysisValueDialog.data || this.selectedAnalysisValue;

    
	this.firstLevelCodeSelectOptions = new MaterialSelectOptions({
	 data: this.firstLevelCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستوى الاول',
	});


    this.analysisValueForm = this.formBuilder.group({
      
  schoolName : [this.selectedAnalysisValue.schoolName],
  sensorsNumber : [this.selectedAnalysisValue.sensorsNumber],
  sensorsDate : [this.selectedAnalysisValue.sensorsDate],
  primaryGroundwaterLevel : [this.selectedAnalysisValue.primaryGroundwaterLevel],
  finalGroundwaterLevel : [this.selectedAnalysisValue.finalGroundwaterLevel],
  layerNumber : [this.selectedAnalysisValue.layerNumber],
  endOfLayerDepth : [this.selectedAnalysisValue.endOfLayerDepth],
  selectionLevel : [this.selectedAnalysisValue.selectionLevel],
  secondLevelCode : [this.selectedAnalysisValue.secondLevelCode],
  thirdLevelCode : [this.selectedAnalysisValue.thirdLevelCode],
  firstLevelCode : [this.selectedAnalysisValue.firstLevelCode]
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
    return this.analysisValueForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.analysisValueForm.controls)) {
      this.analysisValueForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.firstLevelCodesService = new LookupService('firstlevelcodes', this.http);
  }
}

