(function(config, models, views, routers, utils) {

// The Router
// ---------------

routers.Application = Backbone.Router.extend({
  initialize: function() {
    
    // Using this.route, because order matters
    this.route(":repo", 'posts', this.posts);
    this.route(/(.*\/.*)/, 'posts', this.posts);
    this.route(/(.*\/.*)\/(.*\.md)/, 'post', this.post);
    this.route(/(.*\/.*)\/new$/, 'new_post', this.newPost);
    this.route("", "start", app.instance.start);
  },

  extractURL: function(url) {
    url = url.split('/');

    app.state = {
      user: url[0],
      repo: url[1],
      branch: url[2],
      path: (url.slice(3) || []).join('/')
    };
    return [app.state.user, app.state.repo, app.state.branch, app.state.path]
  },

  // #example-user/example-repo/gh-pages/path/to/new
  newPost: function(url) {
    app.instance.newPost.apply(this, this.extractURL(url));
  },

  // #example-user/example-repo/gh-pages/path/to
  // #example-user/example-repo/gh-pages
  posts: function(url) {
    app.instance.posts.apply(this, this.extractURL(url));
  },

  // #example-user/example-repo/gh-pages/path/to/2012-01-01.md
  post: function(url, file) {
    app.instance.post.apply(this, this.extractURL(url).concat(file));
  }
});

}).apply(this, window.args);