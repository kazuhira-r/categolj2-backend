define(function (require) {
    var Backbone = require('backbone');
    var AccessLog = require('app/js/admin/models/AccessLog');
    var Page = require('app/js/admin/collections/Page');

    return Backbone.Collection.extend(_.extend({
        model: AccessLog,
        url: function () {
            return 'api/v1/accesslogs';
        },
        comparator: function (a, b) {
            return a.get('accessDate') > b.get('accessDate') ? -1 : 1;
        },
        deleteByRemoteAddress: function (remoteAddress) {
            var opts = {
                url: this.url() + '?remoteAddress=' + remoteAddress,
                validate: false
            };
            return Backbone.sync('delete', new Backbone.Model(), opts)
                .success(_.bind(function () {
                    this.remove(this.where({
                        remoteAddress: remoteAddress
                    }));
                    console.log(this);
                    this.trigger('sync');
                }, this));
        }
    }, Page));
});