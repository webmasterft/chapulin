$(function(){
	var palabra = ["defenderme" , "defendernos"],
		palabraIngresada='',
		menu = $('#menu');
		corazon = '<i class="fa fa-fw"></i>';
		

	$('#pt-main #ingresar').on('click',function() {
		/* Act on the event */
		palabraIngresada = $.trim($('input#frase').val().toLowerCase());
nextPage();
		if (palabraIngresada == ""){
			console.log('ingresa algo');
		}
		
		if($.inArray(palabraIngresada, palabra ) != -1){
			nextPage();
		}
	});//ingresar click


menu.find('li').on("mouseenter mouseleave click", function(e){
   var idMenu = $(this).data('menu');
   if(e.type === "mouseenter"){
       $('#chapulin').stop().hide();
       $('div#'+idMenu).stop().fadeIn();
   }else if(e.type === "mouseleave"){
        $('#chapulin').stop().fadeIn();  
        $('div#'+idMenu).stop().fadeOut();     
   }else{
   	nextPage();
   }
});//menu events



/* ANIMACION PAGINAS*/
//var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		$iterate = $( '#iterateEffects' ),
		//animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed('animation')],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {
		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );

		$iterate.on( 'click', function() {
			nextPage( );
		} );
	}

	function nextPage( animation ) {

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );

		if( current < pagesCount - 1 ) {
			++current;
		}
		else {
			current = 0;
		}

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';
			outClass = 'pt-page-rotateFall pt-page-ontop';
			inClass = 'pt-page-scaleUp';

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { init : init };

//})();
/* ANIMACION PAGINAS*/

});