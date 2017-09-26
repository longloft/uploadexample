(function() {
    'use strict';

    angular.module('app', ['ngFileUpload', 'ngAnimate', 'ui.bootstrap'])
        .controller('addImageController', ['$scope', 'Upload',
            function($scope, Upload) {
                $scope.files = [];

                $scope.fileSelected = function(files, file, newFiles) {
                    if (newFiles && newFiles.length) {
                        angular.forEach(newFiles, function(file) {
                            file.path = $scope.path;
                        });
                    }
                };


                var uploadFile = function(file) {
                    var fileData = {
                        tags: "crap",
                        path: "path",
                        itemType: "background"
                    };

                    Upload.upload({
                            url: '/api/v1/files',
                            data: {
                                file: file,
                                'data': JSON.stringify(fileData)
                            }
                            // headers: { 'Authorization': tokenManager.getAuthorizationHeader() }
                        })
                        .then(function(resp) {
                                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                            },
                            function(resp) {
                                console.log('Error status: ' + resp.status);
                            },
                            function(evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                file.progress = progressPercentage;
                                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                            })
                        .catch(function(error) {
                            console.log('error uploading: ' + JSON.stringify(error));
                        });
                };

                $scope.uploadFiles = function() {
                    $scope.isUploadingFiles = true;

                    angular.forEach($scope.files, function(file) {
                        file.progress = 0;
                        uploadFile(file, file);
                    });

                };
            }
        ]);
})();