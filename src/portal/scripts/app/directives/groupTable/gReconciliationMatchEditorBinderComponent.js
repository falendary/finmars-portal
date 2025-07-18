/**
 * Created by szhitenev on 30.06.2016.
 */
(function () {

    'use strict';

    var evEvents = require('../../services/entityViewerEvents');

    module.exports = function ($templateCache, $compile, $controller, $mdDialog, $state, $transitions) {
        return {
            scope: {
                evDataService: '=',
                evEventService: '=',
                spExchangeService: '='
            },
            restrict: 'AE',
            template: '<div class="reconciliation-match-editor-controller-container height-100 recon-match-holder dndScrollableElem" style="overflow: auto;"></div>',
            link: function (scope, elem, attrs) {

                var container = $(elem).find('.reconciliation-match-editor-controller-container');

                function createController() {

                    var additions = scope.evDataService.getAdditions();

                    console.log('create report Controller', additions);

                    var editorTemplateUrl;
                    var tpl;
                    var templateScope;
                    var ctrl;

                    $(container).html('');

                    editorTemplateUrl = 'views/entity-viewer/reconciliation-match-editor-view.html';
                    tpl = $templateCache.get(editorTemplateUrl);

                    templateScope = scope.$new();

                    templateScope.$parent.vm = {};
                    templateScope.$parent.vm.entityType = additions.type;

                    ctrl = $controller('ReconciliationMatchEditorController as vm', {
                        '$scope': templateScope,
                        '$mdDialog': $mdDialog,
                        'parentEntityViewerDataService': scope.evDataService,
                        'parentEntityViewerEventService': scope.evEventService,
                        'splitPanelExchangeService': scope.spExchangeService
                    });

                    container.html(tpl);
                    container.children().data('$ngControllerController', ctrl);

                    console.log('container', container);

                    $compile(elem.contents())(templateScope);


                }

                createController();

            }
        }
    }


}());