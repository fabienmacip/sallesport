import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseInput]'
})

export class UppercaseInputDirective {

  constructor(
    private control: NgControl
  ) { }

  @HostListener('input', ['$event']) onInputChange($event: any){
    console.log('before');
    if(this.control){
      console.log('into');
      this.control.control?.setValue($event.target.value.toUpperCase());
    }
    console.log('after');
  }
}
