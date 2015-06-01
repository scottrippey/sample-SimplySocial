/* This file was generated by [build-angular.js] */
angular.module('app-components.js', [
	"list-filter.js",
	"main-banner.js",
	"modal-dialog.js",
	"post-details-loading.js",
	"post-details.js",
	"create-post.js",
	"title-bar.js",
	"user-feed.js",
	"write-something.js"
]);
/* This file was generated by [build-angular.js] */
angular.module('app-pages.js', [
	"home-page.js",
	"profile-settings.js"
]);
/* This file was generated by [build-angular.js] */
angular.module('app-services.js', [
	"FeedService.js",
	"MockMedia.js",
	"MockPosts.js",
	"MockUsers.js"
]);
/* This file was generated by [build-angular.js] */
angular.module('app-utils.js', [
	"TrustedFilter.js"
]);
angular.module('app', [
	'ngAnimate',
	'ngTouch',

	'app-components.js',
	'app-pages.js',
	'app-services.js',
	'app-utils.js'
]);
angular.module('list-filter.js',[])
.directive('listFilter', [
	function(){
		return {
			restrict: 'E',
			scope: {},
			controllerAs: 'vm',
			bindToController: {
				filterType: '=?',
				filterLayout: '=?'
			},
			template: `
				<nav class="list-filter">
					<div class="list-filter-contents">
						<div class="filter-group-one">
							<a class="filter-item layout"
								ng-repeat="item in vm.layouts"
								ng-class="{ 'selected': vm.filterLayout == item.value }"
								ng-click="vm.filterLayout = item.value"
							>
								<img ng-src="{{ item.imgSrc }}">
							</a>
						</div>
						<div class="filter-group-two">
							<a class="filter-item type"
								ng-repeat="item in vm.types"
								ng-class="{ 'selected': vm.filterType == item.value }"
								ng-click="vm.filterType = item.value"
							>
								{{ item.label }}
							</a>
						</div>
					</div>
				</nav>
			`,
			controller: function() {
				var vm = this;
				
				angular.extend(vm, {
					filterType: 'all',
					filterLayout: 'list',
					types: [
						{ label: "All Posts", value: "all" },
						{ label: "Photos", value: "photos" },
						{ label: "Videos", value: "videos" }
					],
					layouts: [
						{ imgSrc: 'dist/images/list.png', value: "list" },
						{ imgSrc: 'dist/images/grid.png', value: "grid" },
					]					
				});
				
			}
		};
	}
]);
angular.module('main-banner.js', [])
.directive('mainBanner', [
	function() {
		return {
			restrict: 'E',
			transclude: true,
			template: `
				<div class="main-banner">
					<ng-transclude></ng-transclude>
				</div>
			`
		};
	}
]);
angular.module('modal-dialog.js', [])
.directive('modalDialog', [
	function() {
		return {
			restrict: 'E',
			scope: {},
			transclude: true,
			controllerAs: 'vm',
			bindToController: {
				dismissModal: '&'
			},
			template: `
				<section class="modal-dialog">
					<div class="modal-shadow" ng-click="vm.dismissModal()"></div>
					<div class="modal-contents">
						<ng-transclude></ng-transclude>
					</div>
				</section>
			`,
			controller: function() {
				
			}
		};
	}
]);
angular.module('post-details-loading.js',[])
.directive('postDetailsLoading', [
	function(){
		return {
			restrict: 'E',
			template: `
				<article class="post-details post-details-loading">
					Loading...				
				</article>
			`	
		};
	}
]);
angular.module('post-details.js',[])
.directive('postDetails', [
	function(){
		return {
			restrict: 'E',
			scope: {},
			controllerAs: 'vm',
			bindToController: {
				post: '='
			},
			template: `
				<article class="post-details">
				
					<post-text post="vm.post"></post-text>
					
					<div class="post-media" ng-if="vm.post.multimedia">
						<div class="post-media-image" ng-if="vm.post.multimedia.mediaType == 'photo'">
							<img class="post-media-item" ng-src="{{vm.post.multimedia.imageUrl}}">
						</div>
						<div class="post-media-video" ng-if="vm.post.multimedia.mediaType == 'video'">
							<video class="post-media-item" controls ng-attr-poster="{{ vm.post.multimedia.poster }}">
								<source 
									ng-repeat="source in vm.post.multimedia.videos"
									ng-src="{{ source.videoUrl | trusted }}" 
									type="{{ source.mimeType }}"
								/>
							</video>
						</div>
					</div>
					
					<div class="post-replies-expand" ng-if="vm.post.replies" ng-click="vm.expanded = !vm.expanded" ng-class="{ 'expanded': vm.expanded }">
						<span ng-if="!vm.expanded">Expand </span>
						<span ng-if="vm.expanded">Collapse </span>
					</div>
					<footer class="post-replies" ng-if="vm.post.replies && vm.expanded">
						<post-text class="post-reply" ng-repeat="reply in vm.post.replies" post="reply"></post-text>
						<div class="post-add-reply">
							<input class="post-reply-text" type="text" placeholder="Reply...">
						</div>
					</footer>
					
				</article>
			`,
			controller: function() {
				angular.extend(this, {
					expanded: false
				});
			}	
		};
	}
])
.directive('postText', [
	function() {
		return {
			restrict: 'E',
			scope: {},
			controllerAs: 'vm',
			bindToController: {
				post: '='
			},
			template: `
				<img class="post-avatar" ng-src="{{vm.post.user.avatarUrl}}">
				
				<div class="post-actions">
					<span class="svg-reply" ng-include="'dist/images/reply.svg'"> (reply) </span>
					<span class="svg-heart" ng-include="'dist/images/heart.svg'"> (heart) </span>
					<span class="post-time" >
						{{ vm.post.timestamp }}
					</span>
				</div>

				<header class="post-header">
					<a class="post-user-name"> {{ vm.post.user.name }} </a>
				</header>
				
				<p class="post-message">
					{{ vm.post.message }}
				</p>
			
			`,
			controller: function() {
				
			}
		};
	}
]);
angular.module('create-post.js', [])
.directive('createPost', [
	function() {
		return {
			restrict: 'E',
			template: `
				<section class="create-post">
					<h3 class="create-post-title"> Create new message </h3>
					<textarea class="create-post-text"></textarea>

					<div class="create-post-actions">
						<a class="add-button">
							<span class="svg-add-photo" ng-include="'dist/images/add-photo.svg'"></span>
							Add Photo
						</a>
						<a class="add-button">
							<span class="svg-add-video" ng-include="'dist/images/add-video.svg'"></span>
							Add Video
						</a>
						
						<button class="create-post-button"> Post </button>
					</div>
				
				</section>
			`
		};
	}
]);
angular.module('title-bar.js', [])
.directive('titleBar', [
	'MockUsers',
	function(MockUsers) {
		return {
			restrict: 'E',
			scope: {},
			controllerAs: 'vm',
			bindToController: {
				mockRoute: '='
			},
			template: `
				<div class="title-bar-spacer"></div>
				<nav class="title-bar">
					<div class="title-bar-contents">
						<span class="title-group-one">
							<span class="simply-social-logo" ng-click="vm.mockRoute = 'home'">
								<span class="svg-logo" ng-include="'dist/images/simply-social-logo.svg'"></span>
								<span class="simply">simply</span><span class="social">social</span>
							</span>
						</span>
						<span class="title-group-two">
							<span class="svg-caption-add" ng-include="'dist/images/caption-add.svg'" ng-click="vm.showModal = true"></span>

							<modal-dialog ng-if="vm.showModal" dismiss-modal="vm.showModal = false">
								<create-post></create-post>
							</modal-dialog>
							
							<label class="search-box">
								<input class="search-text" type="text">
								<span class="svg-search-glass" ng-include="'dist/images/search-glass.svg'"></span>
							</label>
							<img class="title-bar-avatar" ng-src="{{vm.user.avatarUrl}}" ng-click="vm.mockRoute = 'settings'">
							{{ MockRouter.page }}
						</span>
						
					</div>
				</nav>
			`,
			controller: function() {
				var vm = this;
				vm.showModal = false;
				vm.user = MockUsers.meg;
			}
		};
	}
]);
angular.module('user-feed.js',[])
.directive('userFeed', [
	'FeedService',
	function(FeedService){
		return {
			restrict: 'E',
			scope: {},
			controllerAs: 'vm',
			bindToController: {
				filterType: '='
			},
			template: `
				<section class="user-feed">
					<post-details-loading ng-if="vm.loadingPosts"></post-details-loading>
					<post-details post="post" ng-repeat="post in vm.posts"></post-details>
				</section>
			`,
			controller: function() {
				var vm = this;
				
				vm.posts = [];
				vm.loadingPosts = true;
				FeedService.getCurrentUserFeed().then(function(posts) {
					vm.posts = posts;
					vm.loadingPosts = false;
				});
			}	
		};
	}
]);
angular.module('write-something.js', [])
.directive('writeSomething', [
	function() {
		return {
			restrict: 'E',
			template: `
				<div class="write-something">
					<input class="write-text" placeholder="What's on your mind?" type="text">
					
					<a class="add-button">
						<span class="svg-add-photo" ng-include="'dist/images/add-photo.svg'"></span>
						Add Photo
					</a>
					<a class="add-button">
						<span class="svg-add-video" ng-include="'dist/images/add-video.svg'"></span>
						Add Video
					</a>
					
				</div>
			`
		};
	}
]);
angular.module('home-page.js',[])
.directive('homePage', [
	function(){
		return {
			restrict: 'E',
			template: `
				<main-banner>
					<write-something></write-something>
					
					<list-filter></list-filter>
				</main-banner>
				
				<user-feed></user-feed>
				
				<main-footer></main-footer>
			`
		};
	}
]);
angular.module('profile-settings.js', [])
.directive('profileSettings', [
	'MockUsers',
	function(MockUsers) {
		return {
			restrict: 'E',
			bindToController: {},
			controllerAs: 'vm',
			template: `
			
				<section class="profile-settings">
					<form>
					
					<h1 class="profile-settings-title"> Settings </h1>
				
					<fieldset>
						<legend> Account </legend>
						<div class="account-group-one">
							<img class="user-avatar" ng-src="{{ vm.user.avatarUrl }}">
							<button class="profile-change-image"> change </button>
						</div>
						
						<div class="account-group-two">
							<input class="user-name-text" type="text" ng-model="vm.user.name">
							<input class="user-email-text" type="email" ng-model="vm.user.email">
							<input class="user-password-text" type="password" value="123456">
						</div>
						
					</fieldset>
					
					<fieldset>
						<legend> Notifications </legend>
						<div class="profile-notification" ng-repeat="option in vm.notificationOptions">
							<label> <input type="checkbox"> <span class="toggle-switch"></span> {{ option }} </label>
						</div>
						
					</fieldset>
					
					<fieldset>
						<legend> Privacy </legend>
						<div class="profile-privacy" ng-repeat="option in vm.privacyOptions">
							<label> <input type="checkbox" checked> <span class="toggle-radio"></span> {{ option }} </label>
						</div>
						
						
					</fieldset>
					
					<button class="profile-save-button"> Save Changes </button>
					
					
					</form>
				</section>
			`,
			controller: function() {
				var vm = this;
				
				vm.user = MockUsers.meg;
				
				vm.privacyOptions = [
					'allow anyone to tag me', 
					'only allow people I follow to tag me', 
					'don\'t allow anyone to tag me', 
					'add a location to my posts', 
					'let others find me by my email address', 
					'tailor ads based on my information'
				];
				
				vm.notificationOptions = [
					'email me when my posts are marked as favorites',
					'email me when I\'m mentioned',
					'email me when I get a reply',
					'email me when someone follows me'
				]
			}
		};
	}
]);
angular.module('FeedService.js', [])
.factory('FeedService', [
	'$timeout', 'MockPosts',
	function($timeout, MockPosts) {
		var FeedService = {
			getCurrentUserFeed: getCurrentUserFeed
		};
		
		function getCurrentUserFeed() {
			return $timeout(1000).then(function() {
				return MockPosts;
			});
		}
		
		
		return FeedService;
	}
]);
angular.module('MockMedia.js', [])
.factory('MockMedia', [
	function() {
		
		// Source: "Video For Everybody" http://camendesign.com/code/video_for_everybody
		var bigBuckBunny = {
			mediaType: 'video',
			width: 640, height: 360,
			poster: 'http://sandbox.thewikies.com/vfe-generator/images/big-buck-bunny_poster.jpg',
			videos: [
				{ mimeType: 'video/mp4', videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' },
				{ mimeType: 'video/webm', videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm' },
				{ mimeType: 'video/ogv', videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv' }
			]};
		
		var MockMedia = {
			images: {
				nature: { mediaType: 'photo', width: 800, height: 450, imageUrl: '//lorempixel.com/800/450/nature' },
				sports: { mediaType: 'photo', width: 800, height: 450, imageUrl: '//lorempixel.com/800/450/sports' },
			},
			videos: {
				bigBuckBunny: bigBuckBunny,
				nature: angular.extend({ poster: '//lorempixel.com/1280/720/nature' }, bigBuckBunny),
				sports: angular.extend({ poster: '//lorempixel.com/1280/720/sports' }, bigBuckBunny)
			}
		};
		
		return MockMedia;
	}
]);
angular.module('MockPosts.js', [])
.factory('MockPosts', [
	'MockUsers','MockMedia',
	function(MockUsers, MockMedia) {
		var MockPosts = [
			{ 
				user: MockUsers.sam,
				message: "How to Get Inspired: the Right Way - Designmoto bit.ly/1lE4uJc Good stuff from @designmodo!",
				multimedia: null,
				timestamp: "15m",
				replies: [
					{
						user: MockUsers.jed,
						message: "Great way to start the week.  Thanks for sharing!",
						timestamp: "8m"
					},
					{
						user: MockUsers.ren,
						message: "Feeling inspired now ... thanks for the great article @designmodo",
						timestamp: "3m"
					},
				]
			},
			{
				user: MockUsers.meg,
				message: "My view this morning is simply beautiful...",
				timestamp: "45m",
				multimedia: MockMedia.images.nature,
				replies: null
			},
			{
				user: MockUsers.sam,
				message: "A free, open source movie?  Cool! ",
				timestamp: "1h",
				multimedia: MockMedia.videos.bigBuckBunny,
			}
		];
		
		return MockPosts;
	}
]);
angular.module('MockUsers.js', [])
.factory('MockUsers', [
	function() {
		var MockUsers = {
			meg: { name: "Meg Robichaud", avatarUrl: "//lorempixel.com/100/100/people/1", email: "meg.robichaud@email.com" },
			sam: { name: "Sam Soffes", avatarUrl: "//lorempixel.com/100/100/people/2" },
			jed: { name: "Jed Bridges", avatarUrl: "//lorempixel.com/100/100/people/3" },
			ren: { name: "Ren Walker", avatarUrl: "//lorempixel.com/100/100/people/4" },
		};
		
		return MockUsers;
	}
]);
angular.module('TrustedFilter.js', [])
.filter('trusted', [
	'$sce',
	function($sce) {
		return function _TrustedFilter(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}
]);
//# sourceMappingURL=app.combined.es6.js.map