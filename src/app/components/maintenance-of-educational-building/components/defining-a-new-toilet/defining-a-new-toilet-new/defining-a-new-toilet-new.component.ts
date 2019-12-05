
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DefiningANewToilet } from 'app/shared/models/defining-a-new-toilet';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DefiningANewToiletService } from '../shared/defining-a-new-toilet.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-defining-a-new-toilet-new',
  templateUrl: './defining-a-new-toilet-new.component.html',
  styleUrls: ['./defining-a-new-toilet-new.component.scss'],
  providers: [
    ]
})

export class DefiningANewToiletNewComponent extends AppBaseComponent implements OnInit {
  definingANewToiletForm: FormGroup;
  @Input() selectedDefiningANewToilet: DefiningANewToilet;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DefiningANewToiletNewComponent>,
    public definingANewToiletService: DefiningANewToiletService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDefiningANewToilet = new DefiningANewToilet();

    

    this.definingANewToiletForm = this.formBuilder.group({
     
  id : [0],
  toiletCode : [this.selectedDefiningANewToilet.toiletCode, [ Validators.required ]],
  toiletModel : [this.selectedDefiningANewToilet.toiletModel, [ Validators.required ]],
  productionDate : [this.selectedDefiningANewToilet.productionDate, [ Validators.required ]],
  manufacturerCode : [this.selectedDefiningANewToilet.manufacturerCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.definingANewToiletService.create(this.definingANewToiletForm.value)
        .pipe(switchMap(x => {
			return this.definingANewToiletService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.definingANewToiletForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
