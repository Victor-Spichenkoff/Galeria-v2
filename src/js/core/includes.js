import $ from 'jquery'

const loadHtmlSucessCallbacks = []

export function onloadHtmlSucess(callback) {
    if(!loadHtmlSucessCallbacks.includes(callback)) {
        loadHtmlSucessCallbacks.push(callback)
    }
}



//carrega coisas com a propriedade wm-include(carrega pagianas externas por ajax)
function loadIncludes(parent) {//parent = olhar includes dentro de certa tag pai <div id="teste"><wm-incude>, passando teste, ele so olha essa div
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, element) {//pega todos com o atributo dentro dp parent
        const url = $(element).attr('wm-include')
        $.ajax({
            url,
            success(data) {
                $(element).html(data)
                $(element).removeAttr('wm-include')//tira para nao dar conflito
                
                loadHtmlSucessCallbacks.forEach(callback => {
                    callback(data)
                });


                loadIncludes(element)//caso haja outro dentro desse elemento, ele chama a funcao
            }
        })
    })
}

loadIncludes()//pega do body(todos da pagina)
