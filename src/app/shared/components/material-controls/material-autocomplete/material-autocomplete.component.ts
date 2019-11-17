import { Component, OnInit, Optional, Self, ViewChild, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatInput } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Observable, isObservable } from 'rxjs';
import { AutoCompleteWithCode } from 'app/shared/models/controls/interfaces';

@Component({
  selector: 'app-material-autocomplete',
  templateUrl: './material-autocomplete.component.html',
  styleUrls: ['./material-autocomplete.component.scss']
})
export class MaterialAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input() options: MaterialSelectOptions;
  @ViewChild('matAutoCompleteInput', { static: true }) matAutoCompleteInput: MatInput;
  matCodeInput = new FormControl();

  filteredDatasource: AutoCompleteWithCode[];
  datasource: AutoCompleteWithCode[] = [];

  initialValue: string; // ## id

  selectedName: string;

  constructor(@Self() @Optional() public control: NgControl) {
    if (this.control != null) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.populateList(this.options.data);
    
    if (this.options.disabled || this.control.disabled) {
      this.matAutoCompleteInput.disabled = true;
      this.matCodeInput.disable();
    }

    this.matAutoCompleteInput.errorStateMatcher = {
      isErrorState: () => {
        return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
      }
    };
  }

  onCodeChanged(value: string) {
    this.filterByCode(value);

    if (value === '') {
      this.matCodeInput.setErrors(null);
      this.selectedName = '';
      this.matAutoCompleteInput.value = this.selectedName;
      this.applyPropagateChange(null);
    }
    else if (this.filteredDatasource.length === 0) {
      this.matCodeInput.setErrors({ undefinedCode: true });
      this.selectedName = '';
      this.matAutoCompleteInput.value = this.selectedName;
      this.applyPropagateChange(null);
    }
    else {
      this.matCodeInput.setErrors(null);
      this.selectedName = this.filteredDatasource[0].name;
      this.matAutoCompleteInput.value = this.selectedName;
      this.applyPropagateChange(this.filteredDatasource[0].code); // ## id
    }
  }

  // filter autocomplete with each key input
  onAutoCompleteInput(value) {
    this.filter(value);
  }

  onSelectionChanged(value: AutoCompleteWithCode) {
    this.selectedName = value.name;
    this.filter(value);
    this.matCodeInput.setValue(value.code);
    this.applyPropagateChange(value.code); // ## id
  }

  populateList(dataSource: Observable<any[]> | any[]) {
    if (isObservable(dataSource)) {
      dataSource.subscribe(data => {
        this.datasource = data;
        this.initialize();
      });
    } else {
      this.datasource = dataSource ? dataSource : [];
      this.initialize();
    }
  }

  private initialize() {
      const value = this.datasource.find(f => f.code === this.initialValue); // ## id
      this.selectedName = value ? value.name || '' : '';
      this.matAutoCompleteInput.value = this.selectedName;
      this.matCodeInput.setValue(value ? value.code : '');
      this.filter(this.selectedName); 
  }

  private filter(value: any): void {
    let filterValue;
    if (typeof (value) === 'string') {
      value = value || '';
      filterValue = value.toLowerCase();
    } else {
      filterValue = value ? value.name.toLowerCase() || '' : '';
    }
    this.filteredDatasource = this.datasource.filter(data => data.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterByCode(value: any): void {
    value = value || '';
    this.filteredDatasource = value.length > 0 ?
      this.datasource.filter(data => data.code.toLowerCase() === value.toLowerCase()) :
      this.datasource;
  }
  // -------------------------------------- //
  private applyPropagateChange(value: any) {
    this.propagateChange(value);
    this.matAutoCompleteInput.updateErrorState();
  }

  private propagateChange = (_: any) => { };
  private propagateTouched = () => { };

  writeValue(code: string): void { // ## id
    this.initialValue = code;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // this.matAutoCompleteInput.disabled = this.options.disabled; // disabled = isDisabled;
  }

  onTouched() {
    if (this.matAutoCompleteInput.value !== this.selectedName) {
      this.matAutoCompleteInput.value = this.selectedName;
    }
    this.propagateTouched();
    this.matAutoCompleteInput.updateErrorState();
  }

  getDisplayName(option) {
    return option ? option.name : '';
  }

  get errorState() {
    return this.control.errors !== null && !!this.control.touched;
  }
}
