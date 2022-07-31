# Scraping Server
This codebase provides a scalable, robust web-crawling pipeline applicable across web designs and accessible for researchers with minimal computational skills. It uses a versatile, scalable architecture built around Python's scrapy module.


## Description
When it comes to data collection, web-crawling (i.e., web-scraping, screen-scraping) is a common approach in our increasingly digital era--and a common stumbling block. With such a wide range of tools and languages available (Selenium, Requests, and HTML, to name just a few), developing and implementing a web-crawling pipeline is often a frustrating experience for researchers--especially those without a computer science background. There is a pressing need for a universal web-crawling pipeline able to scrape text and objects across website formats and research objectives. 

This repo provides such a pipeline (in Python) applicable across web designs and accessible for researchers with minimal computational skills. Our method involves using Scrapy spiders on virtual machines (VMs) to recursively gather website links (to a given depth), collect and parse items (text, images, PDFs, and .docs) using BeautifulSoup and textract, and saving them to MongoDB. The spiders are coordinated using a big data architecture (with multiple containers) consisting of Redis and Flask (crawler management), React (front-end), and MongoDB (database management). 

We will test the architecture by crawling all 100,000 or so U.S. school websites. Crawling school websites could spawn a new era of educational research, following the lead of a seminal paper that downloaded and analyzed the websites of all charter schools (https://bit.ly/BIDS-post-2020). New directions in such work include studies of school curricula, race and class segregation, and disciplinary regimes.

Downstream features on our bucket list include real-time metrics and access to scraped data, error checks and backup scrapers (including the simple wget algorithm), and toggles for capturing data over time with the Internet Archive. 

## Running scraping server

The instructions to run the scraping server on Linux, Windows, and Mac are in the directory setup_guides.

