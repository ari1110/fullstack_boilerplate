from celery import shared_task
from playwright.sync_api import sync_playwright

@shared_task
def scrape_website(url):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        title = page.title()
        browser.close()
    return title