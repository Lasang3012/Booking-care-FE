export const adminMenu = [
  {
    // quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.manage-doctor",
        link: "/system/user-manage",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        // ],
      },

      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      {
        name: "menu.admin.crud",
        link: "/system/crud",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/crud-redux",
      },
      // {
      //   name: "menu.system.system-parameter.header",
      //   link: "/system/system-parameter",
      // },
    ],
  },

  {
    // quản lý phòng khám
    name: "menu.admin.manage-clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    // quản lý chuyên kha
    name: "menu.admin.manage-specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    // quản lý cẩm nang
    name: "menu.admin.manage-handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
