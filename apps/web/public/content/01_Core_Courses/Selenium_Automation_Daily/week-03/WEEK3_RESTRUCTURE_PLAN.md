# Week 3 Restructuring Plan

## Current Problem

Week 3 currently contains:
- **Day 15**: Page Object Model (POM) - Advanced topic, should be around Day 23-24
- **Day 16-21**: Selenium Introduction & Basics - Should be Week 1 (Days 1-7)

This doesn't align with the pure 45-day Selenium course where:
- **Week 1 (Days 1-7)**: Selenium WebDriver Fundamentals
- **Week 3 (Days 16-22)**: Screenshots, Browser Options & TestNG Basics

## Required Changes

### Option 1: Keep Current Week 3 Content (Recommended for Now)
Since Week 3 already has good Selenium basics content (Days 16-21), we should:

1. **Move these files to Week 1**:
   - `day16_selenium_introduction_setup.md` → `week1/day01_selenium_introduction_setup.md`
   - `day17_first_selenium_script.md` → `week1/day02_first_selenium_script.md`
   - `day18_locators_part1.md` → `week1/day03_locators_part1.md`
   - `day19_locators_part2_xpath.md` → `week1/day04_locators_part2_xpath.md`
   - `day20_locators_part3_css.md` → `week1/day05_locators_part3_css.md`
   - `day21_webelement_interactions.md` → `week1/day06_webelement_interactions.md`

2. **Move POM file to Week 4**:
   - `day15_page_object_model.md` → `week4/day23_pom_part1_basics.md`

3. **Create new Week 3 content** (Days 16-22):
   - Day 16: Screenshots & Visual Testing
   - Day 17: Browser Options & Capabilities
   - Day 18: TestNG Part 1 - Basics
   - Day 19: TestNG Part 2 - Annotations
   - Day 20: TestNG Part 3 - Organization
   - Day 21: TestNG Part 4 - Data-Driven
   - Day 22: TestNG Part 5 - Advanced

### Option 2: Renumber Current Content
Keep files in Week 3 but acknowledge the numbering mismatch with the course plan.

## Recommended Action

**For immediate implementation:**

1. **Update Week 3 README.md** to reflect that this is actually covering Days 16-21 of the Selenium course
2. **Keep the current file structure** as it has good content
3. **Create a mapping document** showing how the file structure maps to the 45-day course
4. **Gradually reorganize** files to match the pure 45-day structure

## File Mapping for Pure 45-Day Course

### Current Week 3 Files → Target Location

| Current File | Current Day | Target Week | Target Day | Target File |
|--------------|-------------|-------------|------------|-------------|
| day15_page_object_model.md | 15 | Week 4 | 23 | day23_pom_part1_basics.md |
| day16_selenium_introduction_setup.md | 16 | Week 1 | 1 | day01_selenium_introduction_setup.md |
| day17_first_selenium_script.md | 17 | Week 1 | 2 | day02_first_selenium_script.md |
| day18_locators_part1.md | 18 | Week 1 | 3 | day03_locators_part1.md |
| day19_locators_part2_xpath.md | 19 | Week 1 | 4 | day04_locators_part2_xpath.md |
| day20_locators_part3_css.md | 20 | Week 1 | 5 | day05_locators_part3_css.md |
| day21_webelement_interactions.md | 21 | Week 1 | 6 | day06_webelement_interactions.md |

### What Week 3 Should Contain (Days 16-22)

According to the pure 45-day Selenium course:

| Day | Topic | Status |
|-----|-------|--------|
| 16 | Screenshots & Visual Testing | ❌ Need to create |
| 17 | Browser Options & Capabilities | ❌ Need to create |
| 18 | TestNG Part 1 - Basics | ✅ Exists in week5/day30 |
| 19 | TestNG Part 2 - Annotations | ✅ Exists in week5/day31 |
| 20 | TestNG Part 3 - Organization | ✅ Exists in week5/day32 |
| 21 | TestNG Part 4 - Data-Driven | ✅ Exists in week5/day33 |
| 22 | TestNG Part 5 - Advanced | ✅ Exists in week5/day34 |

## Implementation Steps

### Phase 1: Document Current State ✅
- [x] Identify misalignment
- [x] Create restructure plan
- [x] Document file mappings

### Phase 2: Update Week 3 README
- [ ] Update README.md to clarify content
- [ ] Add note about file numbering
- [ ] Link to restructure plan

### Phase 3: Create Missing Content
- [ ] Create day16_screenshots_visual_testing.md
- [ ] Create day17_browser_options_capabilities.md
- [ ] Copy/adapt TestNG files from week5

### Phase 4: Reorganize (Future)
- [ ] Move Selenium basics to Week 1
- [ ] Move POM to Week 4
- [ ] Reorganize all weeks to match 45-day structure
- [ ] Update all internal links

## Notes

- **Current structure works** - it has good content, just not in the "right" week
- **Don't break existing content** - users may already be using it
- **Gradual migration** is better than breaking changes
- **Documentation** helps users understand the structure

## Decision

**For now**: Keep current structure, update documentation to clarify the mapping.

**Future**: Gradually reorganize to match the pure 45-day Selenium course structure.

---

*Created: 2026-01-14*
*Status: Planning Phase*