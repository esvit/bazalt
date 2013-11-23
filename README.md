BAZALT
======
[![Build Status](https://travis-ci.org/esvit/bazalt.png?branch=master)](https://travis-ci.org/esvit/bazalt) [![Coverage Status](https://coveralls.io/repos/esvit/bazalt/badge.png)](https://coveralls.io/r/esvit/bazalt)

This is enviroment for create web applications (CMF) the base of which developed content management system (CMS).

Using the framework BAZALT allows you to create websites and web applications for different purposes and levels of complexity.

The structure framework implements the principles of MVC and allows efficient separate functional development of parts management, algorithmic processing, and implementation of user interface.

Features
--------

- simple, fast and easy to use (extremely lightweight);
- easy access to the database because of its lightweight and simple ORM;
- MVC implementation;
- multisite on one and the same engine;
- multi-language interface and content;
- modularity;
- RBAC (Role Based Access Control);
- search-engine friendly URLs + flexible URI routing;
- error logging;
- 100% Object Oriented Programming with autoloading;

Technologies (Integrated features)
----------------------------------

* Javascript
    - RequireJS (AMD modules)
    - jQuery and AngularJS build-in frontend
* PHP
    - [API Server](https://github.com/esvit/bazalt-api)

How to create site on Bazalt CMS
--------------------------------
```
npm install -g yo generator-bazalt
yo bazalt
grunt less
grunt server
```


Doc
---

'bazalt.config' - config.api() - API server
                        .templatePrefix
                        .templateUrl
                        .resource

