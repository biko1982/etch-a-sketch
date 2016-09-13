var gridSize = $('.grid').width();
var pixels = 16;
var pixelsMax = 64;

function removeOldGrid(){
      //$('.pixel').remove(); is obsolete, emptying div is more efficient than searching all pixels and removing them
      $('.grid').html('');
    }
//pixelsize in %
function createGrid(p) {
  var pixelSize = 100 / p ;
  
  var grid = $(".grid").html("");
    for (var j = 0; j < p; j++) {
      for (var i = 0; i < p; i++) {
        grid.append( $("<div></div>").addClass("pixel").css('border', 'none').height(pixelSize + '%').width(pixelSize + '%') );
      }
      grid.append($("<div></div>").addClass("clear"));
    }
}
/*
function createGrid(p) {
  var pixelSize = ( gridSize - ( 2 * p ) ) / p ;
  //Some primes and uneven multiples thereof screw up the grid, due to calculation errors browser. This is an ugly fix, but works
  if(p % 7 === 0 || p % 13 === 0 || p % 19 === 0 || p % 37 === 0 || p % 41 === 0 || p % 43 === 0 || p % 47 === 0 || p % 53 === 0 ){
    pixelSize -= 0.1;
  }
  var grid = $(".grid").html("");
    for (var j = 0; j < p; j++) {
      for (var i = 0; i < p; i++) {
        grid.append( $("<div></div>").addClass("pixel").height(pixelSize).width(pixelSize) );
      }
      grid.append($("<div></div>").addClass("clear"));
    }
}
*/
 
function newRGBA(bg){
  var a=bg.slice(4).split(',');
  var newAlpha = parseFloat(a[3]) + 0.1;
  var newBg='rgba'+a[0]+','+parseFloat(a[1])+','+parseFloat(a[2])+','+newAlpha+')';
  return newBg;

}
var newGrid = function(){
  var p = prompt('Please enter a size for the grid (2-' + pixelsMax + '):');
  if(p > pixelsMax || p < 2){
    newGrid();
  }else{
    removeOldGrid();
    createGrid(p);
  }
}
function cleanSlate(){
  $('.pixel').removeClass('pixelDark').css("background-color", "").unbind();
}
function pixelate(){
  $('.pixel').on('mouseenter', function(){
    $(this).addClass('pixelDark');
  })
}

function opacity(){
  $('.pixel').on('mouseenter', function(){
    var newOpacity = newRGBA($(this).css('background-color'));
    $(this).css('backgroundColor', newOpacity);
  })
}

function trail(){
  $('.pixel').on('mouseleave', function(){
    $(this).removeClass('pixelDark', 300);
    })
}

function randomColor(){
    var R = Math.floor(Math.random()*256);
    var G = Math.floor(Math.random()*256);
    var B = Math.floor(Math.random()*256);
    return 'rgb(' + R + ',' + G + ',' + B + ')';

}

function shakeIt(){
        $('.grid').effect('shake');
        cleanSlate();
}

$('#newGrid').on('click', function(){
  newGrid();
  pixelate();
})

$('#pixelate').on('click', function(){
  cleanSlate();
  pixelate();
})

$('#opacity').on('click', function(){
  cleanSlate();
  opacity();
})

$('#trail').on('click', function(){
  cleanSlate();
  pixelate();
  trail();
})

$('#random').on('click', function(){
  cleanSlate();
  $('.pixel').on('mouseenter', function(){
    $(this).css('background-color', randomColor());
  })

})


$('#shakeIt').on('click', function(){
  shakeIt();
})


$(document).ready(function(){


  createGrid(pixels);
  pixelate();

})
