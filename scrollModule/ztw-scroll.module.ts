import {NgModule} from '@angular/core';
import {ScrollDirective} from './scroll.directive';
import {ScrollService} from './scroll.service';
import {ScrollBindDirective} from './scrollBind.directive';
@NgModule({
	declarations:[
		ScrollDirective,
		ScrollBindDirective
	],
	exports:[
		ScrollDirective,
		ScrollBindDirective
	],
	providers:[ScrollService]
})
export class ZTWScrollModule{}