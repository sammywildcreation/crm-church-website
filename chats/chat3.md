# Program page from Figma

_Started 2026-06-16 18:30 UTC_

---

## User

Build the program page using the attached Figma design, and ensure everything is accurate.

## Assistant

Let me explore the project and the design system's existing website kit.

_[tool: list_files]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

The existing pages establish a clear pattern. Let me read the full Program frame and check available assets.

_[tool: fig_read]_

_[tool: list_files]_

_[tool: fig_read]_

_[tool: fig_read]_

_[tool: fig_grep]_

_[tool: fig_read]_

_[tool: fig_read]_

_[tool: fig_grep]_

Now let me look at the hero photo candidates and confirm the posters.

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

`photo-community-1.jpg` is the red-robe choir for the hero left. Let me find the blue-gele worshipper for the right.

_[tool: view_image]_

_[tool: view_image]_

## User

continue

## User

Access re-granted for "C.R.M.fig" — continue.

## User

Access re-granted for "C.R.M.fig" — continue.

## Assistant

_[tool: fig_read]_

Let me see the full frame rendered to understand the layout, then read the rest of the structure.

_[tool: fig_screenshot]_

Now I have the full picture. Let me gather all event data (titles, dates, locations, poster image hashes) and the hero images.

_[tool: fig_grep]_

_[tool: fig_grep]_

_[tool: fig_grep]_

_[tool: list_files]_

Let me read the hero section and yearly-programs tab, and find the fig asset files to copy.

_[tool: fig_read]_

_[tool: fig_read]_

_[tool: fig_ls]_

_[tool: fig_read]_

_[tool: fig_read]_

_[tool: read_file]_

Now I have everything. Let me copy the hero and poster images from the Figma file into the project.

_[tool: fig_copy_files]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

Everything confirmed. Building the Program page now, reusing the nav/footer/scripture system from About.

_[tool: update_todos]_

_[tool: write_file]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

Preview pane isn't ready for capture. Let me hand off to verification.

_[tool: ready_for_verification]_

Built `Program.html` from the Figma frame, accurate to the design and matching the existing site system:

- **Split hero** (choir + worshipper) with the centered "Worship With Us today" headline
- **Search bar** and the **6-event list** (Thanksgiving Sunday → 3Days Monthly Fasting & Prayer) with real posters, times, and locations pulled from the file
- **Other Yearly Programs** box, **Matthew 19:26** scripture band, and shared footer
- Nav "Programs" set active; Tweaks for palette/voice/spacing

Posters and hero photos were copied out of the Figma file into `assets/`. The verifier is checking it now.

## User

The flyers did not come in the real size like we have on Figma; please correct.

## Assistant

Let me check the actual poster dimensions and how Figma displays them.

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: image_metadata]_

Let me check how each poster's box is sized in the Figma source (they may differ per item).

_[tool: fig_read]_

_[tool: fig_read]_

_[tool: fig_read]_

_[tool: fig_read]_

_[tool: fig_read]_

The flyers have **different box sizes per row** in Figma — the landscape ones are 550px wide and shorter, the square ones ~397px. I forced them all into one tall 396×496 box. Let me reproduce each poster's real Figma dimensions and fit.

_[tool: read_file]_

_[tool: str_replace_edit]_

Posters now use their real Figma box sizes and fit (square flyers ~397px wide, landscape ones 550px wide; Bible Study & Fasting use `contain` so the full flyer shows).

_[tool: ready_for_verification]_

Fixed — each flyer now renders at its true Figma size and fit instead of being squeezed into one uniform tall box. The square posters sit ~397px wide; the landscape ones (Sunday Service, Bible Study, Fasting & Prayer) are 550px wide, with Bible Study and Fasting shown uncropped via `contain`.

