import {Directive,Input} from '@angular/core';
import {ScrollService} from './scroll.service';
@Directive({
	selector:'[ztwScrollBind]'
})
export class ScrollDirective{
	@Input('ztwScrollBind')baseLine:number;
	constructor(
		private scrollService:ScrollService
	){
		window.addEventListener('scroll',()=>{
			let topNum=document.querySelector('body').scrollTop;
			let nodes=scrollService.controlNodes;
			if(nodes===[])return;
			this.baseLine=this.baseLine||0;
			nodes.forEach(node=>{
				let top=scrollService.getAbsoluteTop(node)-this.baseLine;
				node.ztw_top=top;
				node.ztw_bottom=top+node.offsetHeight;
			})
			scrollService.scrollTop.next(topNum);
		});
	}
}
