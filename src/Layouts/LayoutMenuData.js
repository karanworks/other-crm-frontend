import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedinUser } from "../helpers/api_helper";

//Import Icons
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";

const Navdata = () => {
  const history = useNavigate();

  // const menuDataOfUser = useSelector((state) => state.Login.user.menus);
  const userData = getLoggedinUser();
  const menuDataOfUser = userData.data.menus;

  //state data
  const [isAdminTools, setIsAdminTools] = useState(false);
  const [isLeadManagement, setIsLeadManagement] = useState(false);
  const [isPayments, setIsPayments] = useState(false);

  //
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Home");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    if (iscurrentState !== "AdminTools") {
      setIsAdminTools(false);
    }
    if (iscurrentState !== "LeadManagement") {
      setIsLeadManagement(false);
    }
    if (iscurrentState !== "Payments") {
      setIsPayments(false);
    }

    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
  }, [
    history,
    iscurrentState,
    isAdminTools,
    isLeadManagement,
    isPayments,

    isAuth,
    isPages,
  ]);

  const parentMenuStates = {
    AdminTools: isAdminTools,
    LeadManagement: isLeadManagement,
    Payments: isPayments,
  };

  const handleClick = (menuLabelId) => {
    return function (e) {
      e.preventDefault();
      switch (menuLabelId) {
        case "AdminTools":
          setIsAdminTools(!isAdminTools);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "LeadManagement":
          setIsLeadManagement(!isLeadManagement);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
        case "Payments":
          setIsPayments(!isPayments);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
      }
    };
  };

  const dynamicMenuData = menuDataOfUser?.map((menu) => {
    // menuLableId me "label" ki spelling galat hai database me glt thi to testing ke liye galat likh kar hi check kr rha
    const updatedMenu = {
      ...menu,
      icon: <FeatherIcon icon={menu.icon} className="icon-dual" />,
      stateVariables: parentMenuStates[menu.menuLableId],
      click: handleClick(menu.menuLableId),
    };
    return updatedMenu;
  });

  // const menuItems = [
  //   {
  //     id: "home",
  //     label: "Home",
  //     icon: <FeatherIcon icon="home" className="icon-dual" />,
  //     link: "/home",
  //     stateVariables: isHome,
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsHome(!isHome);
  //       setIscurrentState("Home");
  //       updateIconSidebar(e);
  //     },
  //     subItems: false,
  //   },

  //   {
  //     id: "systemConfiguration",
  //     label: "System Configuration",
  //     icon: <FeatherIcon icon="settings" className="icon-dual" />,
  //     link: "/#",
  //     stateVariables: isSystemConfiguration,
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsSystemConfiguration(!isSystemConfiguration);
  //       setIscurrentState("SystemConfiguration");
  //       updateIconSidebar(e);
  //     },
  //     subItems: [
  //       {
  //         id: "users",
  //         label: "Users",
  //         link: "/users",
  //         parentId: "systemConfiguration",
  //       },

  //       {
  //         id: "aclRules",
  //         label: "ACL Rules",
  //         link: "/#",
  //         parentId: "systemConfiguration",
  //       },
  //       {
  //         id: "userModeMaster",
  //         label: "User Mode Master",
  //         link: "/#",
  //         parentId: "systemConfiguration",
  //       },
  //       {
  //         id: "menuMapping",
  //         label: "Menu Mapping",
  //         link: "/#",
  //         parentId: "systemConfiguration",
  //       },
  //       {
  //         id: "userStatusColour",
  //         label: "User Status Colour",
  //         link: "/#",
  //         parentId: "systemConfiguration",
  //       },
  //       {
  //         id: "userModePermission",
  //         label: "User Mode Permission",
  //         link: "/#",
  //         parentId: "systemConfiguration",
  //       },
  //       {
  //         id: "extensionDetail",
  //         label: "Extension Detail",
  //         link: "/#",
  //         parentId: "systemConfiguration",
  //       },
  //       {
  //         id: "disposition",
  //         label: "Disposition",
  //         link: "/#",
  //         parentId: "systemConfiguration",
  //       },
  //       {
  //         id: "callbackPolicy",
  //         label: "Callback Policy",
  //         link: "/#",
  //         parentId: "systemConfiguration",
  //       },
  //     ],
  //   },

  //   {
  //     id: "campaignManagement",
  //     label: "Campaign Management",
  //     icon: <FeatherIcon icon="folder" className="icon-dual" />,
  //     link: "/#",
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsCampaignManagement(!isCampaignManagement);
  //       setIscurrentState("CampaignManagement");
  //       updateIconSidebar(e);
  //     },
  //     stateVariables: isCampaignManagement,
  //     subItems: [
  //       {
  //         id: "campaign",
  //         label: "Campaign",
  //         link: "/campaign",
  //         parentId: "campaignManagement",
  //       },
  //       {
  //         id: "crmConfiguration",
  //         label: "CRM Configuration",
  //         link: "/crm-configuration",
  //         parentId: "campaignManagement",
  //       },
  //       {
  //         id: "mapping",
  //         label: "Mapping",
  //         link: "/mapping",
  //         parentId: "campaignManagement",
  //       },
  //       {
  //         id: "campaignTransferMapping ",
  //         label: "Campaign Transfer Mapping",
  //         link: "/#",
  //         parentId: "campaignManagement",
  //       },
  //     ],
  //   },

  //   {
  //     id: "leadManagement",
  //     label: "Lead Management",
  //     link: "/#",
  //     icon: <FeatherIcon icon="git-branch" className="icon-dual" />,

  //     click: function (e) {
  //       e.preventDefault();
  //       setIsLeadManagement(!isLeadManagement);
  //       setIscurrentState("LeadManagement");
  //       updateIconSidebar(e);
  //     },
  //     stateVariables: isLeadManagement,
  //     subItems: [
  //       {
  //         id: "importLead",
  //         label: "Import Lead",
  //         link: "/#",
  //         parentId: "leadManagement",
  //       },
  //       {
  //         id: "leadManager",
  //         label: "Lead Manager",
  //         link: "/#",
  //         parentId: "leadManagement",
  //       },
  //       {
  //         id: "crmData",
  //         label: "CRM Data",
  //         link: "/#",
  //         parentId: "leadManagement",
  //       },
  //     ],
  //   },
  //   {
  //     id: "otherManagement",
  //     label: "Other Management",
  //     link: "/#",
  //     icon: <FeatherIcon icon="users" className="icon-dual" />,
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsOtherManagement(!isOtherManagement);
  //       setIscurrentState("OtherManagement");
  //       updateIconSidebar(e);
  //     },
  //     stateVariables: isOtherManagement,
  //     subItems: [
  //       {
  //         id: "freeAgent",
  //         label: "Free Agent",
  //         link: "/#",
  //         parentId: "otherManagement",
  //       },
  //     ],
  //   },

  //   {
  //     id: "monitoring",
  //     label: "Monitoring",
  //     icon: <FeatherIcon icon="video" className="icon-dual" />,
  //     link: "/#",
  //     stateVariables: isMonitoring,
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsMonitoring(!isMonitoring);
  //       setIscurrentState("Monitoring");
  //       updateIconSidebar(e);
  //     },
  //     subItems: [
  //       {
  //         id: "userStatus",
  //         label: "User Status",
  //         link: "/#",
  //         parentId: "monitoring",
  //       },
  //     ],
  //   },
  //   {
  //     id: "quality",
  //     label: "Quality",
  //     icon: <FeatherIcon icon="mic" className="icon-dual" />,
  //     link: "/#",
  //     stateVariables: isQuality,
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsQuality(!isQuality);
  //       setIscurrentState("Quality");
  //       updateIconSidebar(e);
  //     },
  //     subItems: [
  //       {
  //         id: "searchRecording",
  //         label: "Search Recording",
  //         link: "/#",
  //         parentId: "quality",
  //       },
  //     ],
  //   },
  //   {
  //     id: "analytics",
  //     label: "Analytics",
  //     icon: <FeatherIcon icon="pie-chart" className="icon-dual" />,
  //     link: "/#",
  //     stateVariables: isAnalytics,
  //     click: function (e) {
  //       e.preventDefault();
  //       setIsAnalytics(!isAnalytics);
  //       setIscurrentState("Analytics");
  //       updateIconSidebar(e);
  //     },
  //     subItems: [
  //       {
  //         id: "userSession",
  //         label: "User Session",
  //         link: "/#",
  //         parentId: "analytics",
  //       },
  //       {
  //         id: "dispositionReport",
  //         label: "Disposition",
  //         link: "/#",
  //         parentId: "analytics",
  //       },
  //     ],
  //   },
  // ];

  // menuLableId me "label" ki spelling galat hai database me glt thi to testing ke liye galat likh kar hi check kr rha
  return <React.Fragment>{dynamicMenuData}</React.Fragment>;
};

export default Navdata;
