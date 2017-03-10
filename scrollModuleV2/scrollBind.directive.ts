import {Directive,Input,ElementRef} from '@angular/core';
@Directive({
	selector:'[ztwScrollControl]'
})
export class ScrollBindDirective{
	@Input('value')value:any;
	constructor(
		private el:ElementRef
		){	}
}
