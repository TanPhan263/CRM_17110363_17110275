angular.module('userCtrl', [])

    .controller('homeController', function ($location, User) {
        User.all().then(res => this.users = res.data);
        this.message = 'TRANG CHỦ';
        this.name = '';
        this.getbyname = function (name) {
            if (name == '') {
                User.all().then(res => {
                    this.users = res.data;
                })
            } else {
                User.getbyname(name).then(res => {
                    if (res.data != null) {
                        console.log(res.data);
                        this.users = res.data;
                    }
                    else {
                        alert("Không có kết quả phù hợp");
                    }
                })
            }
        }
        this.delete = function (id) {
            var r = confirm("Xác nhận xóa nhân viên!");
            if (r == true) {
                User.delete(id);
                alert("Đã xóa nhân viên");
                this.reload();
                $location.path('/');
            } else {
                alert( "Hủy thao tác thành công!");
            }
          
        }
        this.reload = function () {
            this.users = [];
            User.all().then(res => {
                this.users = res.data;
            })
        }
    })
    .controller('addController', function ($location, User) {
        this.message = 'THÊM TÀI KHOẢN';
        this.user = {};
        this.repass = '';
        this.add = function (user, repass) {
            if (repass != user.password) {
                alert("Mật khẩu xác nhận không đúng");
            }
            else {
                User.create(user).then((response) => {
                    console.log(response.data.success);
                    if(response.data.success != false){
                        alert("Thêm thành công");
                        $location.path('/');
                    }
                    else
                     alert(response.data.message);
                });
            }
        }
    })
    .controller('registerController', function ($location, User) {
        this.message = 'ĐĂNG KÍ TÀI KHOẢN';
        this.user = {};
        this.repass = '';
        this.add = function (user, repass) {
            if (repass != user.password) {
                alert("Mật khẩu xác nhận không đúng");
            }
            else {
                    User.create(user).then((response) => {
                        console.log(response.data.success);
                        if(response.data.success != false){
                            alert("Đăng kí thành công, mời bạn đăng nhập");
                            $location.path('/login');
                        }
                        else
                         alert(response.data.message);
                    });
            }
        }
    })
    .controller('detailController', function ($location, $routeParams, User) {
        this.message = 'THÔNG TIN TÀI KHOẢN';
        User.get($routeParams.id).then(res => this.user = res.data);
        this.delete = function (id) {
            User.delete(id);
            alert("Đã xóa nhân viên");
            $location.path('/');
        }
    })
    .controller('editController', function ($location, $routeParams, User) {
        this.message = 'CHỈNH SỬA THÔNG TIN';
        User.get($routeParams.id).then(res => this.user = res.data);
        this.update = function (user) {
            User.update(user._id, user).then(() => {
                alert("Chỉnh sửa thông tin thành công");
                $location.path('/');
            });
        }
    })
    .controller('facebookCtrl', function ($window, $routeParams, Auth) {
        if ($window.location.pathname == '/facebookerror') {
            alert("Tài khoản này không tồn tại");
        } else {
            Auth.social($routeParams.token);
            $window.location = $window.location.protocol + '//' + $window.location.host;
        }
    })
    .controller('googleCtrl', function ($window, $routeParams, Auth) {
        if ($window.location.pathname == '/googleerror') {
            alert("Tài khoản này không tồn tại");
        } else {
            Auth.social($routeParams.token);
            $window.location = $window.location.protocol + '//' + $window.location.host;
        }
    })
