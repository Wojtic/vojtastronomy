import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function formatMarkdown(md, en) {
  const lines = md.split("\n");
  const REMOVE_CHARS_FROM_LINK = 6;
  let deletingEn = false;
  for (let i = 0; i < lines.length; i++) {
    // ---------------------------------------- english
    if (en) {
      // TODO
    } else {
      if (deletingEn === false) {
        if (lines[i].includes("<en>")) {
          deletingEn = lines[i].includes("</en>") ? false : true;
          lines[i] = lines[i].slice(0, lines[i].indexOf("<en>"));
        }
      } else {
        if (lines[i].includes("</en>")) {
          deletingEn = false;
          lines[i] = lines[i].slice(lines[i].indexOf("</en>") + 5);
        }
      }
    }
    // ---------------------------------------- links
    for (let j = 0; j < lines[i].length - 3; j++) {
      if (lines[i][j] === "[" && lines[i][j + 1] === "[") {
        let k = j;
        for (k; k < lines[i].length - 1; k++) {
          if (lines[i][k] === "]" && lines[i][k + 1] === "]") break;
        }
        const link = lines[i].slice(j + 2, k);
        let linkHtml = `<a href="/`;
        if (link.includes("|")) {
          linkHtml += `${link
            .slice(0, link.indexOf("|") - REMOVE_CHARS_FROM_LINK)
            .replace(" ", "_")}">${link.slice(link.indexOf("|") + 1)}</a>`;
        } else {
          linkHtml += `${link
            .slice(0, link.length - REMOVE_CHARS_FROM_LINK)
            .replace(" ", "_")}">${link.slice(
            0,
            link.length - REMOVE_CHARS_FROM_LINK
          )}</a>`;
        }
        lines[i] = lines[i].slice(0, j) + linkHtml + lines[i].slice(k + 2);
      }
    }
    // ---------------------------------------- tags
    if (lines[i].slice(0, 6) === "tags::") lines[i] = "";
    // ---------------------------------------- headings
    if (lines[i][0] === "#") {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] !== "#") {
          lines[i] = `<h${j}>${lines[i].slice(j)}</h${j}>`;
          break;
        }
      }
    }
  }
  return lines.join("\n<br>");
}

function Page(props) {
  const [md, setMd] = useState();

  useEffect(() => {
    const soubor = require("./../files/markdown/" + props.name + ".md");

    fetch(soubor)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        setMd(formatMarkdown(res, props.english));
      });
  }, []);

  return <article dangerouslySetInnerHTML={{ __html: md }}></article>;
}

export default Page;
