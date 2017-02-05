import {Directive} from '@angular/core';
import {ScrollService} from './scroll.service';
import 'rxjs/add/observable/of';
@Directive({
	selector:'[ztwScrollBind]'
})
export class ScrollDirective{
	constructor(
		private scrollService:ScrollService
	){
		window.onscroll=function(){
			let topNum=document.querySelector('body').scrollTop;
			let nodes=scrollService.controlNodes;
			if(nodes===[])return;
			nodes.forEach(node=>{
				let top=scrollService.getAbsoluteTop(node);
				node.ztw_top=top;
				node.ztw_bottom=top+node.offsetHeight;
			})
			scrollService.scrollTop.next(topNum);
		}
	}
}