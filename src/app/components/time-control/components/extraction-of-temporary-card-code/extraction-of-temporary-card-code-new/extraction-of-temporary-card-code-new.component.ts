
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExtractionOfTemporaryCardCode } from 'app/shared/models/extraction-of-temporary-card-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExtractionOfTemporaryCardCodeService } from '../shared/extraction-of-temporary-card-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-extraction-of-temporary-card-code-new',
  templateUrl: './extraction-of-temporary-card-code-new.component.html',
  styleUrls: ['./extraction-of-temporary-card-code-new.component.scss'],
  providers: [
    ]
})

export class ExtractionOfTemporaryCardCodeNewComponent extends AppBaseComponent implements OnInit {
  extractionOfTemporaryCardCodeForm: FormGroup;
  @Input() selectedExtractionOfTemporaryCardCode: ExtractionOfTemporaryCardCode;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private cardCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
cardCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('cardCode', { static: true }) CardCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExtractionOfTemporaryCardCodeNewComponent>,
    public extractionOfTemporaryCardCodeService: ExtractionOfTemporaryCardCodeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExtractionOfTemporaryCardCode = new ExtractionOfTemporaryCardCode();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.cardCodeSelectOptions = new MaterialSelectOptions({
	 data: this.cardCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الكارت',
	});


    this.extractionOfTemporaryCardCodeForm = this.formBuilder.group({
     
  id : [0],
  temporaryCardNumber : [this.selectedExtractionOfTemporaryCardCode.temporaryCardNumber, [ Validators.required ]],
  temporaryNumberIssuing : [this.selectedExtractionOfTemporaryCardCode.temporaryNumberIssuing, [ Validators.required ]],
  branchCode : [this.selectedExtractionOfTemporaryCardCode.branchCode, [ Validators.required ]],
  cardCode : [this.selectedExtractionOfTemporaryCardCode.cardCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.extractionOfTemporaryCardCodeService.create(this.extractionOfTemporaryCardCodeForm.value)
        .pipe(switchMap(x => {
			return this.extractionOfTemporaryCardCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.extractionOfTemporaryCardCodeForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.cardCodesService = new LookupService('cardcodes', this.http);
  }
 }
