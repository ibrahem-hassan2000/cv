// Shared registry. Project files push into HANDBOOK.projects; concepts.js fills HANDBOOK.concepts.
// "todo" = projects whose code is on another laptop. Remove an entry when its data file is added.
window.HANDBOOK = {
  projects: [],
  concepts: [],
  todo: [
    { name: "Smart FAQ", where: "laptop 1 · priority 1" },
    { name: "AHS Medical Exchange", where: "laptop 1 · priority 1" },
    { name: "Osloop website", where: "laptop 1 · priority 2" },
    { name: "Other nWeave work", where: "laptop 1 · priority 3" },
    { name: "Side showcases", where: "laptop 1 · priority 3" }
  ]
};
