/**
 * Created by szhitenev on 25.09.2020.
 */
(function () {

    var dataProcedureService = require('../../services/procedures/dataProcedureService').default;

    var toastNotificationService = require('../../../../../core/services/toastNotificationService').default;


    module.exports = function ($scope, $mdDialog) {

        var vm = this;

        vm.procedures = [];

        vm.readyStatus = {data: false};

        vm.getList = function () {

            dataProcedureService.getList().then(function (data) {

                vm.procedures = data.results;

                console.log('vm.procedures', vm.procedures);

                vm.readyStatus.data = true;

                $scope.$apply();

            })
        };

        vm.executeProcedure = function ($event, item) {

            console.log("Execute Procedure", item);

            dataProcedureService.runProcedure(item.id, item).then(function (data) {

                toastNotificationService.success('Success. Procedure is being processed');


            })

        };

        vm.editProcedure = function ($event, item) {

            $mdDialog.show({
                controller: 'DataProcedureEditDialogController as vm',
                templateUrl: 'views/dialogs/procedures/data-procedure-edit-dialog-view.html',
                parent: document.querySelector('.dialog-containers-wrap'),
                targetEvent: $event,
                clickOutsideToClose: false,
                preserveScope: true,
                autoWrap: true,
                skipHide: true,
                multiple: true,
                locals: {
                    data: {
                        item: item
                    }

                }
            }).then(function (res) {

                if (res.status === 'agree') {
                    vm.getList();
                }

            })

        };


        vm.init = function () {

            vm.getList();

        };

        vm.init();

    };

}());