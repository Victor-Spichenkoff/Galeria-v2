import $ from 'jquery'
import { onloadHtmlSucess } from '../core/includes'


const duracion = 600    

function filterByCity(city) {
    $('[wm-city]').each(function(i, element) {
        const isTarget = $(this).attr('wm-city') === city || city === null//verfica se é o mesmo que a passada ou se é nulo(mostra todos)
        if (isTarget) {
            $(this).parent().removeClass('d-none')//tira o none
            $(this).fadeIn(duracion)
        } else {
            $(this).fadeOut(duracion, () => {
                $(this).addClass('d-none')//some mesmo apos esconder
            })
            
        }
    })
}


const cityButtons = $('[wm-city-buttons')

$.fn.cityButtonsCreate = function () {
    const cities = new Set //set evita repeticoes da mesma imagem
    $('[wm-city]').each(function(i, element) {
        cities.add($(element).attr('wm-city'))
    })

    const buttons = Array.from(cities).map(city => {
        const btn = $('<button>').addClass('btn', 'btn-info').html(city)
        btn.click(e => filterByCity(city))//chama para a filtrar todos com base em CITY
    })

    const btnAll = $('<button>').addClass('btn', 'btn-info', 'active').html('Mostrar Todas').on('click',    filterByCity(null))//mostra todos
    buttons.push(btnAll)

    const btnGroup = $('<div>').addClass('btn-group')
    btnGroup.append(buttons)

    $(this).html(btnGroup)

    return this
}

onloadHtmlSucess(function() {
    $('[wm-city-buttons]').cityButtonsCreate()
})
