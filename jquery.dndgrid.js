(function(){

 //
    //
    // drag and drop grid element
    //
    //
    
    //sorting BY DRAG AND DROP
	var __dndgrid = {};
	__dndgrid.activate = function(elm,trigger){
		elm = $(elm);
		if(!trigger) {
			if(elm.find('.dnd-trigger').length) trigger = elm.find('.dnd-trigger');
			else trigger = elm;
		}else{
			trigger = elm.find(trigger);
		}
		
		elm.data('dndsortclone',elm.clone());
		trigger.css('cursor','move');
		$(elm).addClass('dndsortactive');
		
		trigger.off('mousedown').on('mousedown',function(e){
			
			var parent = $(this).is('.dndsortactive') ? $(this) : $(this).parents('.dndsortactive').get(0);
			var grid = $(this).parents('.dnd-grid').first();
			
			//mouse position
			var mpos = {'top':e.pageY,'left':e.pageX};
			
			//elm position
			var tpos = $(parent).offset();
			
			//scroll pos
			var scrl = {'top':$(window).scrollTop(),'left':$(window).scrollLeft()};
			
			//delta position
			var dpos = {'top':tpos.top - mpos.top - scrl.top,'left':tpos.left - mpos.left - scrl.left};			
			
			//elm dimension
			var tdim = {'width':$(parent).width(),'height':$(parent).height()};
			
			//clone elm to body
			var c = $($(parent).data('dndsortclone'));
			
			$(parent).addClass('dndobject').css('opacity',0);
			
			var o = $(parent).outerWidth() || $(parent).width();
			var p = $($(parent).parent()).outerWidth() || $($(parent).parent()).width();
			var block = (o/p) > 0.8;
			
			c.css({
				'top':(tpos.top - scrl.top)+'px',
				'left':(tpos.left - scrl.left)+'px',
				'z-index':200,
				'position':'fixed','width':tdim.width,'height':tdim.height,
				'opacity':'.8'
			}).addClass('dndclonedragged').removeClass('dndsortactive');
			
			$('body').append(c);
			
			var droparea = __dndgrid.posdim($(this).parent());
			
			$('body').off('mousemove.dndgrid')
			.on('mousemove.dndgrid',function(ev){
				
				var moupos = {'top':ev.pageY,'left':ev.pageX};
				var cc = $('.dndclonedragged');
				var ori = $('.dndobject');
				
				cc.css({
					'top' : ( moupos.top + dpos.top ) + 'px',
					'left' : ( moupos.left + dpos.left ) + 'px'
				});
				
				$('.intersected').removeClass('intersected');
				var inter = __dndgrid.check(cc,block,grid);
				if(inter.left && !inter.left.is(ori) && !inter.left.prev().is(ori)){
					inter.left.before(ori);
					ori.trigger('placed');
				}else if(inter.right && !inter.right.is(ori) && !inter.right.next().is(ori)){
					inter.right.after(ori);
					ori.trigger('placed');
				}
				
			}).off('mouseup.dndgrid')
			.on('mouseup.dndgrid',function(){
				var cc = $('.dndclonedragged');
				var ori = $('.dndobject');
				
				__dndgrid.off();
				ori.removeClass('dndobject');
				var style = ori.attr('style').replace(/opacity(\s+|)\:(\s+|)0(\;|)/,'');
				ori.attr('style',style);
				cc.detach();
				ori.trigger('dropped');
			});
			
			return false;
		});
		
	}
	
	__dndgrid.off = function(dragged){
		$('body').unbind('mouseup.dndgrid')
		.unbind('mousemove.dndgrid');
	}
	
	__dndgrid.check = function(dragged,block,grid){
		var others = $(grid).find('.dndsortactive').removeClass('intersected');
		//dragged pos and dimension
		var dposdim = __dndgrid.posdim(dragged);
		
		var left = false;
		var right = false;
		
		others.each(function(){
			
			var oposdim = __dndgrid.posdim($(this));
			
			//console.log(oposdim);
			if(block){
				
				
				do{
					
					//seaarch top
					if(dposdim.top >= oposdim.top && 
					dposdim.top < (oposdim.bottom-20)){
						left = $(this).addClass('intersected');
						break;
					}
				}while(false);
				do{
					//seaarch bottom
					if(dposdim.top <= oposdim.top && 
					dposdim.bottom > (oposdim.top+20)){
						right = $(this).addClass('intersected');
						break;
					}
				}while(false);
				
			}else{
				
				//seaarch left
				do{
					if(dposdim.left < oposdim.left && 
					dposdim.right > oposdim.left &&
					dposdim.top >= oposdim.top && 
					dposdim.top < (oposdim.bottom-20)){
						left = $(this).addClass('intersected');
						break;
					}
					
					if(dposdim.left < oposdim.left && 
					dposdim.right > oposdim.left &&
					dposdim.top <= oposdim.top && 
					dposdim.bottom > (oposdim.top+20)){
						left = $(this).addClass('intersected');
						break;
					}
				}while(false);
				
				//seaarch right
				do{
					if(dposdim.left > oposdim.left && 
					dposdim.left < oposdim.right &&
					dposdim.top >= oposdim.top && 
					dposdim.top < (oposdim.bottom-20)){
						right = $(this).addClass('intersected');
						break;
					}
					
					if(dposdim.left > oposdim.left && 
					dposdim.left < oposdim.right &&
					dposdim.top <= oposdim.top && 
					dposdim.bottom > (oposdim.top+20)){
						right = $(this).addClass('intersected');
						break;
					}
				}while(false);
				
			}
			
			if( left || right ) {return false};
			
		});
		
		return {'right':right,'left':left};
		
	}
	
	__dndgrid.posdim = function(elm){
		var p = elm.offset();
		var w = elm.outerWidth() || elm.width();
		var h = elm.outerHeight() || elm.height();
		p.bottom = p.top + h;
		p.right = p.left + w;
		p.height = h;
		p.width = w;
		return p;
	};
	
	$.fn.dndgrid = function(par){
		var trigger = false;
		
		if(par)
		trigger = typeof par.trigger == 'undefined' ? false : par.trigger;
		
		return this.each(function(){
			if($(this).data('dndgrid')) return true;
			$(this).data('dndgrid', true);
			__dndgrid.activate($(this),trigger);
		});
	};
    
	$(function(){$('.dnd-grid .dnd-gridcell').dndgrid();});

})();