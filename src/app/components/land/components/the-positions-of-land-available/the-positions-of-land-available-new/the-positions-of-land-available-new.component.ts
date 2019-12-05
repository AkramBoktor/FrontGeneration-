
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ThePositionsOfLandAvailable } from 'app/shared/models/the-positions-of-land-available';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ThePositionsOfLandAvailableService } from '../shared/the-positions-of-land-available.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-positions-of-land-available-new',
  templateUrl: './the-positions-of-land-available-new.component.html',
  styleUrls: ['./the-positions-of-land-available-new.component.scss'],
  providers: [
    ]
})

export class ThePositionsOfLandAvailableNewComponent extends AppBaseComponent implements OnInit {
  thePositionsOfLandAvailableForm: FormGroup;
  @Input() selectedThePositionsOfLandAvailable: ThePositionsOfLandAvailable;
  errorMessages: FormControlError[] = [
        
  ];

  private documentCodesService: LookupService;

  
documentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('documentCode', { static: true }) DocumentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ThePositionsOfLandAvailableNewComponent>,
    public thePositionsOfLandAvailableService: ThePositionsOfLandAvailableService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThePositionsOfLandAvailable = new ThePositionsOfLandAvailable();

    
	this.documentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستند',
	});


    this.thePositionsOfLandAvailableForm = this.formBuilder.group({
     
  id : [0],
  projectCode : [this.selectedThePositionsOfLandAvailable.projectCode, [ Validators.required ]],
  documentCode : [this.selectedThePositionsOfLandAvailable.documentCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.thePositionsOfLandAvailableService.create(this.thePositionsOfLandAvailableForm.value)
        .pipe(switchMap(x => {
			return this.thePositionsOfLandAvailableService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.thePositionsOfLandAvailableForm.get(name);
    }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
  }
 }
