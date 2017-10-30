"use strict"
/** @module DOMManipulationModule */

var manipulateDOM = (function () {
    var actions4Listeners = {
        /**
         * @description Função listener para expandir um textarea
         */
        expandTextAreaListener: function (event) {
            event.preventDefault();
            var type = $(this).prop("tagName");
            var classe = ($(this).attr("class")).indexOf("expand");
            $(this).css("resize", "none");
            if (classe > -1) {
                $(this).show("slow", function () {
                    $(this).css({
                        "display": "block",
                        "overflow-y": "hidden"
                    });
                    expandTextarea(this.id);
                });
            }
        },

        /**
         * @description Função listener para imprimir a avaliação.
         */
        printAvaliacaoListener: function(event) {
            event.preventDefault();
            printModule.print();
        },

        /**
         * @description Função listener para abrir a solicitação do treinamento de origem
         */
        showTreinamentoListener: function(event) {
            event.preventDefault();
            var $numSolic = $("#numSolicTreinamento").val()
            if ($numSolic != "" && $numSolic != undefined && $numSolic != null) {
                var htmlRef = "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + $numSolic;
                window.open(htmlRef, "_blank");
            }
        }
    };

    var expandTextarea = function (id) {
        var element = document.getElementById(id);
        if (element.scrollHeight != null) {
            var altura = element.scrollHeight + "px";
            $(element).animate({
                overflow: "hidden",
                height: 0,
                height: altura
            });
        }
    };

    var enablePopOvers = function () {
        FLUIGC.popover('.bs-docs-popover-hover', {
            trigger: 'hover',
            placement: 'auto'
        });
    };

    var zoomFields = {
        eventZoom: function (selectedItem) {
            if (selectedItem.inputName == "aprovadorTreinamento") {
                $("#aprovadorMat").val(selectedItem.colleagueId);
            }

            if (selectedItem.inputName == "avaliadorTreinamento") {
                if ( $("#aberturaAutomatica") != "Sim") {
                    var matricula = $("#matricula").val();
                    if ( servicesModule.searchUserMat(matricula) ){
                        $("#avaliadorMat").val(matricula);
                    } else {
                        $("#avaliadorMat").val(selectedItem.colleagueId);
                    }
                }
            }
        }
    }
    /**
    * @description expande textarea do histórico
    * @param id id do campo
    */
    var expandTextareaHistorico = function (id) {
        var objTextArea = document.getElementById(id)
        if (objTextArea.scrollHeight > objTextArea.offsetHeight) {
            objTextArea.rows += 1
        }
    }
    /**
    * @description Mostra o histórico completo
    */
    var mostraHistorico = function () {
        var historico = "historico"
        document.getElementById(historico).style.display = "inline"
        expandTextarea(historico)
    }
    return {
        actions4Listeners: actions4Listeners,
        expandTextareaHistorico: expandTextareaHistorico,
        mostraHistorico: mostraHistorico,
        zoomFields: zoomFields,
        expandTextarea: expandTextarea,
        enablePopOvers: enablePopOvers
    }
})();