

app.module:

	import {ZTWScrollModule} from './ztw-scroll.module';
	imports:[ZTWScrollModule];

use it as follow:	
component:

	<ztwScroll [(ngModel)]='scrollValue'>
	<div  value='1' ztwScrollControl>one</div>
	<div  value='2' ztwScrollControl>two</div>	
	<div  value='3' ztwScrollControl>three</div>
	</ztwScroll>
	<button (click)='scrollValue='2''> goto2</button>

when body.scrollTop scrolled control,you can get scrollValue that the value of control.value;

set scrollValue，will touch window.scrollTo();
***

	<ztwScroll [throttleTime]='100' [baseLine]='50' [(ngModel)]='scrollValue'>
If you want scrolled your navBar which is fixed on the top,you can set `baseLine`;

The  default value of the `throttleTime`  is 0;

***


	<ztwScroll [(ngModel)]='scrollValue'>
		<div value='2' > two</div>
		<div value='1' over='bottom'>one </div>
	</ztwScroll>
	
set `over` to `bottom`,when body.scrollBottom scrolled control;


***
	
