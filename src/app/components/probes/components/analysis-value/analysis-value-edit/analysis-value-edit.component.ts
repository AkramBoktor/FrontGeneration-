
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AnalysisValue } from 'app/shared/models/analysis-value';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AnalysisValueService } from '../shared/analysis-value.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-analysis-value-edit',
  templateUrl: './analysis-value-edit.component.html',
  styleUrls: ['./analysis-value-edit.component.scss'],
  providers: []
})

export class AnalysisValueEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAnalysisValue: AnalysisValue;
  analysisValueForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private firstLevelCodesService: LookupService;

  
firstLevelCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('firstLevelCode', { static: true }) FirstLevelCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAnalysisValueDialog: any,
    @Optional() public dialogRef: MatDialogRef<AnalysisValueEditComponent>,
    public analysisValueService: AnalysisValueService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnalysisValue = new AnalysisValue();
    this.selectedAnalysisValue = this.selectedAnalysisValueDialog.data || this.selectedAnalysisValue;

    
	this.firstLevelCodeSelectOptions = new MaterialSelectOptions({
	 data: this.firstLevelCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستوى الاول',
	});


    this.analysisValueForm = this.formBuilder.group({
      
  id : [this.selectedAnalysisValue.id],
  schoolName : [this.selectedAnalysisValue.schoolName, [ Validators.required ]],
  sensorsNumber : [this.selectedAnalysisValue.sensorsNumber, [ Validators.required ]],
  sensorsDate : [this.selectedAnalysisValue.sensorsDate, [ Validators.required ]],
  primaryGroundwaterLevel : [this.selectedAnalysisValue.primaryGroundwaterLevel, [ Validators.required ]],
  finalGroundwaterLevel : [this.selectedAnalysisValue.finalGroundwaterLevel, [ Validators.required ]],
  layerNumber : [this.selectedAnalysisValue.layerNumber, [ ]],
  endOfLayerDepth : [this.selectedAnalysisValue.endOfLayerDepth, [ Validators.required ]],
  selectionLevel : [this.selectedAnalysisValue.selectionLevel, [ Validators.required ]],
  secondLevelCode : [this.selectedAnalysisValue.secondLevelCode, [ Validators.required ]],
  thirdLevelCode : [this.selectedAnalysisValue.thirdLevelCode, [ Validators.required ]],
  firstLevelCode : [this.selectedAnalysisValue.firstLevelCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.analysisValueService.update(this.analysisValueForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.analysisValueService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.analysisValueForm.get(name);
  }

  initializeLookupServices() {
    this.firstLevelCodesService = new LookupService('firstlevelcodes', this.http);
  }
}
