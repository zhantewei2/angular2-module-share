

app.module:

	import {ZTWScrollModule} from './ztw-scroll.module';
	imports:[ZTWScrollModule];

use it as follow:	
component:
/<div  ztwScrollBind
	div style='height:600px' ztwScrollControl (leaved)='fn2($event)' (scrolled)='fn1($event)'>one</div>
	div style='height:800px' ztwScrollControl (leaved)='fn2($event)' (scrolled)='fn1($event)'>two</div>
	<div style='height:500px' ztwScrollControl (leaved)='fn2($event)' (scrolled)='fn1($event)'>three</div>
</div>
