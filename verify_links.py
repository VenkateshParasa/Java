#!/usr/bin/env python3
"""
Link Verification Script for Selenium Automation Course
Checks all internal markdown links and verifies file existence
"""

import os
import re
from pathlib import Path
from collections import defaultdict

# Base directory
BASE_DIR = "/Users/venkateshparasa/Documents/Java/java-learning-app/public/content/01_Core_Courses/Selenium_Automation_Daily"

class LinkVerifier:
    def __init__(self, base_dir):
        self.base_dir = Path(base_dir)
        self.broken_links = []
        self.valid_links = []
        self.total_links = 0
        self.files_checked = 0
        self.link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+\.md(?:#[^)]*)?)\)')

    def get_all_markdown_files(self):
        """Get all markdown files in the course directory"""
        return list(self.base_dir.rglob("*.md"))

    def extract_links(self, content, file_path):
        """Extract all markdown links from content"""
        links = []
        for match in self.link_pattern.finditer(content):
            link_text = match.group(1)
            link_target = match.group(2)
            links.append({
                'text': link_text,
                'target': link_target,
                'source_file': file_path,
                'line': content[:match.start()].count('\n') + 1
            })
        return links

    def resolve_relative_path(self, source_file, target_path):
        """Resolve relative path from source to target"""
        # Split path and anchor
        if '#' in target_path:
            path_part, anchor = target_path.split('#', 1)
        else:
            path_part = target_path
            anchor = None

        # Remove any leading ./ or ../
        source_dir = Path(source_file).parent

        # Resolve the target path
        try:
            if path_part.startswith('/'):
                # Absolute path from project root
                resolved = self.base_dir / path_part.lstrip('/')
            else:
                # Relative path
                resolved = (source_dir / path_part).resolve()

            return resolved, anchor
        except Exception as e:
            return None, None

    def verify_link(self, link_info):
        """Verify if a link target exists"""
        source_file = link_info['source_file']
        target = link_info['target']

        # Skip external links
        if target.startswith('http://') or target.startswith('https://'):
            return True, "External link (skipped)"

        # Skip anchor-only links (internal page references)
        if target.startswith('#'):
            return True, "Internal anchor (not verified)"

        resolved_path, anchor = self.resolve_relative_path(source_file, target)

        if resolved_path is None:
            return False, "Could not resolve path"

        if not resolved_path.exists():
            return False, f"File not found: {resolved_path}"

        if not resolved_path.is_file():
            return False, f"Target is not a file: {resolved_path}"

        return True, f"Valid: {resolved_path}"

    def verify_all_links(self):
        """Verify all links in all markdown files"""
        markdown_files = self.get_all_markdown_files()

        print(f"Found {len(markdown_files)} markdown files to check\n")

        for md_file in markdown_files:
            self.files_checked += 1

            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                links = self.extract_links(content, md_file)

                for link in links:
                    self.total_links += 1
                    is_valid, message = self.verify_link(link)

                    if is_valid:
                        self.valid_links.append(link)
                    else:
                        link['error'] = message
                        self.broken_links.append(link)

            except Exception as e:
                print(f"Error reading {md_file}: {e}")

    def generate_report(self):
        """Generate detailed verification report"""
        print("=" * 80)
        print("LINK VERIFICATION REPORT")
        print("=" * 80)
        print()

        print(f"Files Checked: {self.files_checked}")
        print(f"Total Links Found: {self.total_links}")
        print(f"Valid Links: {len(self.valid_links)}")
        print(f"Broken Links: {len(self.broken_links)}")
        print()

        if self.broken_links:
            print("=" * 80)
            print("BROKEN LINKS DETAILS")
            print("=" * 80)
            print()

            # Group by source file
            by_file = defaultdict(list)
            for link in self.broken_links:
                by_file[link['source_file']].append(link)

            for idx, (source_file, links) in enumerate(sorted(by_file.items()), 1):
                rel_path = os.path.relpath(source_file, self.base_dir)
                print(f"\n{idx}. File: {rel_path}")
                print(f"   Location: {source_file}")

                for link in links:
                    print(f"\n   - Link Text: [{link['text']}]")
                    print(f"     Target: {link['target']}")
                    print(f"     Line: {link['line']}")
                    print(f"     Issue: {link['error']}")

                    # Suggest fix
                    target = link['target']
                    if 'day02_locators_basics.md' in target:
                        print(f"     Fix: Change to 'day02_selenium_locators.md'")
                    elif 'day07_waits_in_selenium.md' in target:
                        print(f"     Fix: Change to '../week1/day05_waits.md'")
                    elif 'day09_alerts_and_popups.md' in target:
                        print(f"     Fix: Change to 'day09_drag_drop_sliders.md'")
        else:
            print("No broken links found!")

        print("\n" + "=" * 80)
        print("SUMMARY")
        print("=" * 80)

        if len(self.broken_links) == 0:
            print("Status: PASS")
            print("All links are working correctly!")
        else:
            print("Status: FAIL")
            print(f"Critical Issues: {len(self.broken_links)}")

        print()
        return len(self.broken_links) == 0

def main():
    print("Starting link verification...\n")

    verifier = LinkVerifier(BASE_DIR)
    verifier.verify_all_links()
    success = verifier.generate_report()

    return 0 if success else 1

if __name__ == "__main__":
    exit(main())
