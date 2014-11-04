var template_path = Qva.Remote + "?public=only&name=Extensions/Maps/";

function extension_Init()
{
	// Use QlikView's method of loading other files needed by an extension. These files should be added to your extension .zip file (.qar)
	//if (typeof jQuery === 'undefined') {
	    Qva.LoadScript(template_path + 'jquery-1.7.2.min.js', function () {
			Qva.LoadScript(template_path + 'jquery.vmap.js', function () {
				Qva.LoadScript(template_path + 'jquery.vmap.regions.js', extension_Done);
			})
		});
	//}
	//else {
	//    extension_Done();
	//}    
}

function extension_Done(){
	$(document).ready(function() {
//Add extension
		Qva.AddExtension('Maps', function(){
			//Load a CSS style sheet
			Qva.LoadCSS(template_path + "jqvmap.css");
			
			var _this = this;
			//var button = '';
			var indicadores = {};
			var labelInfo = {};
			var cores = {'A': '#00ff00', 'B': '#ff0000', 'C': '#555555'};
			var escala = _this.Layout.Text0.text.toString();
			var corPaises = _this.Layout.Text1.text.toString();
			var zoom = _this.Layout.Text2.text.toString();
			
			// limpa area do plugin
			_this.Element.setAttribute("id", "vmap");
			$("#vmap").empty();
			//$("#vmap").html('<br/><br/><br/><br/>' + props(_this.Layout));

			// se dados forem incompativeis devolve modo de utilizacao
			if(!(_this.Data.Rows.length > 0 && _this.Data.Rows[0].length >= 2)) {
				$("#vmap").html('<p style="font-family: Arial">O mapa tem de ter uma dimensao com codigos ISO de pais e tres expressoes (por pais): <br/>' +
					"1. A categoria ('A' - verde, 'B' - vermelho ou 'C' - cinzento) <br/>" +
					"2. Tooltips por pais com conteudo em HTML (explo: 'TF = ' & TF & ' &lt;br/&gt;TG = ' & TG) <br/>" +
					"3. (Opcional) Botao com accao de resposta ao click</p>");
			}
			else {

				// prepara dados para o plugin
				for(var i=0; i < _this.Data.Rows.length; i+=1) {
					//indicadores[_this.Data.Rows[i][0].text.toLowerCase()] = cores[_this.Data.Rows[i][1].text];
					indicadores[_this.Data.Rows[i][0].text.toLowerCase()] = _this.Data.Rows[i][1].text;
					labelInfo[_this.Data.Rows[i][0].text.toLowerCase()] = _this.Data.Rows[i].length > 2 ? _this.Data.Rows[i][2].text : '-';
				}
				
				/* if(_this.Data.Rows.length > 0 && _this.Data.Rows[0].length >= 3) { 
					button = _this.Data.Rows[0][3].text;
				}*/

				// Debug
				// var dbg = _this.Data.Rows.length.toString() + '<br/>';
				// for(var i=0; i<_this.Data.Rows.length; i+=1) {
					// for(var l=0; l<_this.Data.Rows[i].length; l+=1) {
						// dbg += _this.Data.Rows[i][l].text + (l<_this.Data.Rows[i].length-1 ? ',' : '');
					// }
					// dbg += '<br/>';
				// }
				// $("#vmap").html(dbg);

				mapa = $("#vmap").vectorMap({
					map: 'map',
					color: corPaises,
					backgroundColor: '#ffffff',
					hoverOpacity: 0.7,
					selectedColor: '#777777',
					enableZoom: zoom == 1,
					showTooltip: true,
					colors: indicadores,
					labelInfo: labelInfo,
					qvwObject: _this,
					//qvwButton: button,
					escala: escala
				});
			}
		});
	});
}
//Initiate extension
extension_Init();
