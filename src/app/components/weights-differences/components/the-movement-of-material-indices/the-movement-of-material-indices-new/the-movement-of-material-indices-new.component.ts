
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TheMovementOfMaterialIndices } from 'app/shared/models/the-movement-of-material-indices';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheMovementOfMaterialIndicesService } from '../shared/the-movement-of-material-indices.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-movement-of-material-indices-new',
  templateUrl: './the-movement-of-material-indices-new.component.html',
  styleUrls: ['./the-movement-of-material-indices-new.component.scss'],
  providers: [
    ]
})

export class TheMovementOfMaterialIndicesNewComponent extends AppBaseComponent implements OnInit {
  theMovementOfMaterialIndicesForm: FormGroup;
  @Input() selectedTheMovementOfMaterialIndices: TheMovementOfMaterialIndices;
  errorMessages: FormControlError[] = [
        
  ];

  private elementsService: LookupService;

  
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TheMovementOfMaterialIndicesNewComponent>,
    public theMovementOfMaterialIndicesService: TheMovementOfMaterialIndicesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheMovementOfMaterialIndices = new TheMovementOfMaterialIndices();

    
	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.theMovementOfMaterialIndicesForm = this.formBuilder.group({
     
  id : [0],
  startDateForMovement : [this.selectedTheMovementOfMaterialIndices.startDateForMovement, [ Validators.required ]],
  endDateForMovement : [this.selectedTheMovementOfMaterialIndices.endDateForMovement, [ Validators.required ]],
  standardNumber : [this.selectedTheMovementOfMaterialIndices.standardNumber, [ Validators.required ]],
  elementCode : [this.selectedTheMovementOfMaterialIndices.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.theMovementOfMaterialIndicesService.create(this.theMovementOfMaterialIndicesForm.value)
        .pipe(switchMap(x => {
			return this.theMovementOfMaterialIndicesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.theMovementOfMaterialIndicesForm.get(name);
    }

  initializeLookupServices() {
    this.elementsService = new LookupService('elements', this.http);
  }
 }
