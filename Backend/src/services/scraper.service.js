const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeBlog(url) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);

  // ===== METADATA =====
  const title = $("h1.elementor-heading-title").text().trim();

  const author = {
    name: $(".elementor-post-info__item--type-author").text().trim(),
    profile: $(".elementor-post-info__item--type-author")
      .closest("a")
      .attr("href")
  };

  const publishedDate = $(".elementor-post-info__item--type-date time")
    .text()
    .trim();

  const category = $(".elementor-post-info__terms-list-item")
    .text()
    .trim();

  // ===== CONTENT =====
  const content = [];
  let currentList = null;

  $(".elementor-widget-theme-post-content")
    .children()
    .each((_, el) => {
      const tag = el.tagName.toLowerCase();

      if (tag === "h2" || tag === "h4") {
        content.push({
          type: "heading",
          level: tag,
          text: $(el).text().trim()
        });
        currentList = null;
      }

      else if (tag === "figure") {
        const img = $(el).find("img");
        if (img.length) {
          content.push({
            type: "image",
            src: img.attr("src"),
            alt: img.attr("alt") || ""
          });
        }
        currentList = null;
      }

      else if (tag === "ol") {
        const items = [];
        $(el).find("li").each((_, li) => {
          items.push($(li).text().trim());
        });

        content.push({
          type: "list",
          ordered: true,
          items
        });
        currentList = null;
      }

      else if (tag === "p") {
        const html = $(el).html()?.trim();
        const text = $(el).text().trim();

        const match = text.match(/^(\d+)\.\s*(.+)/);

        if (match) {
          if (!currentList) {
            currentList = {
              type: "list",
              ordered: true,
              items: []
            };
            content.push(currentList);
          }
          currentList.items.push(match[2]);
        } else if (html) {
          content.push({
            type: "paragraph",
            html
          });
          currentList = null;
        }
      }
    });

  return {
    title,
    author,
    publishedDate,
    category,
    content
  };
}

module.exports = scrapeBlog;
