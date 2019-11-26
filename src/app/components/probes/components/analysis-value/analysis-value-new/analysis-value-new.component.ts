
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AnalysisValue } from 'app/shared/models/analysis-value';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AnalysisValueService } from '../shared/analysis-value.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-analysis-value-new',
  templateUrl: './analysis-value-new.component.html',
  styleUrls: ['./analysis-value-new.component.scss'],
  providers: [
    ]
})

export class AnalysisValueNewComponent extends AppBaseComponent implements OnInit {
  analysisValueForm: FormGroup;
  @Input() selectedAnalysisValue: AnalysisValue;
  errorMessages: FormControlError[] = [
        
  ];

  private firstLevelCodesService: LookupService;

  
firstLevelCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('firstLevelCode', { static: true }) FirstLevelCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AnalysisValueNewComponent>,
    public analysisValueService: AnalysisValueService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnalysisValue = new AnalysisValue();

    
	this.firstLevelCodeSelectOptions = new MaterialSelectOptions({
	 data: this.firstLevelCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستوى الاول',
	});


    this.analysisValueForm = this.formBuilder.group({
     
  id : [0],
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
    this.analysisValueService.create(this.analysisValueForm.value)
        .pipe(switchMap(x => {
			return this.analysisValueService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.analysisValueForm.get(name);
    }

  initializeLookupServices() {
    this.firstLevelCodesService = new LookupService('firstlevelcodes', this.http);
  }
 }
