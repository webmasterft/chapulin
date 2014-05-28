$(function(){
	var palabra = ["defenderme" , "defendernos"],
		palabraIngresada='',
		menu = $('#menu'),
		corazon = '<i class="fa fa-fw"></i>',
		pantallaAnimacion = '',
		pantallaAnimacion = '',
	   	paginaCargar = '';
		

	$('#pt-main #ingresar').on('click',function() {
		/* Act on the event */
		palabraIngresada = $.trim($('input#frase').val().toLowerCase());
		nextPage();
		if (palabraIngresada == ""){
			console.log('ingresa algo');
		}
		if($.inArray(palabraIngresada, palabra ) != -1){
			nextPage(2);
		}
	});//ingresar click


	menu.find('li').on("mouseenter mouseleave click", function(e){
	   var idMenu = $(this).data('menu');
	   pantallaAnimacion = $(this).data('pagina');
	   idMenu = idMenu.slice(0,-1);

	   if(e.type === "mouseenter"){
	       $('#chapulin').stop().hide();
	       $('div#'+idMenu).stop().fadeIn();
	   }else if(e.type === "mouseleave"){
	        $('#chapulin').stop().fadeIn();  
	        $('div#'+idMenu).stop().fadeOut();     
	   }else{
	   		pantallaAnimacion = $(this).data('pagina');
	   		paginaCargar = $(this).data('menu');
	   		paginaCargar = 'internas/' + paginaCargar + '.html';
	   		paginaLista = cargarPaginas(paginaCargar);
	   		nextPage(pantallaAnimacion);
	   		$('.pt-page-'+ pantallaAnimacion).html(paginaLista);
	   }
	});//menu events

	$(document).on("click", "ul#menuInt li", function(){
		paginaCargar = $(this).data('menu');
		paginaCargar = 'internas/' + paginaCargar + '.html';
		paginaLista = cargarPaginas(paginaCargar);
		$('.pt-page-'+ pantallaAnimacion).html(paginaLista);
	});


	$(document).on("click", "div#personaje2 .punto", function(){
		id = $(this).data('id');
		$(this).addClass('activo');
		//if(!$(this).hasClass('activo')){
			$('#txtDescrip .panel').hide();
			$('#txtDescrip').find('#'+id).fadeIn();
		//}
	});//cambiar caracteristicas del personaje


	$(document).on("click", "div.armas .punto", function(){
		id = $(this).data('id');
		$('svg#' + id + ', div#' + id ).fadeIn();
	});//cambiar caracteristicas del personaje


/* ANIMACION PAGINAS*/
//var PageTransitions = (function() {


	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		//$iterate = $( '#iterateEffects' ),
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
			$page.data( 'originalClassList', $page.attr( 'class' ));
		});
		$pages.eq(current).addClass('pt-page-current');
	}

	//console.log($pages.eq(current));
	
	function nextPage(pantallaAnimacion) {
		if( isAnimating ) {
			return false;
		}
		isAnimating = true;
		var $currPage = $pages.eq(current);
		current = pantallaAnimacion - 2;

		var $nextPage = $pages.eq(current).addClass( 'pt-page-current' ),
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

	function onEndAnimation($outpage, $inpage) {
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

	function cargarPaginas(paginaCargar){
		var result="";
		$.ajax({
				url: paginaCargar,
				type: 'POST',
				dataType: 'html',
				async: false, 
				//data: {param1: 'value1'},
				beforeSend: function(data) {
					//console.log("success");
				},
				success: function(data) {
					result = data;
				},
				error: function(data) {
					//console.log("complete");
				}
			});//llamada ajax
		return result; 
	}
});