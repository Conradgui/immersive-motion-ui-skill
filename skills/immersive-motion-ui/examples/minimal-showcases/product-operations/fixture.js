const fixture = {
  title: "Patient flow",
  updated: "Updated 09:42",
  stats: [
    ["Waiting", "14"],
    ["Ward B", "92%"],
    ["Blocked", "2"],
    ["Isolation", "1"],
  ],
  transfers: [
    { initials: "AB", wait: "41 min", acuity: "High", destination: "Ward B", blocker: "Isolation clean pending", owner: "N. Reed" },
    { initials: "CM", wait: "28 min", acuity: "Medium", destination: "Ward C", blocker: "Transport requested", owner: "T. Hall" },
    { initials: "DP", wait: "16 min", acuity: "High", destination: "Ward B", blocker: "Bed release review", owner: "N. Reed" },
  ],
  actions: ["Assign bed", "Change destination", "Request transport"],
};
