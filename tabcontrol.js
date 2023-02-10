// Background script to control hotkey commands

// Toggles audio of the currently active tab (Alt-1)
async function toggleAudio() {

  // Toggle current tab
  const currentTab = await browser.tabs.query({
    active: true,
    currentWindow: true
  })
  if (currentTab.length > 0) {
    browser.tabs.update(currentTab[0].id, {muted: !currentTab[0].mutedInfo.muted});
  }
}

// Mutes all tabs except the currently active tab (Alt+2)
async function focusAudio() {

  // Mute all audible tabs
  const audibleTabs = await browser.tabs.query({
    audible: true
  })
  for (let i = 0; i < audibleTabs.length; i++) {
    browser.tabs.update(audibleTabs[i].id, {muted: true});
  }

  // Unmute current tab
  const currentTab = await browser.tabs.query({
    active: true,
    currentWindow: true
  })
  if (currentTab.length > 0) {
    browser.tabs.update(currentTab[0].id, {muted: false});
  }
}

// Toggles audio of all tabs at once (Alt+3)
async function toggleAllAudio() {
  
  // If audible tabs, mute and return
  const audibleTabs = await browser.tabs.query({
    audible: true
  })
  if (audibleTabs.length > 0) {
    for (let i = 0; i < audibleTabs.length; i++) {
      browser.tabs.update(audibleTabs[i].id, {muted: true});
    }
    return
  }

  // If no tabs audible, unmute all tabs
  const allTabs = await browser.tabs.query({})
  for (let i = 0; i < allTabs.length; i++) {
    browser.tabs.update(allTabs[i].id, {muted: false});
  }
}

// Control mute status of tabs based on command from hotkeys
browser.commands.onCommand.addListener(function runCommand(command) { 
  if (command === "toggle-audio") {
    toggleAudio()
  }
  if (command === "focus-audio") {
    focusAudio()
  }
  if (command === "toggle-all-audio") {
    toggleAllAudio()
  }
})
