var v = require('voca');
module.exports = {
	angular(name) {
		return {
			[`${name}.html`]: `
			<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        ${name}系统
    </h1>
    <ol class="breadcrumb">
        <li class="active"><i class="fa fa-tags"></i> ${name}系统</li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-md-2">
            <div class="box box-solid">
                <div class="box-header with-border">
                    <h3 class="box-title">${name}系统</h3>

                    <div class="box-tools">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="box-body no-padding">
                    <ul class="nav nav-pills nav-stacked">
                        <li ><a ui-sref="main.coupons.${name}"><i class="fa fa-list"></i> ${name}</a></li>
                    </ul>
                </div>
                <!-- /.box-body -->
            </div>
        </div>
        <!-- /.col -->
        <div class="col-md-10" ui-view="${name}.content">

        </div>
        <!-- /.col -->
    </div>
    <!-- /. box -->
</section>
			`,
			[`${name}.add.html`]: `<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        ${name}
    </h1>
    <ol class="breadcrumb">
        <li class="active"><i class="fa fa-tags"></i> 添加${name}</li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">添加${name}</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <form role="form" name="event_form" ng-submit="save()" novalidate>
                <div class="col-md-12 col-xs-12">
                    <!-- Date and time range -->
                    <div class="form-group">
                        <label>请选择${name}有效时间范围</label>

                        <div class="input-group">
                            <button type="button" class="btn btn-default" id="daterange-btn">
                                <span ng-cloak>
                                  <i class="fa fa-calendar"></i> {{data.validAt.format('YYYY-MM-DD') + ' ~ ' + data.expiredAt.format('YYYY-MM-DD')}}
                                </span>
                                <i class="fa fa-caret-down"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.form group -->
                </div>
                <div class="col-md-12">
                    <label>生效时间</label>
                    <input type="text" ng-model="data.event.validAt"
                           class="form-control" placeholder="生效时间">
                </div>
                <div class="col-md-12">
                    <label>到期时间</label>
                    <input type="text" ng-model="data.event.expiredAt"
                           class="form-control" placeholder="到期时间">
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.title)">
                    <label>名称<span>(新手券,回购券)</span></label>
                    <input type="text" name="title" ng-model="data.event.title"
                           class="form-control" placeholder="名称">
                </div>
                <div class="col-md-12 form-group" >
                    <label>优惠券的备注信息</label>
                    <input ng-model="data.event.remark" name="remark" ng-trim="true" type="text" class="form-control"
                           placeholder="输入备注信息">
                </div>
                <div class="col-md-12 form-group hide" ng-class="getCssClasses(coupon_form.type)">
                    <label>类型<span>(1 - 折扣，2 - 满减)</span></label>
                    <input type="text" name="type" ng-model="data.event.type" required
                           class="form-control" placeholder="类型">
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.type)">
                    <label>可见<span>(0 - 所有可见，1 - 生效但不可见)</span></label>
                    <input type="state" name="type" ng-model="data.event.state" required
                           class="form-control" placeholder="可见情况">
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.minAmount)">
                    <label>最低消费</label>
                    <input type="number" name="minAmount" ng-model="data.event.minAmount" required
                           class="form-control" placeholder="最低消费">

                    <p class="help-block" ng-show="showError(coupon_form.minAmount, 'required')">请填写最低消费</p>
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.discount)">
                    <label>折扣金额</label>
                    <input type="number" name="discount" ng-model="data.event.discount" required class="form-control"
                           placeholder="折扣金额">

                    <p class="help-block" ng-show="showError(coupon_form.phone, 'required')">请填写折扣</p>
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.total)">
                    <label>数量</label>
                    <input type="number" name="total" ng-model="data.event.total" required class="form-control"
                           placeholder="数量">

                    <p class="help-block" ng-show="showError(coupon_form.phone, 'required')">请填写数量</p>
                </div>
                <div class="col-md-12 form-group" >
                    <label>仅含关键字可使用</label>
                    <input ng-model="data.event.only_contains_keyword" name="only_contains_keyword" ng-trim="true" type="text" class="form-control"
                           placeholder="输入筛选的关键字">
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(brand_form.name)">
                    <label>仅什么分类可用</label>
                    <!--删除用-->
                    <a ng-repeat="i in data.event.only_category" cat="{{i}}" catlist="only_category" add-cat-button-to-coupon>
                        <button class="btn btn-default">{{i.name}} x
                        </button>
                    </a>
                    <input ng-model="data.query.keyword" ng-change="searchOnlyCategory()" ng-trim="true" type="text" class="form-control"
                           placeholder="搜索：输入分类名称">
                    <input ng-model="data.event.only_category" name="only_category" ng-trim="false" ng-list=" " type="text" class="form-control hide"
                           placeholder="填写分类">
                    <!--插入用-->
                    <a ng-repeat="i in data.onlyCategories" cat="{{i}}" catlist="only_category" class="btn" add-cat-button-to-coupon>{{i.name}} +&nbsp;</a>
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(brand_form.name)">
                    <label>除什么分类可用</label>
                    <!--删除用-->
                    <a ng-repeat="i in data.event.except_category" cat="{{i}}" catlist="except_category" add-cat-button-to-coupon>
                        <button class="btn btn-default">
                            {{i.name}} x
                        </button>
                    </a>
                    <input ng-model="data.query.keyword" ng-change="searchExceptCategory()" ng-trim="true" type="text" class="form-control"
                           placeholder="搜索：输入分类名称">
                    <input ng-model="data.event.except_category" name="only_category" ng-trim="false" ng-list=" " type="text" class="form-control hide"
                           placeholder="填写分类">
                    <!--插入用-->
                    <a ng-repeat="i in data.exceptCategories" cat="{{i}}" catlist="except_category" class="btn" add-cat-button-to-coupon>{{i.name}} +&nbsp;</a>
                </div>

                <div class="col-md-12 form-group">
                    <button type="submit" class="btn btn-primary"><i
                            class="fa fa-save"></i> 保存
                    </button>
                    <a ng-click="goBack();" class="btn btn-default"><i class="fa fa-times"></i> 取消</a>
                </div>
            </form>
        </div>
        <!-- /.box-body -->
        <!-- Loading (remove the following to stop the loading)-->
        <div ng-show="data.spinning" class="overlay">
            <i class="fa fa-spinner fa-spin"></i>
        </div>
        <!-- end loading -->
    </div>
    <!-- /. box -->
</section>`,
			[`${name}.editor.html`]: `<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        优惠券
    </h1>
    <ol class="breadcrumb">
        <li class="active"><i class="fa fa-tags"></i> 修改优惠券</li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">修改优惠券</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <form role="form" name="event_form" ng-submit="save()" novalidate>
                <div class="col-md-12 col-xs-12">
                    <!-- Date and time range -->
                    <div class="form-group">
                        <label>请选择优惠券有效时间范围</label>

                        <div class="input-group">
                            <button type="button" class="btn btn-default" id="daterange-btn">
                                <span ng-cloak>
                                  <i class="fa fa-calendar"></i> {{data.validAt.format('YYYY-MM-DD') + ' ~ ' + data.expiredAt.format('YYYY-MM-DD')}}
                                </span>
                                <i class="fa fa-caret-down"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.form group -->
                </div>
                <div class="col-md-12">
                    <label>生效时间</label>
                    <input type="text" ng-model="data.event.validAt"
                           class="form-control" placeholder="生效时间">
                </div>
                <div class="col-md-12">
                    <label>到期时间</label>
                    <input type="text" ng-model="data.event.expiredAt"
                           class="form-control" placeholder="到期时间">
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.title)">
                    <label>名称<span>(新手券,回购券)</span></label>
                    <input type="text" name="title" ng-model="data.event.title"
                           class="form-control" placeholder="名称">
                </div>
                <div class="col-md-12 form-group" >
                    <label>优惠券的备注信息</label>
                    <input ng-model="data.event.remark" name="remark" ng-trim="true" type="text" class="form-control"
                           placeholder="输入备注信息">
                </div>
                <div class="col-md-12 form-group hide" ng-class="getCssClasses(coupon_form.type)">
                    <label>类型<span>(1 - 折扣，2 - 满减)</span></label>
                    <input type="text" name="type" ng-model="data.event.type" required
                           class="form-control" placeholder="类型">
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.type)">
                    <label>可见<span>(0 - 所有可见，1 - 生效但不可见)</span></label>
                    <input type="state" name="type" ng-model="data.event.state" required
                           class="form-control" placeholder="可见情况">
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.minAmount)">
                    <label>最低消费</label>
                    <input type="number" name="minAmount" ng-model="data.event.minAmount" required
                           class="form-control" placeholder="最低消费">

                    <p class="help-block" ng-show="showError(coupon_form.minAmount, 'required')">请填写最低消费</p>
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.discount)">
                    <label>折扣金额</label>
                    <input type="number" name="discount" ng-model="data.event.discount" required class="form-control"
                           placeholder="折扣金额">

                    <p class="help-block" ng-show="showError(coupon_form.phone, 'required')">请填写折扣</p>
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.total)">
                    <label>数量</label>
                    <input type="number" name="total" ng-model="data.event.total" required class="form-control"
                           placeholder="数量">

                    <p class="help-block" ng-show="showError(coupon_form.phone, 'required')">请填写数量</p>
                </div>

                <div class="col-md-12 form-group" ng-class="getCssClasses(coupon_form.remaining)">
                    <label>余量</label>
                    <input type="number" name="remaining" ng-model="data.event.remaining" required class="form-control"
                           placeholder="余量">

                    <p class="help-block" ng-show="showError(coupon_form.remaining, 'required')">请填写数量</p>
                </div>
                <div class="col-md-12 form-group" >
                    <label>仅含关键字可使用</label>
                    <input ng-model="data.event.only_contains_keyword" name="only_contains_keyword" ng-trim="true" type="text" class="form-control"
                           placeholder="输入筛选的关键字">
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(brand_form.name)">
                    <label>仅什么分类可用</label>
                    <!--删除用-->
                    <a ng-repeat="i in data.event.only_category" cat="{{i}}" catlist="only_category" add-cat-button-to-coupon>
                        <button class="btn btn-default">{{i.name}} x
                        </button>
                    </a>
                    <input ng-model="data.query.keyword" ng-change="searchOnlyCategory()" ng-trim="true" type="text" class="form-control"
                           placeholder="搜索：输入分类名称">
                    <input ng-model="data.event.only_category" name="only_category" ng-trim="false" ng-list=" " type="text" class="form-control hide"
                           placeholder="填写分类">
                    <!--插入用-->
                    <a ng-repeat="i in data.onlyCategories" cat="{{i}}" catlist="only_category" class="btn" add-cat-button-to-coupon>{{i.name}} +&nbsp;</a>
                </div>
                <div class="col-md-12 form-group" ng-class="getCssClasses(brand_form.name)">
                    <label>除什么分类可用</label>
                    <!--删除用-->
                    <a ng-repeat="i in data.event.except_category" cat="{{i}}" catlist="except_category" add-cat-button-to-coupon>
                    <button class="btn btn-default">
                        {{i.name}} x
                    </button>
                    </a>
                    <input ng-model="data.query.keyword" ng-change="searchExceptCategory()" ng-trim="true" type="text" class="form-control"
                           placeholder="搜索：输入分类名称">
                    <input ng-model="data.event.except_category" name="only_category" ng-trim="false" ng-list=" " type="text" class="form-control hide"
                           placeholder="填写分类">
                    <!--插入用-->
                    <a ng-repeat="i in data.exceptCategories" cat="{{i}}" catlist="except_category" class="btn" add-cat-button-to-coupon>{{i.name}} +&nbsp;</a>
                </div>

                <div class="col-md-12 form-group">
                    <button type="submit" class="btn btn-primary"><i
                            class="fa fa-save"></i> 保存
                    </button>
                    <a ng-click="goBack();" class="btn btn-default"><i class="fa fa-times"></i> 取消</a>
                </div>
            </form>
        </div>
        <!-- /.box-body -->
        <!-- Loading (remove the following to stop the loading)-->
        <div ng-show="data.spinning" class="overlay">
            <i class="fa fa-spinner fa-spin"></i>
        </div>
        <!-- end loading -->
    </div>
    <!-- /. box -->
</section>`,
			[`${name}.list.html`]: `<div class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">优惠券</h3>
        <div class="box-tools pull-right">
            <div class="has-feedback">
                <input type="text" class="form-control input-sm" placeholder="搜索" ng-model="data.query.keyword" ng-keyup="findCouponEvents($event);">
                <span class="glyphicon glyphicon-search form-control-feedback"></span>
            </div>
        </div>
        <!-- /.box-tools -->
    </div>
    <!-- /.box-header -->
    <div class="box-body no-padding">
        <div class="mailbox-controls">
            <button type="button" ng-click="findCouponEvents();" class="btn btn-default btn-sm"><i class="fa fa-refresh"></i></button>
            <a class="btn btn-default btn-sm" ui-sref="main.${name}.add"><i class="fa fa-plus"></i></a>
            <pagination num-pages="data.pageInfo.numPages" current-page="data.pageInfo.currentPage" on-select-page="selectPage(page);"></pagination>
        </div>
        <div class="table-responsive mailbox-messages">
            <table class="table table-hover table-responsive">
                <thead>
                <tr>
                    <th>类型</th>
                    <th>名称</th>
                    <th>状态</th>
                    <th>折扣</th>
                    <th>最低消费</th>
                    <th>数量</th>
                    <th>余量</th>
                    <th>生效时间</th>
                    <th>失效时间</th>
                    <th>创建时间</th>
                    <th>备注</th>
                    <th width="10%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr ng-repeat="event in data.couponEvents" ng-class="{'bg-warning': event.state === 9}">
                    <td class="role-name"><span ng-bind="event.type === 1 ? '折扣' : '满减'"></span></td>
                    <td class="role-name"><span ng-bind="event.title"></span></td>
                    <td class="role-name"><span ng-bind="event.state"></span></td>
                    <td class="role-name"><span ng-bind="event.discount"></span></td>
                    <td class="role-name"><span ng-bind="event.minAmount"></span></td>
                    <td class="role-name"><span ng-bind="event.total === -1 ? '不限' : event.total"></span></td>
                    <td class="role-name"><span ng-bind="event.remaining === -1 ? '不限' : event.remaining"></span></td>
                    <td class="role-name"><span ng-bind="event.validAt"></span></td>
                    <td class="role-name"><span ng-bind="event.expiredAt"></span></td>
                    <td class="role-name"><span ng-bind="event.createdAt"></span></td>
                    <td class="role-name"><span ng-bind="event.remark"></span></td>
                    <td class="role-name">
                        <a class="btn btn-sm btn-primary" ui-sref="main.${name}.edit({id:event._id})">修改</a>
                        <a class="btn btn-sm btn-primary" ng-disabled="event.state === 9" ng-click="deleteEvent(event)">删除</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <!-- /.table -->
        </div>
        <!-- /.mail-box-messages -->
    </div>
    <!-- /.box-body -->
    <div class="box-footer no-padding">
        <div class="mailbox-controls">
            <button type="button" ng-click="findCouponEvents();" class="btn btn-default btn-sm"><i class="fa fa-refresh"></i></button>
            <pagination num-pages="data.pageInfo.numPages" current-page="data.pageInfo.currentPage" on-select-page="selectPage(page);"></pagination>
        </div>
    </div>
    <!-- Loading (remove the following to stop the loading)-->
    <div ng-show="data.spinning" class="overlay">
        <i class="fa fa-spinner fa-spin"></i>
    </div>
    <!-- end loading -->
</div>`,
			APP:
				`
				//营销优惠券
            .state('main.${name}', {
                views: {
                    'contentView@': {
                        templateUrl: '/tpls/admin/${name}.html',
                        controller: '${v.capitalize(name)}Ctrl'
                    }
                }
            })
            .state('main.${name}.list', {
                url: '/marketing/coupon',
                views: {
                    '${name}.content': {
                        templateUrl: '/tpls/admin/${name}.list.html',
                        controller: '${v.capitalize(name)}Ctrl'
                    }
                }
            })
            .state('main.${name}.add', {
                url: '/marketing/${name}/add',
                views: {
                    '${name}.content': {
                        templateUrl: '/tpls/admin/${name}.add.html',
                        controller: '${v.capitalize(name)}AddCtrl',
                        resolve: {
                            isEdit: function () {
                                return 0;
                            }
                        }
                    }
                }
            })
            // 编辑分类
            .state('main.${name}.edit', {
                url: '/marketing/${name}/edit?id',
                views: {
                    '${name}.content': {
                        templateUrl: '/tpls/admin/${name}.edit.html',
                        controller: '${v.capitalize(name)}AddCtrl',
                        resolve: {
                            isEdit: function () {
                                return 1;
                            }
                        }
                    }
                }
            })
				`,
			CONTROLLER:
				`
							// 优惠券管理
		    .controller('${v.capitalize(name)}Ctrl', ['$scope', '$uibModal', '$log', '${v.capitalize(name)}Service', function ($scope, $uibModal, $log, ${v.capitalize(name)}Service) {
		        $scope.data = {
		            spinning: false,
		            pageInfo: {
		                currentPage: 0,
		                pageSize: 20,
		                numPages: 0,
		                total: 0
		            },
		            query: {},
		        };
		
		        $scope.findCouponEvents = function () {
		            $scope.data.spinning = true;
		            $scope.data.query.start = $scope.data.pageInfo.currentPage * $scope.data.pageInfo.pageSize;
		            $scope.data.query.rows = $scope.data.pageInfo.pageSize;
		            ${v.capitalize(name)}ervice.list($scope.data.query)
		                .success(function (result) {
		                    $scope.data.spinning = false;
		                    if (result.code === 0) {
		                        $scope.data.couponEvents = result.data;
		                        $scope.data.pageInfo.total = result.total;
		                        $scope.data.pageInfo.numPages = (result.total % $scope.data.pageInfo.pageSize === 0) ?
		                            (result.total / $scope.data.pageInfo.pageSize) :
		                            (Math.floor(result.total / $scope.data.pageInfo.pageSize) + 1);
		                    } else {
		                        $scope.toast({
		                            type: 'error',
		                            body: result.message
		                        });
		                    }
		                })
		                .error(function (err) {
		                    $scope.toast({
		                        type: 'error',
		                        body: err.message
		                    });
		                    $scope.data.spinning = false;
		                });
		        };
		
		        // paging
		        $scope.selectPage = function (page) {
		            $scope.data.pageInfo.currentPage = page;
		            $scope.findCouponEvents();
		        };
		
		        // delete
		        $scope.deleteEvent = function (couponEvent) {
		            var alertModalInstance = $uibModal.open({
		                animation: true,
		                templateUrl: '/tpls/modals/alert.tpl.html',
		                controller: 'AlertCtrl',
		                size: 'lg',
		                resolve: {
		                    alertInfo: function () {
		                        return {
		                            type: 'warning',
		                            title: '提示',
		                            message: '确定要删除吗?'
		                        };
		                    }
		                }
		            });
		            alertModalInstance.result.then(function (code) {
		                if (code === 0) {
		                    ${v.capitalize(name)}Service.deleteById(couponEvent.id)
		                        .success(function (result) {
		                            if (result.code === 0) {
		                                $scope.toast({
		                                    type: 'success',
		                                    body: '删除成功!'
		                                });
		                                $scope.findCouponEvents();
		                            } else {
		                                $scope.toast({
		                                    type: 'error',
		                                    body: result.message
		                                });
		                            }
		                        });
		                }
		            }, function () {
		                $log.info('AlertModal dismissed at: ' + new Date());
		            });
		        };
		
		        //
		        $scope.findCouponEvents();
		    }])
		    // 优惠券添加
		    .controller('${v.capitalize(name)}AddCtrl', ['$scope', '$state', '${v.capitalize(name)}ervice', 'isEdit', '$stateParams', 'CategoryService',
		        function ($scope, $state, ${v.capitalize(name)}ervice, isEdit, $stateParams, CategoryService) {
		            $scope.data = {
		                spinning: false,
		                couponAmount: 1,
		                isEdit: isEdit,
		                validAt: moment(),
		                expiredAt: moment().add(6, 'days'),
		                event: {
		                    type: 2,
		                    state: 0,
		                    discount: 10,
		                    minAmount: 100,
		                    total: 10,
		                    only_contains_keyword: "",
		                    only_category: [],
		                    except_category: [],
		                    validAt: moment().format('YYYY-MM-DD') + ' 00:00:00',
		                    expiredAt: moment().add(6, 'days').format('YYYY-MM-DD') + ' 23:59:59',
		                },
		                query: {},
		                onlyCategories: [],
		                exceptCategories: []
		            };
		
		            // 日期选择
		            angular.element('#daterange-btn').daterangepicker({
		                ranges: {
		                    '1周': [moment(), moment().add(6, 'days')],
		                    '1月': [moment(), moment().add(29, 'days')],
		                    '2月': [moment(), moment().add(59, 'days')],
		                },
		                locale: {
		                    customRangeLabel: '自定义',
		                    fromLabel: '开始',
		                    toLabel: '结束',
		                    applyLabel: '确定',
		                    cancelLabel: '取消'
		                },
		                format: 'YYYY-MM-DD',
		                startDate: $scope.data.validAt,
		                endDate: $scope.data.expiredAt,
		            }, function (start, end) {
		                $scope.$apply(function () {
		                    $scope.data.validAt = start;
		                    $scope.data.expiredAt = end;
		                    $scope.data.event.validAt = $scope.data.validAt.format('YYYY-MM-DD') + ' 00:00:00';
		                    $scope.data.event.expiredAt = $scope.data.expiredAt.format('YYYY-MM-DD') + ' 23:59:59';
		                });
		            });
		
		            $scope.saveEvent = function () {
		                $scope.data.spinning = true;
		                $scope.data.event.validAt = $scope.data.validAt.format('YYYY-MM-DD') + ' 00:00:00';
		                $scope.data.event.expiredAt = $scope.data.expiredAt.format('YYYY-MM-DD') + ' 23:59:59';
		                ${v.capitalize(name)}ervice.addEvent($scope.data.event)
		                    .success(function (result) {
		                        $scope.data.spinning = false;
		                        if (result.code === 0) {
		                            $state.go('main.${name}.list');
		                        } else {
		                            $scope.toast({
		                                type: 'error',
		                                body: result.message,
		                            });
		                        }
		                    })
		                    .error(function (err) {
		                        $scope.toast({
		                            type: 'error',
		                            body: err.message
		                        });
		                        $scope.data.spinning = false;
		                    });
		            };
		            $scope.updateEvent = function () {
		                $scope.data.spinning = true;
		                $scope.data.event.validAt = $scope.data.validAt.format('YYYY-MM-DD') + ' 00:00:00';
		                $scope.data.event.expiredAt = $scope.data.expiredAt.format('YYYY-MM-DD') + ' 23:59:59';
		
		                // console.log($scope.data.event);
		                // return;
		                ${v.capitalize(name)}ervice.updateEvent($scope.data.event)
		                    .success(function (result) {
		                        $scope.data.spinning = false;
		                        if (result.code === 0) {
		                            $state.go('main.${name}.list');
		                        } else {
		                            $scope.toast({
		                                type: 'error',
		                                body: result.message,
		                            });
		                        }
		                    })
		                    .error(function (err) {
		                        $scope.toast({
		                            type: 'error',
		                            body: err.message
		                        });
		                        $scope.data.spinning = false;
		                    });
		            };
		            // 查询优惠券详情
		            $scope.findCouponEventById = function () {
		                $scope.data.spinning = true;
		                ${v.capitalize(name)}Service.findById($stateParams.id)
		                    .success(function (result) {
		                        $scope.data.spinning = false;
		                        if (result.code === 0) {
		                            $scope.data.event = result.data;
		                        } else {
		                            $scope.toast({
		                                type: 'error',
		                                body: result.message
		                            });
		                        }
		                    });
		            };
		            $scope.save = function () {
		                if (isEdit === 1) {
		                    $scope.updateEvent();
		                } else {
		                    $scope.saveEvent();
		                }
		            }
		            $scope.searchOnlyCategory = function () {
		                $scope.searchCategory(function (data) {
		                    $scope.data.onlyCategories = data;
		                })
		            }
		            $scope.searchExceptCategory = function () {
		                $scope.searchCategory(function (data) {
		                    $scope.data.exceptCategories = data;
		                })
		            }
		
		            $scope.searchCategory = function (cb) {
		                $scope.data.spinning = true;
		                $scope.data.query.start = 0;
		                $scope.data.query.rows = 20;
		                CategoryService.listLowestCategories($scope.data.query)
		                    .success(function (result) {
		                        $scope.data.spinning = false;
		                        if (result.code === 0) {
		                            cb(result.data);
		                        } else {
		                            $scope.toast({
		                                type: 'error',
		                                body: result.message,
		                            });
		                        }
		                    })
		                    .error(function (err) {
		                        $scope.toast({
		                            type: 'error',
		                            body: err.message
		                        });
		                        $scope.data.spinning = false;
		                    });
		            };
		            $scope.chooseOnlyCategory = function (i) {
		                if ($scope.data.event.only_category.filter(function (c) {
		                    return c == i;
		                }).length == 0) {
		                    $scope.data.event.only_category = $scope.data.event.only_category.concat(i);
		                } else {
		
		                    // if ($scope.data.event.only_category) {
		                    //     $scope.data.event.only_category = $scope.data.event.only_category.concat(i._id);
		                    // } else {
		                    //     $scope.data.event.only_category = [i._id];
		                    // }
		
		                }
		                $scope.data.onlyCategories = [];
		            }
		            // 如果是编辑,查询详情
		            if (isEdit === 1) {
		                $scope.find${v.capitalize(name)}EventById();
		            }
		        }])
					`,
			SERVICES:
				`
					// ${name} Service
		    .factory('${v.capitalize(name)}Service', ['$http', function ($http) {
		
		        function list(query) {
		            query.random = Math.random();
		            return $http.get('/${name}/', {params: query});
		        }
		
		        function deleteById(eventId) {
		            var query = {
		                random: Math.random(),
		            };
		            return $http.delete('/${name}/' + eventId, {params: query});
		        }
		
		        function addEvent(event) {
		            return $http.put('/${name}/', event);
		        }
		        function updateEvent(event) {
		            return $http.post('/${name}/', event);
		        }
		        function findById(eventId){
		            return $http.get('/${name}/' + eventId);
		        }
		
		        return {
		            list: list,
		            findById: findById,
		            addEvent: addEvent,
		            deleteById: deleteById,
		            updateEvent: updateEvent
		        };
		    }])
					`
		}
	},
	apiModelService(name) {
		return {
			// Model
			MODEL: `
			var mongoose = require('mongoose');
			var moment = require('moment');
			var Q = require('q');
			var config = require('./../config');
			var Schema = mongoose.Schema;
			var ObjectId = mongoose.Schema.Types.ObjectId;
			
			var ${v.capitalize(name)}Schema = new Schema({
			    // 种类:产品-1，订单-2
			    type: {
			        type: Number,
			        default: 1
			    },
			
			    level:{
			        type: Number,
			        default: 1
			    },
			
			    name: String,
			    // 主图banner
			    mainImage: {
			        type: String,
			        trim: true
			    },
			
			    mediumImage:{
			        type: String,
			        trim: true
			    },
			
			    smallImage:{
			        type: String,
			        trim: true
			    },
			
			    secondTags:[{
			        type: ObjectId,
			        ref: 'Tag'
			    }],
			
			    thirdTags:[{
			        type: ObjectId,
			        ref: 'Tag'
			    }],
			
			    // timestamp
			    createdAt: {
			        type: Date,
			        default: Date.now
			    },
			    updatedAt: {
			        type: Date,
			        default: Date.now
			    }
			
			}, { timestamps: false });
			
			${v.capitalize(name)}Schema.index({ name: 1 });
			
			// 日期
			${v.capitalize(name)}Schema.path('createdAt').get(function(createdAt) {
			    return moment(createdAt).format(config.format.datetime);
			});
			${v.capitalize(name)}Schema.path('updatedAt').get(function(updatedAt) {
			    return moment(updatedAt).format(config.format.datetime);
			});
			
			${v.capitalize(name)}Schema.set('toJSON', { getters: true, virtuals: true });
			
			module.exports = mongoose.model('${v.capitalize(name)}', ${v.capitalize(name)}Schema);
`,
			SERVICE:
				`
		
		var Q = require('q');
		
		// models
		var ${v.capitalize(name)} = require('./../models/${v.capitalize(name)}');
		// logs
		var logger = require('log4js').getLogger('${name}Service');
		var async = require('async')
		// service
		var ${name}Service = {
		    /**
		     * 添加品牌
		     * @param tag
		     */
		    add: function (tag) {
		        if (tag.id) {
		            return this.update(tag);
		        } else {
		            return new ${v.capitalize(name)}(tag).save();
		        }
		    },
		    /**
		     * 更新标签
		     * @param TagBrand
		     */
		    update: function(tag) {
		        var tagId = tag.id;
		        delete tag.id;
		        delete tag._id;
		        delete tag.__v;
		        delete tag.createdAt;
		        tag.updatedAt = new Date();
		        return ${v.capitalize(name)}.findByIdAndUpdate(tagId, tag, {new: true}).exec();
		    },
		    /**
		     * 列表
		     * @param conditions
		     * @returns {*}
		     */
		    list${v.capitalize(name)}s:function(conditions){
		        var deferred = Q.defer();
		        var query = {};
		        if(conditions.keyword) {
		            var keyword = conditions.keyword;
		            query.$and = [{$or: [
		                {
		                    name: new RegExp('^.*' + keyword + '.*$', 'i')
		                }
		            ]}];
		            //query.keyword = {name: new RegExp('^.*' + keyword + '.*$', 'i')}
		        }
		
		        var start = parseInt(conditions.start) || 0;
		        var rows = parseInt(conditions.rows) || 20;
		        var sortBy = conditions.sortBy || 'updatedAt';
		        var sort = {};
		        sort[sortBy] = conditions.sortOrder || -1;
		        ${v.capitalize(name)}.count(query).exec(function (err, count) {
		            if (err) {
		                deferred.reject(err);
		            } else {
		                ${v.capitalize(name)}.find(query).populate('secondTags thirdTags').sort(sort).skip(start).limit(rows).exec(function(err,tags){
		                    if(err){
		                        deferred.reject(err);
		                    }else{
		                        deferred.resolve({
		                            tags: tags,
		                            total: count
		                        });
		                    }
		                });
		            }
		        })
		        return deferred.promise;
		    },
			/**
			 * 导出标签
			 * @param platform
			 * @param conditions
			 * @returns {*}
			 */
			export${v.capitalize(name)}s: function (platform, conditions) {
				var deferred = Q.defer();
		
				var query = {}
				if (conditions.keyword) {
					var keyword = conditions.keyword
					query.$and = [{
						$or: [
							{
								name: new RegExp('^.*' + keyword + '.*$', 'i')
							},
							{
								secondTags: {$in: conditions.keyword.split(',')}
							},
		          {
			          thirdTags: {$in: conditions.keyword.split(',')}
		          }
						]
					}]
				}
				if (conditions.tags) {
					query.secondTags = {$in: conditions.tags.split(',')}
					query.thirdTags = {$in: conditions.tags.split(',')}
				}
				var start = parseInt(conditions.start) || 0
				var rows = parseInt(conditions.rows) || 20
				var selectedProps = ['name','type','level','mainImage','mediumImage','smallImage','secondTags','thirdTags']
				var TagQuery = ${v.capitalize(name)}.find(query).select(selectedProps.join(' '))
				async.parallel({
					tags: function (cb) {
						TagQuery.skip(start).limit(rows).exec(cb)
					},
					total: function (cb) {
						${v.capitalize(name)}.count(query).exec(cb)
					}
				}, function (err, results) {
					if (err) {
						deferred.reject(err)
					} else {
					    // logger.debug('results',results)
						deferred.resolve(results)
					}
				})
		
				return deferred.promise
			},
		
		    /**
		     * 
		     * @param id
		     */
		    find${v.capitalize(name)}ById: function(id) {
		        var deferred = Q.defer();
		        ${v.capitalize(name)}.findById(id).populate('secondTags thirdTags').exec(deferred.makeNodeResolver());
		        return deferred.promise;
		    },
		
		    /**
		     * 
		     * @param conditions
		     */
		    delete${v.capitalize(name)}s: function (conditions) {
		        var deferred = Q.defer();
		        ${v.capitalize(name)}.remove(conditions, deferred.makeNodeResolver());
		        return deferred.promise;
		    }
		};
		
		module.exports = ${name}Service;

		`,
			API:
				`
			var express = require('express');
			var router = express.Router();
			var logger = require('log4js').getLogger('${name}ApiRoute');
			var ${name}Service = require('./../../services/${name}Service');
			
			var passport = require('../../passport').passport;
			
			var ${name}ApiRoute = {
			    /**
			     * init
			     * @param app
			     */
			    init: function (app) {
			        router.get('/', this.listTags);
			
			        app.use('/api/${name}', passport.authenticate('basic', {session: false}));
			        app.use('/api/${name}', router);
			    },
			    /**
			     * 
			     * @param req
			     * @param res
			     */
			    list: function (req, res) {
			        var result = {
			            code: 0,
			            message: 'success'
			        };
			        var conditions = req.query;
			        ${name}Service.list(conditions)
			            .then(function (tagsInfo) {
			                result.data = tagsInfo.tags;
			                result.total = tagsInfo.total;
			                res.json(result);
			            })
			            .catch(function (err) {
			                result.code = -1;
			                result.message = err.message;
			                res.json(result);
			            });
			    },
			};
			
			module.exports = ${name}ApiRoute;
		`,
			AJAX:
				`
			var express = require('express');
			var router = express.Router();
			var logger = require('log4js').getLogger('${name}Route');
			var acs = require('./../../services/accessControlService');
			var ${name}Service = require('./../../services/${name}Service');
			var moment =require('moment')
			var excel = require('node-xlsx')
			var config = require('./../../config');
			
			var ${name}Route = {
			    /**
			     * init
			     * @param app
			     */
			    init: function (app) {
			        router.get('/', this.list${v.capitalize(name)}s);
			        router.get('/:id', this.find${v.capitalize(name)}ById);
			        router.put('/', acs.hasAuthority('tag'), this.add${v.capitalize(name)});
			        router.post('/', acs.hasAuthority('tag'), this.update${v.capitalize(name)});
			        app.use('/${name}s', acs.hasAuthenticated, router);
			    },
				 
			
			    list${v.capitalize(name)}s: function (req, res) {
			        var result = {
			            code: 0,
			            message: 'success'
			        };
			        var conditions = req.query;
			        ${name}Service.list(conditions)
			            .then(function (tagsInfo) {
			                result.data = tagsInfo.tags;
			                result.total = tagsInfo.total;
			                res.json(result);
			            })
			            .catch(function (err) {
			                result.code = -1;
			                result.message = err.message;
			                res.json(result);
			            });
			    },
			
			    find${v.capitalize(name)}ById: function(req, res) {
			        var result = {
			            code: 0,
			            message: 'success'
			        };
			        var tagId = req.params.id;
			        ${name}Service.findTagById(tagId)
			            .then(function (tag) {
			                result.data = tag;
			                res.json(result);
			            })
			            .catch(function (err) {
			                result.code = -1;
			                result.message = err.message;
			                res.json(result);
			            });
			    },
			
			    add${v.capitalize(name)}: function (req, res) {
			        var result = {
			            code: 0,
			            message: 'success'
			        };
			        var tag = req.body;
			        logger.debug("----",tag);
			        ${name}Service.add(tag)
			            .then(function (tag) {
			                result.data = tag;
			                res.json(result);
			            })
			            .catch(function (err) {
			                result.code = -1;
			                result.message = err.message;
			                res.json(result);
			            });
			    },
			
			    update${v.capitalize(name)}: function (req, res) {
			        var result = {
			            code: 0,
			            message: 'success'
			        };
			        var tag = req.body;
			        ${name}Service.update(tag)
			            .then(function (tag) {
			                result.data = tag;
			                res.json(result);
			            })
			            .catch(function (err) {
			                result.code = -1;
			                result.message = err.message;
			                res.json(result);
			            });
			    },
			
			};
			module.exports = ${name}Route
		`
		}
	},
	wxHtml(name) {
		return {
			EJS:
				`
				<%- include('../header.html') %>
<style>
</style>
<div class="page-group">
    <div class="page page-current" id="${v.camelCase(name)}">
        <header class="bar bar-nav">
            <a class="button button-link button-nav pull-left back "><span
                        class="icon icon-left color-icon-common"></span></a>

            <h1 class="title color-icon-common"><%= title %></h1>
        </header>

        <%- include('../bar-tab.html') %>

        <div class="content ">
             
					<div class="content-block">
			      
			    </div>
        </div>
    </div>
</div>

<%- include('../footer.html') %>
<script>
$(document).on("pageInit", "#${v.camelCase(name)}", function(e, id, page) {
	var content = $(page).find('.content')
});
</script>

				`
		}
	}

}