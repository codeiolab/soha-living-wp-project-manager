webpackJsonp([5],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrap cpm cpm-front-end"
  }, [_c('div', {
    staticClass: "cpm-top-bar cpm-no-padding cpm-project-header cpm-project-head"
  }, [_c('div', {
    staticClass: "cpm-row cpm-no-padding cpm-border-bottom"
  }, [_c('div', {
    staticClass: "cpm-col-6 cpm-project-detail"
  }, [_c('h3', [_c('span', {
    staticClass: "cpm-project-title"
  }, [_vm._v(" eirugkdj ")]), _vm._v(" "), _c('a', {
    staticClass: "cpm-icon-edit cpm-project-edit-link small-text",
    attrs: {
      "href": "#"
    }
  }, [_c('span', {
    staticClass: "dashicons dashicons-edit"
  }), _vm._v(" "), _c('span', {
    staticClass: "text"
  }, [_vm._v("Edit")])])]), _vm._v(" "), _c('div', {
    staticClass: "detail"
  })]), _vm._v(" "), _c('div', {
    staticClass: "cpm-col-6 cpm-last-col cpm-top-right-btn cpm-text-right show_desktop_only"
  }, [_c('div', {
    staticClass: "cpm-single-project-search-wrap"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "data-project_id": "60",
      "placeholder": "Search...",
      "id": "cpm-single-project-search"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cpm-project-action"
  }, [_c('span', {
    staticClass: "dashicons dashicons-admin-generic cpm-settings-bind"
  }), _vm._v(" "), _c('ul', {
    staticClass: "cpm-settings"
  }, [_c('li', [_c('span', {
    staticClass: "cpm-spinner"
  }), _vm._v(" "), _c('a', {
    staticClass: "cpm-project-delete-link",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects",
      "title": "Delete project",
      "data-confirm": "Are you sure to delete this project?",
      "data-project_id": "60"
    }
  }, [_c('span', {
    staticClass: "dashicons dashicons-trash"
  }), _vm._v(" "), _c('span', [_vm._v("Delete")])])]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "cpm-spinner"
  }), _vm._v(" "), _c('a', {
    staticClass: "cpm-archive",
    attrs: {
      "data-type": "archive",
      "data-project_id": "60",
      "href": "#"
    }
  }, [_c('span', {
    staticClass: "dashicons dashicons-yes"
  }), _vm._v(" "), _c('span', [_vm._v("Complete")])])]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "cpm-spinner"
  }), _vm._v(" "), _c('a', {
    staticClass: "cpm-duplicate-project",
    attrs: {
      "href": "/test/wp-admin/admin.php?page=cpm_projects&tab=project&action=overview&pid=60",
      "data-project_id": "60"
    }
  }, [_c('span', {
    staticClass: "dashicons dashicons-admin-page"
  }), _vm._v(" "), _c('span', [_vm._v("Duplicate")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }), _vm._v(" "), _c('div', {
    staticClass: "cpm-edit-project",
    staticStyle: {
      "display": "none"
    }
  }, [_c('form', {
    staticClass: "cpm-project-form",
    attrs: {
      "action": "",
      "method": "post"
    }
  }, [_c('input', {
    attrs: {
      "type": "hidden",
      "id": "_wpnonce",
      "name": "_wpnonce",
      "value": "9dd08c1e0f"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "hidden",
      "name": "_wp_http_referer",
      "value": "/test/wp-admin/admin.php?page=cpm_projects&tab=project&action=overview&pid=60"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "cpm-form-item project-name"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "project_name",
      "id": "project_name",
      "placeholder": "Name of the project",
      "value": "eirugkdj",
      "size": "45"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cpm-form-item project-category"
  }, [_c('select', {
    staticClass: "chosen-select",
    attrs: {
      "name": "project_cat",
      "id": "project_cat"
    }
  }, [_c('option', {
    attrs: {
      "value": "-1",
      "selected": "selected"
    }
  }, [_vm._v("– Project Category –")])])]), _vm._v(" "), _c('div', {
    staticClass: "cpm-form-item project-detail"
  }, [_c('textarea', {
    staticClass: "cpm-project-description",
    attrs: {
      "name": "project_description",
      "id": "",
      "cols": "50",
      "rows": "3",
      "placeholder": "Some details about the project (optional)"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cpm-form-item cpm-project-role"
  }, [_c('table')]), _vm._v(" "), _c('div', {
    staticClass: "cpm-form-item project-users"
  }, [_c('input', {
    staticClass: "cpm-project-coworker",
    attrs: {
      "type": "text",
      "name": "",
      "placeholder": "Type 3 or more characters to search users...",
      "size": "45"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "cpm-form-item project-notify"
  }, [_c('input', {
    attrs: {
      "type": "hidden",
      "name": "project_notify",
      "value": "no"
    }
  }), _vm._v(" "), _c('label', [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": "project_notify",
      "id": "project-notify",
      "value": "yes"
    }
  }), _vm._v("\n\t\t\t\t                Notify Co-Workers            \n\t\t\t\t            ")])]), _vm._v(" "), _c('div', {
    staticClass: "submit"
  }, [_c('input', {
    attrs: {
      "type": "hidden",
      "name": "project_id",
      "value": "60"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "hidden",
      "name": "action",
      "value": "cpm_project_update"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "cpm-pro-update-spinner"
  }), _vm._v(" "), _c('input', {
    staticClass: "button-primary",
    attrs: {
      "type": "submit",
      "name": "add_project",
      "id": "add_project",
      "value": "Update Project"
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "button project-cancel",
    attrs: {
      "href": "#"
    }
  }, [_vm._v("Cancel")])]), _vm._v(" "), _c('div', {
    staticClass: "cpm-loading",
    staticStyle: {
      "display": "none"
    }
  }, [_vm._v("Saving...")])])])]), _vm._v(" "), _c('div', {
    staticClass: "cpm-row cpm-project-group"
  }, [_c('ul', [_c('li', [_c('a', {
    staticClass: "overview cpm-sm-col-12 active",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=project&action=overview&pid=60",
      "title": "Overview"
    }
  }, [_c('span', [_vm._v("Overview")]), _vm._v(" "), _c('div')])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "activity cpm-sm-col-12",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=project&action=single&pid=60",
      "title": "Activities"
    }
  }, [_vm._v("\n\t\t            \t\tActivities\n\t\t            \t\t"), _c('div', [_vm._v("41")])])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "message cpm-sm-col-12",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=message&action=index&pid=60",
      "title": "Discussions"
    }
  }, [_vm._v("\n\t\t            \t\tDiscussions\n\t\t            \t\t"), _c('div', [_vm._v("0")])])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "to-do-list cpm-sm-col-12",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=task&action=index&pid=60",
      "title": "Task Lists"
    }
  }, [_vm._v("\n\t\t            \t\tTask Lists\n\t\t            \t\t"), _c('div', [_vm._v("1")])])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "milestone cpm-sm-col-12",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=milestone&action=index&pid=60",
      "title": "Milestones"
    }
  }, [_vm._v("\n\t\t            \t\tMilestones\n\t\t            \t\t"), _c('div', [_vm._v("0")])])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "files cpm-sm-col-12",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=files&action=index&pid=60",
      "title": "Files"
    }
  }, [_vm._v("\n\t\t            \t\tFiles\n\t\t            \t\t"), _c('div', [_vm._v("0")])])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "settings cpm-sm-col-12",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=settings&action=index&pid=60",
      "title": "Settings"
    }
  }, [_vm._v("\n\t\t            \t\tSettings\n\t\t            \t\t"), _c('div')])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "cpminvoice cpm-sm-col-12",
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=invoice&action=index&pid=60",
      "title": "Invoice"
    }
  }, [_vm._v("\n\t\t            \t\tInvoice\n\t\t            \t\t"), _c('div')])])])]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  })]), _vm._v(" "), _c('div', {
    staticClass: "project-overview"
  }, [_c('div', {
    staticClass: "cpm-col-10 cpm-sm-col-12"
  }, [_c('div', {
    staticClass: "overview-menu"
  }, [_c('ul', [_c('li', {
    staticClass: "message"
  }, [_c('a', {
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=message&action=index&pid=60"
    }
  }, [_c('div', {
    staticClass: "icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "count"
  }, [_c('span', [_vm._v("0")]), _vm._v(" \n\t\t\t         \t\t\t\tDiscussions\n\t\t\t         \t\t\t")])])]), _vm._v(" "), _c('li', {
    staticClass: "todo"
  }, [_c('a', {
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=task&action=index&pid=60"
    }
  }, [_c('div', {
    staticClass: "icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "count"
  }, [_c('span', [_vm._v("1")]), _vm._v(" \n\t\t\t         \t\t\t\tTask List\n\t\t\t         \t\t\t")])])]), _vm._v(" "), _c('li', {
    staticClass: "todos"
  }, [_c('a', {
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=task&action=index&pid=60"
    }
  }, [_c('div', {
    staticClass: "icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "count"
  }, [_c('span', [_vm._v("1")]), _vm._v(" \n\t\t\t\t         \t\t\tTask\n\t\t\t\t         \t\t")])])]), _vm._v(" "), _c('li', {
    staticClass: "comments"
  }, [_c('a', [_c('div', {
    staticClass: "icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "count"
  }, [_c('span', [_vm._v("0")]), _vm._v(" \n\t\t\t\t\t         \t\tComments\n\t\t\t\t\t         \t")])])]), _vm._v(" "), _c('li', {
    staticClass: "files"
  }, [_c('a', {
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=files&action=index&pid=60"
    }
  }, [_c('div', {
    staticClass: "icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "count"
  }, [_c('span', [_vm._v("0")]), _vm._v(" \n\t\t\t\t\t\t    \t\t\tFiles\n\t\t\t\t\t\t    \t")])])]), _vm._v(" "), _c('li', {
    staticClass: "milestone"
  }, [_c('a', {
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_projects&tab=milestone&action=index&pid=60"
    }
  }, [_c('div', {
    staticClass: "icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "count"
  }, [_c('span', [_vm._v("0")]), _vm._v(" \n\t\t\t\t\t\t\t\t\t\tMilestones\n\t\t\t\t\t\t\t\t")])])]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "cpm-chart",
    attrs: {
      "id": "cpm-chart"
    }
  }, [_c('h3', [_vm._v("Last 30 days")]), _vm._v(" "), _c('div', {
    staticClass: "inside"
  }, [_c('div', {
    staticClass: "cpm-chart-legend cpm-text-right"
  }, [_c('span', {
    staticClass: "to-do"
  }, [_vm._v("Task")]), _vm._v(" "), _c('span', {
    staticClass: "activity"
  }, [_vm._v("Activity")])]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }), _vm._v(" "), _c('canvas', {
    staticStyle: {
      "width": "819px",
      "height": "328px"
    },
    attrs: {
      "width": "1638",
      "height": "656"
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "cpm-col-2 cpm-sm-col-12 cpm-right-part cpm-last-col"
  }, [_c('h3', {
    staticClass: "cpm-border-bottom"
  }, [_vm._v(" Users ")]), _vm._v(" "), _c('ul', {
    staticClass: "user_list"
  }, [_c('li', [_c('img', {
    staticClass: "avatar avatar-34 photo",
    attrs: {
      "alt": "admin",
      "src": "//www.gravatar.com/avatar/873b98cc2b8493be36707ba58929dfec?s=34&r=g&d=mm",
      "srcset": "//www.gravatar.com/avatar/873b98cc2b8493be36707ba58929dfec?s=34&r=g&d=mm 2x",
      "height": "34",
      "width": "34"
    }
  }), _vm._v(" "), _c('a', {
    attrs: {
      "href": "http://localhost/test/wp-admin/admin.php?page=cpm_task&user_id=1",
      "title": "admin"
    }
  }, [_vm._v("admin")]), _c('span', [_vm._v("Manager")])])])]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  })])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ebe1519a", esExports)
  }
}

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ebe1519a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_overview_vue__ = __webpack_require__(110);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ebe1519a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_overview_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "view/assets/js/components/overview/overview.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] overview.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ebe1519a", Component.options)
  } else {
    hotAPI.reload("data-v-ebe1519a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});