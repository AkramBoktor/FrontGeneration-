
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TheCodesAndNamesOfTheCases } from 'app/shared/models/the-codes-and-names-of-the-cases';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheCodesAndNamesOfTheCasesService } from '../shared/the-codes-and-names-of-the-cases.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-codes-and-names-of-the-cases-new',
  templateUrl: './the-codes-and-names-of-the-cases-new.component.html',
  styleUrls: ['./the-codes-and-names-of-the-cases-new.component.scss'],
  providers: [
    ]
})

export class TheCodesAndNamesOfTheCasesNewComponent extends AppBaseComponent implements OnInit {
  theCodesAndNamesOfTheCasesForm: FormGroup;
  @Input() selectedTheCodesAndNamesOfTheCases: TheCodesAndNamesOfTheCases;
  errorMessages: FormControlError[] = [
        
  ];

  private statusCodesService: LookupService;

  
statusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('statusCode', { static: true }) StatusCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TheCodesAndNamesOfTheCasesNewComponent>,
    public theCodesAndNamesOfTheCasesService: TheCodesAndNamesOfTheCasesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheCodesAndNamesOfTheCases = new TheCodesAndNamesOfTheCases();

    
	this.statusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الحاله ',
	});


    this.theCodesAndNamesOfTheCasesForm = this.formBuilder.group({
     
  id : [0],
  statusName : [this.selectedTheCodesAndNamesOfTheCases.statusName, [ Validators.required ]],
  statusCode : [this.selectedTheCodesAndNamesOfTheCases.statusCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.theCodesAndNamesOfTheCasesService.create(this.theCodesAndNamesOfTheCasesForm.value)
        .pipe(switchMap(x => {
			return this.theCodesAndNamesOfTheCasesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.theCodesAndNamesOfTheCasesForm.get(name);
    }

  initializeLookupServices() {
    this.statusCodesService = new LookupService('statuscodes', this.http);
  }
 }
