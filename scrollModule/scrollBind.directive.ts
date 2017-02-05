import {Directive,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import {ScrollService} from './scroll.service';
@Directive({
	selector:'[ztwScrollControl]'
})
export class ScrollBindDirective{
	@Input('ScrollBind')node:string; 
	@Output() scrolled=new EventEmitter;
	@Output() leaved=new EventEmitter;
	constructor(
		private el:ElementRef,
		private scrollService:ScrollService
		){	}
	ngAfterViewInit(){
		let node=this.el.nativeElement;
		this.scrollService.controlNodes.push(node);
		let sendOnece=true,scrolled=false;
		let sendObj={target:node};
		this.scrollService.scrollTop.subscribe(v=>{
			if(!node.ztw_top) return;
			if(v>node.ztw_top&&v<node.ztw_bottom){
				if(!sendOnece)return ;
				this.scrolled.emit(sendObj);
				sendOnece=false;
				scrolled=true;
			}else{
				if(!scrolled) return;
				this.leaved.emit(sendObj);
				scrolled=false;
				sendOnece=true;
			}
		})
	}


}