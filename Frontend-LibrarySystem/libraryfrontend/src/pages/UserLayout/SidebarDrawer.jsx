import React from "react";
import { Box, Tooltip, Typography, Avatar, Divider } from "@mui/material";
import { Dashboard, MenuBook } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { alpha } from "@mui/material/styles";
import { navigationItems, secondaryItems } from "./NavigationItems";
import { useLocation, useNavigate } from "react-router";
import { Logout } from "@mui/icons-material";
import { isActive } from "./util";

const SidebarDrawer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangePath = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "300px",
          background:
            "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 100%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "relative",
          zIndex: 1,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
            fontWeight: "bold",
            fontSize: "1.5rem",
            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
            flexShrink: 0,
          }}
        >
          <MenuBook />
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              letterSpacing: 0.5,
              background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            DevLibrary
          </Typography>
          <Typography
            variant="caption"
            sx={{
              opacity: 0.7,
              fontWeight: 500,
              letterSpacing: 1,
              textTransform: "uppercase",
              display: "block",
              margin: 0,
            }}
          >
            Library Hub
          </Typography>
        </Box>
      </Box>

      {/* Main Navigation Items */}
      <List
        sx={{
          px: 1.5,
          py: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {navigationItems.map((item, index) => {
          const active = isActive(item.path, location);

          return (
            <Tooltip
              key={index}
              title={item.description || item.title}
              placement="right"
              arrow
            >
              <ListItemButton
                onClick={() => handleChangePath(item.path)}
                sx={{
                  borderRadius: 1.5,
                  py: 1.25,
                  px: 1.5,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 1.5,
                  bgcolor: active ? alpha("#6366f1", 0.15) : "transparent",
                  border: active ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
                  backdropFilter: active ? "blur(10px)" : "none",
                  "&:hover": {
                    bgcolor: active
                      ? alpha("#6366f1", 0.3)
                      : alpha("#ffffff", 0.05),
                    transform: "translateX(4px)",
                  },
                  "&::before": active
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: "65%",
                        borderRadius: "0 3px 3px 0",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 0 12px rgba(102, 126, 234, 0.6)",
                      }
                    : {},
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: active ? "#818cf8" : "rgba(255, 255, 255, 0.7)",
                    transition: "all 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: active ? 600 : 500,
                    color: active ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </Typography>
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Divider */}
      <Divider
        sx={{
          my: 1,
          mx: 1.5,
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      />

      {/* Secondary Navigation Items */}
      <List
        sx={{
          px: 1.5,
          py: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          flexGrow: 1,
        }}
      >
        {secondaryItems.map((item, index) => {
          const active = isActive(item.path, location);

          return (
            <Tooltip
              key={index}
              title={item.description || item.title}
              placement="right"
              arrow
            >
              <ListItemButton
                onClick={() => handleChangePath(item.path)}
                sx={{
                  borderRadius: 1.5,
                  py: 1.25,
                  px: 1.5,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 1.5,
                  bgcolor: active ? alpha("#6366f1", 0.15) : "transparent",
                  border: active
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "none",
                  backdropFilter: active ? "blur(10px)" : "none",
                  "&:hover": {
                    bgcolor: active
                      ? alpha("#6366f1", 0.3)
                      : alpha("#ffffff", 0.05),
                    transform: "translateX(4px)",
                  },
                  "&::before": active
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: "65%",
                        borderRadius: "0 3px 3px 0",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 0 12px rgba(102, 126, 234, 0.6)",
                      }
                    : {},
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: active ? "#818cf8" : "rgba(255, 255, 255, 0.7)",
                    transition: "all 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: active ? 600 : 500,
                    color: active ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </Typography>
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      {/* Logout Button & Footer */}
      <Box
        sx={{
          px: 1.5,
          py: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1.5,
            py: 1.25,
            px: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 1.5,
            background:
              "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              background:
                "linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(220, 38, 38, 0.25) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(239, 68, 68, 0.25)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ef4444",
              flexShrink: 0,
            }}
          >
            <Logout />
          </Box>
          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#ef4444",
            }}
          >
            Logout
          </Typography>
        </ListItemButton>

        {/* Copyright Text */}
        <Typography
          variant="caption"
          sx={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: "0.7rem",
            lineHeight: 1.4,
            px: 1,
          }}
        >
          © 2026 DevBook.{"\n"}All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default SidebarDrawer;
