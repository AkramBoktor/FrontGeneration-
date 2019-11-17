
import { Component, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Disclaimer } from 'app/shared/models/disclaimer';
import { switchMap } from 'rxjs/operators';
import { DisclaimerService } from '../shared/disclaimer.service';


@Component({
  selector: 'app-disclaimer-new',
  templateUrl: './disclaimer-new.component.html',
  styleUrls: ['./disclaimer-new.component.scss'],
  providers: [
    ]
})

export class DisclaimerNewComponent extends AppBaseComponent implements OnInit {
  disclaimerForm: FormGroup;
  @Input() selectedDisclaimer: Disclaimer;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DisclaimerNewComponent>,
    public disclaimerService: DisclaimerService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDisclaimer = new Disclaimer();

    

    this.disclaimerForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedDisclaimer.employeeCode, [ Validators.required ]],
  disclaimerDate : [this.selectedDisclaimer.disclaimerDate, [ Validators.required ]],
  employeeName : [this.selectedDisclaimer.employeeName, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.disclaimerService.create(this.disclaimerForm.value)
        .pipe(switchMap(x => {
			return this.disclaimerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.disclaimerForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
