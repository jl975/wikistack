var express = require('express');
var router = express.Router();
var models = require('../models');

var Page = models.Page;
var User = models.User;

router.get('/',function(req, res, next)
{
  Page.find({}).exec()
  .then(function(pages)
  {
    res.render('index', {pages: pages})
  })
  .catch(res.send);
});

router.get('/add', function(req, res, next)
{
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next)
{
  var urlTitle = req.params.urlTitle;
  Page.findOne({urlTitle: urlTitle}).exec()
  .then(function(page)
  { console.log(page);
    res.render('wikipage', {render:page});
  })
  .catch(next);
});

router.post('/', function(req, res, next)
{
  var postBody = req.body;
  var firstName = postBody.firstName;
  var lastName = postBody.lastName;
  var email = postBody.email;
  var title = postBody.title;
  var pageContent = postBody.pageContent;
  var tags = postBody.tags;


  User.findOne({email: email})
  .then(function(user)
  {
    if(!user)
    {
        user = new User(
        {
          name: {first: firstName, last: lastName},
          email: email
        });
        user.save(function(err)
        {
          if(err) throw err;
        })
        .then(console.log)
        .catch(console.log);
    }
    return user;
  })
  .then(function(user)
  {
    var page = new Page({
      title:    title,
      urlTitle: models.generateUrlTitle(title),
      content:  pageContent,
      status:   'open',
      author:   user._id
    });
    page.save(function(err)
    {
      if(err) next(err);
    })
    .then(function(savedPage)
    {
      res.redirect(savedPage.route);
    })
    .catch(next);
  })
  .catch(console.log);
});
module.exports = router;
