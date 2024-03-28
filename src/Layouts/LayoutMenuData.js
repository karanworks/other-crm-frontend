import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Import Icons
import FeatherIcon from "feather-icons-react";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isHome, setIsHome] = useState(false);
  const [isSystemConfiguration, setIsSystemConfiguration] = useState(false);
  const [isOperationalConfiguration, setIsOperationalConfiguration] =
    useState(false);
  const [isCampaignManagement, setIsCampaignManagement] = useState(false);
  const [isLeadManagement, setIsLeadManagement] = useState(false);
  const [isOtherManagement, setIsOtherManagement] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isQuality, setIsQuality] = useState(false);
  const [isAnalytics, setIsAnalytics] = useState(false);
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
    if (iscurrentState !== "Home") {
      setIsHome(false);
    }
    if (iscurrentState !== "SystemConfiguration") {
      setIsSystemConfiguration(false);
    }
    if (iscurrentState !== "OperationalConfiguration") {
      setIsOperationalConfiguration(false);
    }
    if (iscurrentState !== "CampaignManagement") {
      setIsCampaignManagement(false);
    }
    if (iscurrentState !== "LeadManagement") {
      setIsLeadManagement(false);
    }
    if (iscurrentState !== "OtherManagement") {
      setIsOtherManagement(false);
    }
    if (iscurrentState !== "Monitoring") {
      setIsMonitoring(false);
    }
    if (iscurrentState !== "Quality") {
      setIsQuality(false);
    }
    if (iscurrentState !== "Analytics") {
      setIsAnalytics(false);
    }

    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }

    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Landing") {
      setIsLanding(false);
    }
  }, [history, iscurrentState, isSystemConfiguration, isAuth, isPages]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "home",
      label: "Home",
      icon: <FeatherIcon icon="home" className="icon-dual" />,
      link: "/home",
      stateVariables: isHome,
      click: function (e) {
        e.preventDefault();
        setIsHome(!isHome);
        setIscurrentState("Home");
        updateIconSidebar(e);
      },
      subItems: false,
    },

    {
      id: "systemConfiguration",
      label: "System Configuration",
      icon: <FeatherIcon icon="settings" className="icon-dual" />,
      link: "/#",
      stateVariables: isSystemConfiguration,
      click: function (e) {
        e.preventDefault();
        setIsSystemConfiguration(!isSystemConfiguration);
        setIscurrentState("SystemConfiguration");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "users",
          label: "Users",
          link: "/users",
          parentId: "systemConfiguration",
        },

        {
          id: "aclRules",
          label: "ACL Rules",
          link: "/#",
          parentId: "systemConfiguration",
        },
        {
          id: "userModeMaster",
          label: "User Mode Master",
          link: "/#",
          parentId: "systemConfiguration",
        },
        {
          id: "menuMapping",
          label: "Menu Mapping",
          link: "/#",
          parentId: "systemConfiguration",
        },
        {
          id: "userStatusColour",
          label: "User Status Colour",
          link: "/#",
          parentId: "systemConfiguration",
        },
        {
          id: "userModePermission",
          label: "User Mode Permission",
          link: "/#",
          parentId: "systemConfiguration",
        },
        {
          id: "extensionDetail",
          label: "Extension Detail",
          link: "/#",
          parentId: "systemConfiguration",
        },
        {
          id: "disposition",
          label: "Disposition",
          link: "/#",
          parentId: "systemConfiguration",
        },
        {
          id: "callbackPolicy",
          label: "Callback Policy",
          link: "/#",
          parentId: "systemConfiguration",
        },
      ],
    },
    {
      id: "operationalConfiguration",
      label: "Operational Configuration",
      icon: <FeatherIcon icon="git-branch" className="icon-dual" />,
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsOperationalConfiguration(!isOperationalConfiguration);
        setIscurrentState("OperationalConfiguration");
        updateIconSidebar(e);
      },
      stateVariables: isOperationalConfiguration,
      subItems: [
        {
          id: "campaignManagement",
          label: "Campaign Management",
          link: "/#",
          parentId: "operationalConfiguration",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsCampaignManagement(!isCampaignManagement);
          },
          stateVariables: isCampaignManagement,
          childItems: [
            {
              id: "campaign",
              label: "Campaign",
              link: "/campaign",
              parentId: "campaignManagement",
            },
            {
              id: "crmConfiguration",
              label: "CRM Configuration",
              link: "/crm-configuration",
              parentId: "campaignManagement",
            },
            {
              id: "mapping",
              label: "Mapping",
              link: "/#",
              parentId: "campaignManagement",
            },
            {
              id: "campaignTransferMapping ",
              label: "Campaign Transfer Mapping",
              link: "/#",
              parentId: "campaignManagement",
            },
          ],
        },
        {
          id: "leadManagement",
          label: "Lead Management",
          link: "/#",
          parentId: "operationalConfiguration",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsLeadManagement(!isLeadManagement);
          },
          stateVariables: isLeadManagement,
          childItems: [
            {
              id: "importLead",
              label: "Import Lead",
              link: "/#",
              parentId: "leadManagement",
            },
            {
              id: "leadManager",
              label: "Lead Manager",
              link: "/#",
              parentId: "leadManagement",
            },
            {
              id: "crmData",
              label: "CRM Data",
              link: "/#",
              parentId: "leadManagement",
            },
          ],
        },
        {
          id: "otherManagement",
          label: "Other Management",
          link: "/#",
          parentId: "operationalConfiguration",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsOtherManagement(!isOtherManagement);
          },
          stateVariables: isOtherManagement,
          childItems: [
            {
              id: "freeAgent",
              label: "Free Agent",
              link: "/#",
              parentId: "otherManagement",
            },
          ],
        },
      ],
    },
    {
      id: "monitoring",
      label: "Monitoring",
      icon: <FeatherIcon icon="video" className="icon-dual" />,
      link: "/#",
      stateVariables: isMonitoring,
      click: function (e) {
        e.preventDefault();
        setIsMonitoring(!isMonitoring);
        setIscurrentState("Monitoring");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "userStatus",
          label: "User Status",
          link: "/#",
          parentId: "monitoring",
        },
      ],
    },
    {
      id: "quality",
      label: "Quality",
      icon: <FeatherIcon icon="mic" className="icon-dual" />,
      link: "/#",
      stateVariables: isQuality,
      click: function (e) {
        e.preventDefault();
        setIsQuality(!isQuality);
        setIscurrentState("Quality");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "searchRecording",
          label: "Search Recording",
          link: "/#",
          parentId: "quality",
        },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <FeatherIcon icon="pie-chart" className="icon-dual" />,
      link: "/#",
      stateVariables: isAnalytics,
      click: function (e) {
        e.preventDefault();
        setIsAnalytics(!isAnalytics);
        setIscurrentState("Analytics");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "userSession",
          label: "User Session",
          link: "/#",
          parentId: "analytics",
        },
        {
          id: "dispositionReport",
          label: "Disposition",
          link: "/#",
          parentId: "analytics",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
